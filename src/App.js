import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/index.jsx";
import Layout from "./components/MainLayout/index.jsx";
import "./App.css";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  selectIsLoaded,
  selectUser,
} from "./features/userSlice";
import { CircularProgress } from "@mui/material";
import FormHandler from "./components/form/FormHandler.jsx";
// import Signup from "./pages/SignupPage/index.jsx";
import Login from "./pages/LoginPage/index.jsx";
import Signup from "./pages/SignupPage/index.jsx";
import Help from "./pages/Help.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const user = useSelector(selectUser);
  const isLoaded = useSelector(selectIsLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (!isLoaded) {
    return (
      <div>
        <CircularProgress
          style={{
            color: "secondary",
            position: "absolute",
            zIndex: "999",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  }

  return (
    <Router>
      <div>
      {/* <div
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "#f00", // Red background for warning
          color: "#fff", // White text for warning
          textAlign: "center",
          zIndex: 1000,
          paddingTop: "20px", // Adjust padding as needed
          paddingBottom: "20px"
        }}
      >
        <h2>Warning: This app is still under development!</h2>
        <p>
          This app is still under development. Please do not use this app for
          any official purposes.
        </p>
      </div> */}
        <Header />
        {!user ? (
          <Routes>
            {/* <Route exact path="/" element={<Layout content={<Signup />} />} /> */}
            <Route exact path="/" element={<Layout content={<Login />} />} />
            <Route exact path="/signupAdmin" element={<Layout content={<Signup />} />} />
            <Route path="*" element={<Layout content={<NotFound />} />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Layout content={<FormHandler />} />} />
            <Route exact path="/help" element={<Layout content={<Help />} />} />
            <Route path="*" element={<Layout content={<NotFound />} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
