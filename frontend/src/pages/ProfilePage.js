import React, { useState, useEffect } from "react";
// import "../styles/BrowsePage.css"
import RenderPost from "../components/RenderPost"
import Button from "../components/Button"
import * as db from "../database"
import firebase from 'firebase/compat/app';
import "../styles/Profile.css"

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const allPosts = await db.getMyPosts();
    setPosts(allPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    (posts.length === 0) ? (<div className="columns"> <br /><br /><br /><p> You dont have any posts yet </p></div>) : 
      (<div className="columns">
        <br />
        <br />
        <br />
        <h1>Manage My Posts</h1>
        {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}

        <hr className="mb-5" />

        {posts.map((post, index) => {
          return (
            <article key={index} className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img
                    src={post.image} // "https://bulma.io/images/placeholders/128x128.png"
                    // alt="placeholder"
                    width="450px" // +
                    height="450px" // +
                  />
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    {/* <strong>{post.name}</strong> */}
                    <strong>@{post.user}</strong>
                    <br />
                    Post text: {post.text}
                    <br />
                    <small>userId: {post.userId}</small>
                    {/* {post.text} - {post.likes} */}
                    {/* <button
                          onClick={async () => {
                            await db.likePost(post);
                            await getPosts();
                          }}
                          className="button is-primary"
                        >
                          Like this
                        </button> */}
                    <br />
                    <button
                      onClick={async () => {
                        await db.deletePost(post);
                        await getPosts();
                      }}
                      className="deletebutton"
                    >
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>)
  );
};

export default ProfilePage;