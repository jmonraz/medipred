import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField";
import FormButton from "../FormButton";
import { UserContext } from "../../contexts/UserContext";
import './LoginForm.css';

const LoginForm = ({ onFormSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const formRef = useRef(null);
    const { updateUser, updateAuthenticated, authenticated } = useContext(UserContext);

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async event => {

        console.log('username: ', username);
        console.log('password: ', password);

        // submit the form if inputs are valid
        if (username && password) {

            event.preventDefault();
            console.log('submit form');

            // set loading state to true
            setIsLoading(true);
            try {
                // make API request
                const response = await fetch('http://127.0.0.1:8000/api/v1/login/', {
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
                        if (data.message === 'User logged in failed') {
                            setLoginMessage('Invalid username or password entered.');
                            updateUser(null);
                        } else {
                            setLoginMessage('');
                            // update user state in UserContext
                            // formRef.current.submit();
                            updateUser(data.user);
                            updateAuthenticated(true);
                            navigate("/home");

                        }
                        // reset form
                        setUsername('');
                        setPassword('');
                        // set loading state to false after response is received
                        setIsLoading(false);
                    })
            }
            catch (error) {
                console.log('API error:', error);
                setLoginMessage('An error occurred. Please try again later.');
                // set loading state to false in case of error
                setIsLoading(false);
                updateUser(null);
            }
        }


    }
    return (
        <>
            <h1 id="logo-title">MediPred</h1>
            <form onSubmit={handleSubmit} className="login-form" /*ref={formRef}*/>
                <InputField id="username" type="username" placeholder="Username" value={username} onChange={handleUsernameChange} required />
                {/* {isUsernameEmpty && <span className="error-message">Username is required</span>} */}
                <InputField id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                {/* {isPasswordEmpty && <span className="error-message">Password is required</span>} */}
                {loginMessage && <span className="error-message">{loginMessage}</span>}
                <FormButton type="submit" handleSubmit={handleSubmit} disabled={isLoading}>Login</FormButton>
                {isLoading && <div className="loading-indicator">Loading...</div>}
            </form>
        </>
    );
}

export default LoginForm;