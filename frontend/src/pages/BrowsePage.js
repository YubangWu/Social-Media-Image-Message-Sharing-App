import React, { useState, useEffect } from "react";
import "../styles/BrowsePage.css"
import RenderPost from "../components/RenderPost"
import Button from "../components/Button"
import * as db from "../database"

const BrowsePage = () => {

  const [posts, setPosts] = useState([])
  const [image, setImage] = useState('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg')
  const [user, setUser] = useState("Sign in to view more posts ")
  const [text, setText] = useState("Skyline")
  const [index, setIndex] = useState(0)
  const [upvote, setUpvote] = useState(6)
  const [shockvote, setShockvote] = useState(3)
  const [downvote, setDownvote] = useState(0)
  const [id, setId] = useState("p4DkEgbttlAj7TK8xCzj")
  // const []

  const getPosts = async () => {
    const allPosts = await db.getAllPosts();
    setPosts(allPosts);
    console.log(allPosts[0].id)
  }

  useEffect(() => {
    getPosts();
    console.log("get here")
  }, [])

  // console.log(posts.upvote)
  const handlePrevClick = () => {
    console.log("handlePrevClick")
    console.log("index before left", index)
    // getPosts()
    if (posts && posts.length != 0) {
      setIndex((index - 1 + posts.length) % posts.length)
      // console.log(index)
      setImage(posts[index].image)
      setUser(posts[index].user)
      setText(posts[index].text)
      setUpvote(posts[index].upvote)
      setId(posts[index].id)
      setDownvote(posts[index].downvote)
      setShockvote(posts[index].shockvote)

      console.log("prev: ", id)
    }
  }

  const handleNextClick = () => {
    console.log("handleNextClick")
    console.log("index before right", index)
    if (posts && posts.length != 0) {
      setIndex((index + 1) % posts.length)
      console.log(posts)
      setImage(posts[index].image)
      setUser(posts[index].user)
      setText(posts[index].text)
      setUpvote(posts[index].upvote)
      setId(posts[index].id)
      setDownvote(posts[index].downvote)
      setShockvote(posts[index].shockvote)
    }
  }

  return (
    <div>
      <div class="container2">
        <div class="container1">
          <Button text="<" onClick={handlePrevClick}></Button>
          <RenderPost image={image} user={user} text={text} id={id} upvote={upvote} downvote={downvote} shockvote={shockvote}> </RenderPost>
          <Button text=">" onClick={handleNextClick}></Button>
        </div>

      </div>


    </div>
  );
};

export default BrowsePage;