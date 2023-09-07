const React = require("react");
const DefaultLayout = require("./Layout/Default");

function Index({ tweets }) {
  return (
    <DefaultLayout title="Tweets">
      <script src="https://cdn.tailwindcss.com"></script>
      <nav className="bg-blue-400 p-4">
        <a href="/tweets/new" className="text-white font-bold">
          Create a new Tweet
        </a>
      </nav>

      <ul className="mt-8">
        {tweets.map((tweet) => {
          return (
            <li
              key={tweet._id}
              className="border p-5 mb-4 rounded-lg shadow-md"
            >
              <a
                href={`/tweets/${tweet._id}`}
                className="text-xl font-bold text-blue-600 hover:underline"
              >
                {tweet.title}
              </a>
              <p>{tweet.body}</p>
              <p>{tweet.author}</p>
              <div>
                <a href={`/api/tweets/add-likes/${tweet._id}`}>Like</a>
                <br />
                <span>Likes: {tweet.likes}</span>
              </div>
              <br />
              <span>{tweet.sponsored ? "Sponsored" : ""}</span>
              <br />
              <a href={`/tweets/${tweet._id}/edit`}>Edit</a>
              <br />
              <form
                method="POST"
                action={`/api/tweets/${tweet._id}?_method=DELETE`}
              >
                <input type="submit" value="Delete" />
              </form>
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
}
module.exports = Index;
