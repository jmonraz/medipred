import React, { useState } from "react";
import InputField from "../InputField";
import FormButton from "../FormButton";
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    const handleUsernameChange = event => {
        setUsername(event.target.value);
        setIsUsernameEmpty(false);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
        setIsPasswordEmpty(false);
    };

    const handleSubmit = event => {
        event.preventDefault();

        console.log('username: ', username);
        console.log('password: ', password);

        // validate the inputs
        if (!username) {
            setIsUsernameEmpty(true);
        }
        if (!password) {
            setIsPasswordEmpty(true);
        }

        // submit the form if inputs are valid
        if (username && password) {
            console.log('submit form');
            // reset form
            setUsername('');
            setPassword('');
            setIsUsernameEmpty(false);
            setIsPasswordEmpty(false);
        }


    }
    return (
        <form onSubmit={handleSubmit} className="login-form">
            <InputField id="username" type="username" placeholder="Username" value={username} onChange={handleUsernameChange} required />
            {/* {isUsernameEmpty && <span className="error-message">Username is required</span>} */}
            <InputField id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
            {/* {isPasswordEmpty && <span className="error-message">Password is required</span>} */}
            <FormButton type="submit">Login</FormButton>
            <FormButton type="submit">Change Password</FormButton>
        </form>
    );
}

export default LoginForm;