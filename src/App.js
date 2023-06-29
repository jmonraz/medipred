import React from "react";
import MainButton from "./components/MainButton";
import SmallButton from "./components/SmallButton";
import InputField from "./components/InputField";
import LoginForm from "./components/LoginForm";
import './App.css'

const App = () => {

  const [counter, setCounter] = React.useState(0);

  const onClickHandler = event => {
    setCounter(prevCounter => prevCounter + 1);
  }

  const onClickResetHandler = event => {
    setCounter(0);
  }

  return (
    <div className="app-container">
      <h1 id="logo-title">MediPred</h1>
      <LoginForm />
    </div>
  );
}

export default App;