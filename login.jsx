import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [token, setToken] = useState(''); // State variable to store the token

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setErrorMessage('Both fields are required.');
            return;
        }
        try {
            const response = await axios.post(
                `http://152.67.176.72:8081/token`,
                { username: username.trim(), password: password },
                { 
                  headers: { "Content-Type": 'application/x-www-form-urlencoded' },
                  timeout: 10000 // 10 second timeout
                }
              );
              if (response.status === 200 && response.data.token_type === "bearer") {
                const token = response.data.access_token;
                setToken(token);
                localStorage.setItem('authToken', token);
                navigate('/dashboard');
            } 
            else {
                setErrorMessage('Invalid username or password');
            }
        } 
        catch (err) {
            console.error(err);
            setErrorMessage('An error occurred while trying to log in');
        }
    };
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <div className="login-container">
            <h2>User Login</h2>
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
                        <div style={{ position: 'relative' }}>
                            <input 
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <span 
                                onClick={togglePasswordVisibility} 
                                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                            >
                                {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                    </label>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="register-link" style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>Don't have an account? <href onClick={() => navigate('/register')} style={{ color: '#6200EE', textDecoration: 'underline' }}>Register here</href></p>
            </div>
        </div>
    );
};
export default Login;