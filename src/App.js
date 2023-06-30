import React from "react";
import MainButton from "./components/MainButton";
import SmallButton from "./components/SmallButton";
import InputField from "./components/InputField";
import LoginForm from "./components/LoginForm";
import { UserProvider } from "./contexts/UserContext";
import './App.css'

const App = () => {

  return (
    <UserProvider>
      <div className="app-container">
        <h1 id="logo-title">MediPred</h1>
        <LoginForm />
      </div>
    </UserProvider>
  );
}

export default App;