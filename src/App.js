import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { UserProvider } from "./contexts/UserContext";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css'

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  console.log(authenticated);

  useEffect(() => {
    if (authenticated) {
      document.body.classList.add("body-authenticated");
    } else {
      document.body.classList.remove("body-authenticated");
    }
  }, [authenticated]);

  const handleAuthentication = (authenticated) => {
    setAuthenticated(authenticated);
  }


  return (
    <UserProvider>
      <div className="app-container">
        {authenticated ? (
          <Dashboard />
        ) : (
          <LoginForm handleAuthentication={handleAuthentication} />
        )}
      </div>
    </UserProvider>
  );
}

export default App;