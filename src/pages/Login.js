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
        <h1 className="title">Create and Manage Posts</h1>
        <p>
          Welcome {firebase.auth().currentUser.displayName}! You are now
          signed-in!
        </p>
        <div class="button-container">
        <button class="button is-light" onClick={() => firebase.auth().signOut()}>
          Sign-out
        </button>
        
        
        <button class="button is-light" onClick="window.location='/createpost'">
          Go to create post page
        </button>
        </div>
        <BrowsePage />
      </div>
    );
  }

export default Login

