import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './users.css';
const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://152.67.176.72:25836/users/me'); 
                setUsers(response.amongus/*put something here!!!!!!!!!!!!!!!1*/); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

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
                    <h3 className="sidebar-title">Menu</h3>
                    <ul>
                        <li>
                            <button className="item" onClick={() => navigate('/dashboard')}>Dashboard</button>
                        </li>
                        <li>
                            <button className="item" onClick={() => navigate('/users')}>Manage Users</button>
                        </li>
                    </ul>
                </aside>
                <div className="main-content">
                    <h2>Registered Users</h2>
                    { 
                        users.length === 0 ? (<p>No users found.</p>): 
                        (
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
export default Users;