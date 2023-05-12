import React, { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";
import "../styles/RenderPost.css"
import * as db from "../database"

const RenderPost = (props) => {
  // console.log("renderpost:" ,props.upvote)

  const [upvote, setUpvote] = useState(props.upvote)
  const [downvote, setDownvote] = useState(props.downvote)
  const [shockvote, setShockvote] = useState(props.shockvote)

  useEffect(() => {
    setUpvote(props.upvote)
    setDownvote(props.downvote)
    setShockvote(props.shockvote)
  }, [props])


  return (
    <div>

      <img
        src={props.image}
        alt="Placeholder"
        width="450px"
        height="450px"
      />

      <h1>{props.user}</h1>

      <p>{props.text}</p>

      <div className="button-container">

        <button class="button1"
          onClick={async () => {
            await db.likePost(props);
            // await getPosts();
            setUpvote(upvote + 1)
          }
          }
        >
          &#10084;&#65039;    {upvote}
        </button>

        <button class="button2"
          onClick={async () => {
            await db.dislikePost(props);
            setDownvote(downvote + 1)
          }
          }
        >
          &#128078;  {downvote}
        </button>

        <button class="button3"
          onClick={async () => {
            await db.shockPost(props);
            setShockvote(shockvote + 1)
          }
          }
        >
          &#x1F62F; {shockvote}
        </button>

      </div>


    </div>
  );
};

export default RenderPost;