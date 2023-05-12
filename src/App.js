import React, { useState, useEffect } from "react";
import { StyledFirebaseAuth } from 'react-firebaseui';
// This imports firebase using the Firebase SDK v8 style
import firebase from 'firebase/compat/app'
// This imports the Firebase Auth libraries
import 'firebase/auth'
import firebaseui from 'firebaseui'
// import logo from '../build/logo192.png';
import './App.css';
// import Home from "./pages/Home";

import { startFirebaseUI } from './database'

import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import BrowsePage from './pages/BrowsePage';
import CreatePostPage from './pages/CreatePostPage';
import LoginPage from "./pages/Login";


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const requiresLogin = Component => {
    return isSignedIn ? Component : <Navigate to="/login" />;
  };

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

  // if (!isSignedIn) {
  //   return (
  //     <div>
  //       <h1>My App</h1>
  //       <p>Please sign-in:</p>
  //       {!!firebase.apps.length && (
  //         <StyledFirebaseAuth
  //           uiConfig={uiConfig}
  //           firebaseAuth={firebase.auth()}
  //         />
  //       )}
  //     </div>
  //   );
  // }
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/createpost" element={<CreatePostPage />}></Route>
          {/* <Route
            path="/profile"
            element={requiresLogin(<ProfilePage />)}
          /> */}
          <Route
            path="/login"
            element={
              <LoginPage
                onLogin={() => {
                  setIsSignedIn(true);
                }}
              />
            }
          />
      </Routes>
    </Router >
  );
}


export default App;

