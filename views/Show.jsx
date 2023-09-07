const React = require("react");

function Show({ tweet }) {
    console.log(tweet.createdAt);
    return (
    <div className="p-4">
        
      <div className="text-2x1 font-bold mb-2">{tweet.title}</div>
      <div>{tweet.author}</div>
      <div>{tweet.body}</div>
      <div>{tweet.sponsored ? "sponsored" : ""}</div>
      <div>{new Date(tweet.createdAt).toLocaleDateString()}</div>

      {/* COMMENTS MAPPING */}
      <div>
        {/* if length is bigger than one, then map through, if not, then do nothing*/}
        {tweet.comments.length > 1 && ( 
            tweet.comments.map(comment => {
                return (
                    <div>
                        <div>{comment.body}</div>
                        <div>{comment.author}</div>
                    </div>

                )
            })
        )}

      </div>
      
      <div>
        <h3>Comment</h3>
        <form method="POST" action={`/api/tweets/add-comment/${tweet._id}?_method=PUT`}>
            Comment: <input type="text" name="body" required/>
            <br/>
            Author: <input type="text" name="author" required/>
            <br/>
            <input type="submit" value="Add Comment" required/>
        </form> 
      </div>
    </div>
  );
}

module.exports = Show;
