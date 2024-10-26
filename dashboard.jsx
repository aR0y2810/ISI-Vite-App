import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; 
const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
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
                        <button className="item1" onClick={() => navigate('/dashboard')}>Dashboard</button>
                        <button className="item2" onClick={() => navigate('/users')}>Manage Users</button>
                    </ul>
                </aside>
                <div className="main-content">
                    <h2>Welcome Filler content test test test</h2>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;