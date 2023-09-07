const express = require("express");
require("dotenv").config();
const connectDB = require("./utils/connectDB");
const Tweet = require("./models/Tweet");
const manyTweets = require("./models/manyTweets");
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");

//^ ==============Variables========================================
const app = express();
const PORT = process.env.PORT || 3000;

//^================ App Config======================================
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//^================ Middleware======================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'

//^====================== Routes=====================================
/**
 *^ Root
 */
app.get("/", (req, res) => {
  res.send("working");
});

//todo ======================= View Routes==========================================

/**
 *^ Index
 */
app.get("/tweets", async (req, res) => {
  try {
    // const tweets = await Tweet.find({author: "abe"}); //~ example how to filter and find specific file
    // const tweets = await Tweet.find({} "title body"); //~ example how to filter title and body only for the files
    // const tweets = await Tweet.find({likes: {$gte: 20, $lte: 66}});//~ looking for posts that have likes greater than 20
    const tweets = await Tweet.find({});
    // res.send(tweets);
    res.render("Index", { tweets });
  } catch (e) {
    console.log(e);
  }
});
/**
 * ^ New
 */
app.get("/tweets/new", (req, res) => {
  res.render("New");
});

/**
 * ^ Edit
 */
app.get("/tweets/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    //find thr tweet
    const tweet = await Tweet.findById(id);

    //return a form template witht the tweet data
    res.render("Edit", { tweet });
  } catch (error) {
    console.log(error);
  }
});

/**
 *^ Show
 */
app.get("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findById(id);
    // res.send(tweet);
    res.render("Show", { tweet });
  } catch (e) {
    console.log(e);
  }
});

//TODO ======================= API Routes (dont send any views. It grabs data. It stores new data to the database and redirects the user)
/**
 *^ Create POST. The purpose of this route for fronend to send data from the form to create a new tweet. THis is how frontend interrects with the database
 */
app.post("/api/tweets", async (req, res) => {
  // const createdTweet = await Tweet.create(req.body);
  await Tweet.create(req.body);
  //   res.send(req.body);
  //   res.send(createdTweet);
  res.redirect("/tweets");
});

/**
 *^ Update PUT
 */
app.put("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  if (req.body.sponsored === "on") {
    req.body.sponsored = true;
  } else {
    req.body.sponsored = false;
  }
  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(id, req.body, {
      new: true, //add this so it displys the updated post
    });
    res.redirect(`/tweets/${id}`);
  } catch (e) {
    console.log(e);
  }
});

/**
 *^ Delete Post by id
 */
app.delete("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTweet = await Tweet.findByIdAndDelete(id);
    // res.send(deletedTweet);
    res.redirect("/tweets");
  } catch (e) {
    console.log(e);
  }
});

/**
 * ^ Add Comment. We use put because we're adding data from the front-end
 */
app.put("/api/tweets/add-comment/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  tweet.comments.push(req.body);
  const updatedTweet = await Tweet.findByIdAndUpdate(id, tweet, { new: true });
  res.redirect(`/tweets/${id}`);
});

/**
 * ^ Increase Likes
 */
app.get("/api/tweets/add-likes/:id", async (req, res) => {
  const { id } = req.params;
  //find tweet to update by id
  const tweetToUpdate = await Tweet.findById(id);
  //increase the likes
  tweetToUpdate.likes++;
  //update tweet with new data
  const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {
    new: true,
  });
  res.redirect(`/tweets`);
});

/**
 *^ Seed Route. Inserts dummy data into our database
 */
app.get("/api/tweets/seed", async (req, res) => {
  const createdTweet = await Tweet.insertMany(manyTweets);
  res.send(createdTweet);
});

//^ Listening and connecting to DB
connectDB();
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
