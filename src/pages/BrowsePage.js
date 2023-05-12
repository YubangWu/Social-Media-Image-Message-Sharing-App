import React, { useState, useEffect } from "react";
import "../styles/BrowsePage.css"
import RenderPost from "../components/RenderPost"
import Button from "../components/Button"
import * as db from "../database"

const BrowsePage = () => {

  const [posts, setPosts] = useState([])
  const [image, setImage] = useState('https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')
  const [user, setUser] = useState("ananymous")
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
    if (posts) {
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
    if (posts) {
      setIndex((index + 1) % posts.length)
      console.log(index)
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
          <div class="line"></div>
        </div>

        </div>


    </div>
  );
};

export default BrowsePage;