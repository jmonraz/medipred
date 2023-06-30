import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import { UserProvider } from "./contexts/UserContext";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css'

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  console.log(authenticated);

  const handleAuthentication = (authenticated) => {
    setAuthenticated(authenticated);
  }


  return (
    <UserProvider>
      <div className="app-container">
        <h1 id="logo-title">MediPred</h1>
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