import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setErrorMessage('Both fields are required.');
            return;
        }
        
        try {
            const response = await axios.get(`http://152.67.176.72:8081/userauth?username=${username}&password=${password}`);
            
            if (response.data["auth"] === true) {
                navigate('/dashboard');
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An error occurred while trying to log in');
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </label>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};
export default Login;