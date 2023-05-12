// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
 
const config = {
  apiKey: "AIzaSyAQmKldNhalAzCO2pIUGBb4yDKg5DaCd4U",
  authDomain: "milestone3-1790c.firebaseapp.com",
  projectId: "milestone3-1790c",
  storageBucket: "milestone3-1790c.appspot.com",
  messagingSenderId: "412720511533",
  appId: "1:412720511533:web:116fc3922ee9e5c65dd6a4",
  measurementId: "G-V087TKJWVB"
};

// Initialize Firebase
const app = initializeApp(config);
export const auth = getAuth(app);
export default app;


firebase.initializeApp(config);
const firestoreDb = firebase.firestore();

export const createPost = async (postData) => {

  await firestoreDb.collection('posts').add({
    image: postData.image,
    user: postData.user,
    text: postData.text,
    upvote: 0,
    downvote: 0,
    shockvote: 0,
    comment: []
  })
}

export const getAllPosts = async () => {
  const querySnapshot = await firestoreDb.collection('posts').get();
  let results = []
  querySnapshot.forEach((doc) => {
    results.push({
      id: doc.id,
      ...doc.data()
    })
    // console.log(doc.id, doc.data())
  })
  // console.log(results)
  return results
}


export const deletePost = async (post) => {
  // Delete a post in your database
  firestoreDb
    .collection("posts")
    .doc(post.id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};


export const likePost = async (posts) => {
  // Update a particular post and increment the like counter
  console.log(posts.id)
  var postref = firestoreDb.collection("posts").doc(posts.id);
  console.log(posts.id)
  postref.update({
    upvote: firebase.firestore.FieldValue.increment(1)
  });
};

export const dislikePost = async (post) => {
  // Update a particular post and increment the like counter
  var postref = firestoreDb.collection("posts").doc(post.id);

  postref.update({
    downvote: firebase.firestore.FieldValue.increment(1)
  });
  console.log(postref.downvote)
  return postref
};

export const shockPost = async (post) => {
  // Update a particular post and increment the like counter
  var postref = firestoreDb.collection("posts").doc(post.id);

  postref.update({
    shockvote: firebase.firestore.FieldValue.increment(1)
    
  });
  console.log(postref.shockvote)
  return postref
};