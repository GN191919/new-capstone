import React from 'react';
import './UserInfo.css';

const UserInfo = ({ user }) => {
    return (
        <div className="user-info-container">
            <div className="user-avatar">
                <span>{user?.name?.charAt(0) || 'M'}</span>
            </div>
            <div className="user-details">
                <h2 className="user-name">{user?.name || 'Moldir Turdybayeva'}</h2>
                <p className="user-role">Superviser: {user?.supervisor || 'Moldir Turdybayeva'}</p>
            </div>
        </div>
    );
};

export default UserInfo;