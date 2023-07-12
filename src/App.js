import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./screens/LoginForm/LoginForm";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

import './App.css'

const App = () => {
  const { authenticated } = useContext(UserContext);

  useEffect(() => {
    if (authenticated) {
      document.body.classList.add("body-authenticated");
    } else {
      document.body.classList.remove("body-authenticated");
    }

  }, [authenticated]);


  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginForm />} />
          <Route
            path="/home/*"
            element={authenticated ? (
              <HomeScreen />) : (
              <Navigate to="/" replace />
            )
            } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;