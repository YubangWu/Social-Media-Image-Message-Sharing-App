import React, { useState } from "react";
import "../styles/CreatePost.css";
import { Link } from 'react-router-dom';
import * as db from "../database";
import firebase from 'firebase/compat/app';

const CreatePost = () => {

  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');

  const handleImageUrlChange = event => {
    setImageUrl(event.target.value);
  };

  const handleTextChange = event => {
    setText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("On handle create post");

    await db.createPost({
      image: imageUrl,
      user: firebase.auth().currentUser.displayName, 
      text: text
    })
  };

  return (
    <div class="containerCreatePost">
      <h1>Create Post</h1>

      <div class="form">
        <form class="register-form">

          <input type="text" placeholder="ImageUrl" value={imageUrl} onChange={handleImageUrlChange} />
          <input type="text" placeholder="Text" value={text} onChange={handleTextChange} />

          <Link to='/browse'>
            <button>Cancel</button>
          </Link>

          <button onClick={handleSubmit}>Create</button>

        </form>
      </div>


    </div>
  );
};

export default CreatePost;