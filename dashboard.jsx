import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; 
const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    };
    return (
        <div className="container">
            <nav className="navbar">
                <h2 className="title">ISI Login App</h2>
                <button className="logoutButton" onClick={handleLogout}>Logout</button>
            </nav>
            <div className="content">
                <aside className="sidebar">
                    <h3>Menu</h3>
                    <ul>
                        <li className="menuItem" onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </li>
                    </ul>
                </aside>
                <div className="content">
                    <h2>Welcome to Dashboard! Filler content test test test</h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;