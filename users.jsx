import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './users.css';
import ViewUserModal from './ViewUserModal';
import UpdateUserModal from './UpdateUserModal'; 

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://152.67.176.72:8081/users', config); 
            setUsers(response.data["users_data"]); 
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error.response && error.response.status === 401) {
                navigate('/');
            }
        }
    };

    useEffect(() => {
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
            await axios.delete(`http://152.67.176.72:8081/delete_user?username=${userId}`, config);
            setUsers(users.filter(user => user.username !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdateUser = async (imageBase64) => {
        try {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            let base64Data = null;
            if (imageBase64) {
                // Extract the base64 data after the comma
                base64Data = imageBase64.split(',')[1];
            }

            await axios.post(`http://152.67.176.72:8081/update/`, {
                username: updatedName,
                email: updatedEmail,
                image_base64: base64Data
            }, config);
            
            // Refresh the users list
            await fetchUsers();
            
            // Close the modal and reset states
            closeModal();
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };

    const openModal = (user, action) => {
        if (action === 'view') {
            setSelectedUser(user);
        } else if (action === 'update') {
            setEditUserId(user.username);
            setUpdatedName(user.username);
            setUpdatedEmail(user.email);
        }
    };

    const closeModal = () => {
        setSelectedUser(null);
        setEditUserId(null);
        setUpdatedName('');
        setUpdatedEmail('');
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
                    <nav className="tableTitle">
                        <h2>Registered Users</h2>
                        <button className="addButton" onClick={() => navigate('/register')}>+ Add User</button>
                    </nav>
                    {users.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.username}>
                                        <td className="index">{index + 1}</td>
                                        <td className="username">{user.username}</td>
                                        <td className="email">{user.email}</td>
                                        <td className="action">
                                            <button onClick={() => openModal(user, 'view')} className="text-blue-500">View</button>
                                            <button onClick={() => openModal(user, 'update')} className="text-green-500 ml-2">Update</button>
                                            <button onClick={() => handleDeleteUser(user.username)} className="text-red-500 ml-2">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {selectedUser && (
                        <ViewUserModal user={selectedUser} onClose={closeModal} />
                    )}
                    {editUserId && (
                        <UpdateUserModal 
                            user={{ username: editUserId }}
                            updatedName={updatedName}
                            setUpdatedName={setUpdatedName}
                            updatedEmail={updatedEmail}
                            setUpdatedEmail={setUpdatedEmail}
                            onUpdate={handleUpdateUser}
                            onClose={closeModal}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;