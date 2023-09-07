const mongoose = require("mongoose"); // ~ this how we connect tot he database

module.exports = function connectDB() {
  //~connecting to mongoDB
  mongoose.connect(process.env.MONGO_URI);

  //~check for a connection
  const db = mongoose.connection;
  db.on("error", (e) => console.log(e));
  db.on("open", () => console.log("Connected to MongoDB"));
  db.on("close", () => console.log("MongoDB disconnected"));
};
//~to close database connection
// setTimeout(() => {
//     db.close();
//   }, 5000);
