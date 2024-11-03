import React, { useState } from 'react';
import './modal.css'; 

const UpdateUserModal = ({ user, updatedName, setUpdatedName, updatedEmail, setUpdatedEmail, onUpdate, onClose }) => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.image_base64 ? `data:image/jpeg;base64,${user.image_base64}` : null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) { // 1MB limit
                alert('Image size should be less than 1MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImage(base64String);
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Update User</h3>
                <div className="form-group">
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={updatedName} 
                        onChange={(e) => setUpdatedName(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={updatedEmail} 
                        onChange={(e) => setUpdatedEmail(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Profile Image:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                {imagePreview && (
                    <div className="image-preview">
                        <img 
                            src={imagePreview} 
                            alt="Preview" 
                            style={{ maxWidth: '200px', marginTop: '10px' }}
                        />
                    </div>
                )}
                <div className="button-group">
                    <button className="update-btn" onClick={() => onUpdate(image)}>Update</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;