import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword || !email) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (image && image.size > 500 * 1024) {
            setErrorMessage('Image size should be less than 500 KB.');
            return;
        }
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('image', image);
        try {
            const response = await axios.post('http://152.67.176.72:8081/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status==200) {
                navigate('/login');
            } 
            else {
                setErrorMessage(response.data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An error occurred while trying to register');
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    return (
        <div className="register">
            <h2>User Registration</h2>
            <form onSubmit={handleRegister}>
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
                <div>
                    <label>
                        Confirm Password:
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Upload Image (optional):
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                    </label>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className="button-container">
                    <button type="submit">Register</button>
                </div>
            </form>
            <div className="login-link" style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>Already have an account? <a href="/" style={{ color: '#6200EE', textDecoration: 'underline' }}>Login here</a></p>
            </div>
        </div>
    );
};
export default Register;