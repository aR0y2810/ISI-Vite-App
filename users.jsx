import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './users.css';
const Users = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://152.67.176.72:25836/users/me', config); 
                setUsers(response.data); 
            } catch (error) {
                console.error('Error fetching users:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/');
                }
            }
        };
        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };
    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`http://152.67.176.72:25836/users/${userId}`, config);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    const handleEditUser = (user) => {
        setEditUserId(user.id);
        setUpdatedName(user.name);
        setUpdatedEmail(user.email);
    };

    const handleUpdateUser = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`http://152.67.176.72:25836/users/${editUserId}`, { name: updatedName, email: updatedEmail }, config);
            setUsers(users.map(user => 
                user.id === editUserId ? { ...user, name: updatedName, email: updatedEmail } : user
            ));
            setEditUserId(null);
            setUpdatedName('');
            setUpdatedEmail('');
        } catch (error) {
            console.error('Error updating user:', error);
        }
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
                        users.length === 0 ? (
                            <p>No users found.</p>
                        ) : (
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{editUserId === user.id ? (
                                                <input 
                                                    type="text" 
                                                    value={updatedName} 
                                                    onChange={(e) => setUpdatedName(e.target.value)} 
                                                />
                                            ) : (
                                                user.name
                                            )}</td>
                                            <td>{editUserId === user.id ? (
                                                <input 
                                                    type="email" 
                                                    value={updatedEmail} 
                                                    onChange={(e) => setUpdatedEmail(e.target.value)} 
                                                />
                                            ) : (
                                                user.email
                                            )}</td>
                                            <td>
                                                {editUserId === user.id ? (
                                                    <>
                                                        <button onClick={handleUpdateUser}>Save</button>
                                                        <button onClick={() => setEditUserId(null)}>Cancel</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleEditUser(user)}>Edit</button>
                                                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                                    </>
                                                )}
                                            </td>
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