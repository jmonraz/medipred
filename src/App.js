import React, { useState, useEffect, useContext } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

const App = () => {

  // const [authenticated, setAuthenticated] = useState(false);
  const { authenticated } = useContext(UserContext);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (authenticated) {
      document.body.classList.add("body-authenticated");
    } else {
      document.body.classList.remove("body-authenticated");
    }

  }, [authenticated]);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  }

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginForm onFormSubmit={handleFormSubmit} />} />
          <Route
            path="/home"
            element={authenticated ? (
              <Dashboard />) : (
              <Navigate to="/" replace />
            )
            } />
        </Routes>
      </Router>
      {/* {authenticated ? (
        <Dashboard />
      ) : (
        <LoginForm onFormSubmit={handleFormSubmit} />
      )} */}
    </div>
  );
}

export default App;