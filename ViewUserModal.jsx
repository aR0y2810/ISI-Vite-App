import React from 'react';
import './modal.css';

const ViewUserModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>User Details</h3>
                {user.image_base64 && (
                    <div className="profile-image-container">
                        <img 
                            src={`data:image/jpeg;base64,${user.image_base64}`}
                            alt="Profile"
                            style={{
                                maxWidth: '200px',
                                maxHeight: '200px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                margin: '10px auto',
                                display: 'block',
                                border: '2px solid #6200EE'
                            }}
                        />
                    </div>
                )}
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button 
                    onClick={onClose}
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#6200EE',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
export default ViewUserModal;