import React, { useState, useEffect, useContext } from "react";
import LoginForm from "./components/LoginForm";
import { UserProvider } from "./contexts/UserContext";
import Dashboard from "./components/Dashboard/Dashboard";
import { UserContext } from "./contexts/UserContext";
import './App.css'

const App = () => {

  // const [authenticated, setAuthenticated] = useState(false);
  const { authenticated } = useContext(UserContext);
  const [formSubmitted, setFormSubmitted] = useState(false);
  console.log(authenticated);

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
      {authenticated ? (
        <Dashboard />
      ) : (
        <LoginForm onFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;