import React, {useState, useEffect} from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import "../styles/Login.css";
import firebase from 'firebase/compat/app';
import BrowsePage from './BrowsePage';
import "firebase/compat/auth";
import * as db from "../database"

// const auth = firebase.auth();

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can 
    // provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/login',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ]
    };

function handleSignOut() {
  firebase.auth().signOut()
    .then(() => {
      // Redirect the user to a new page
      window.location.href = '/login';
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleCreatePost() {
  // Redirect the user to the create post page
  window.location.href = '/createpost';
}

function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false);
  
    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      if (firebase.apps.length) {
        const unregisterAuthObserver = firebase
          .auth()
          .onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
          });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
      }
    }, []);
  
    if (!isSignedIn) {
      return (
        <div id='greeting'>
          <h1 class="title">Welcome to ImagePosting</h1>
          <p class='subtitle'>Please sign-in:</p>
          {!!firebase.apps.length && (
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </div>
      );
    }
    return (
      <div id='loginreturn'>
        <h1>Account</h1>
          <hr className="mb-5" />
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in!
        </p>
        <p>You can now post image with name recorded and manage your posts.</p>
        <div id="logincon" class="button-container">
        <button class="logoutbtn" onClick={handleSignOut}>
          Sign-out
        </button>
        <button class="signbtn" onClick={handleCreatePost}>
          Create Post
        </button>
        </div>
        
      </div>
    );
  }

export default Login

