const React = require("react");


function New() {
  return (
    <div>
      <h2>Create New Tweet</h2>
      <form action="/api/tweets" method="POST">
        Title: <input tyoe="text" name="title" required />
        Author: <input type="text" name="author" required />

        <textarea name="body" required></textarea>
        <input type="submit" value="Post" />
      </form>
    </div>
  );
}

module.exports = New;
