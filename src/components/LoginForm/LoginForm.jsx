import React, { useState, useRef } from "react";
import InputField from "../InputField";
import FormButton from "../FormButton";
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const formRef = useRef(null);

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = event => {

        console.log('username: ', username);
        console.log('password: ', password);

        // submit the form if inputs are valid
        if (username && password) {

            event.preventDefault();
            console.log('submit form');

            // make API request
            fetch('http://127.0.0.1:8080/api/v1/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('API response:', data);
                    if (data.message == 'User logged in failed') {
                        setLoginMessage('Invalid username or password entered.');
                    } else {
                        setLoginMessage('');
                        formRef.current.submit();
                    }
                    // reset form
                    setUsername('');
                    setPassword('');
                    setIsUsernameEmpty(false);
                    setIsPasswordEmpty(false);
                })
                .catch(error => {
                    console.log('API error:', error);
                    setLoginMessage('An error occurred. Please try again later.');
                })

        }


    }
    return (
        <form onSubmit={handleSubmit} className="login-form" ref={formRef}>
            <InputField id="username" type="username" placeholder="Username" value={username} onChange={handleUsernameChange} required />
            {/* {isUsernameEmpty && <span className="error-message">Username is required</span>} */}
            <InputField id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
            {/* {isPasswordEmpty && <span className="error-message">Password is required</span>} */}
            {loginMessage && <span className="error-message">{loginMessage}</span>}
            <FormButton type="submit" handleSubmit={handleSubmit}>Login</FormButton>
            <FormButton type="submit" handleSubmit={handleSubmit}>Change Password</FormButton>
        </form>
    );
}

export default LoginForm;