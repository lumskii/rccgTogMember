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
      <CircularProgress
        sx={{
          color: "secondary",
          position: "absolute",
          zIndex: "999",
          marginleft: "50vw",
          marginTop: "50vh",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <Router>
      <div>
        <Header />
        {!user ? (
          <Routes>
            {/* <Route exact path="/" element={<Layout content={<Signup />} />} /> */}
            <Route exact path="/" element={<Layout content={<Login />} />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Layout content={<FormHandler />} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
