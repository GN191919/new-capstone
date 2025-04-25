import React from 'react';
import './UserInfo.css';
import { useTranslation,  } from 'react-i18next';

const UserInfo = ({ user }) => {
    const { t } = useTranslation('dashboard');
    return (
        <div className="user-info-container">
            <div className="user-avatar">
                <span>{user?.name?.charAt(0) || 'M'}</span>
            </div>
            <div className="user-details">
                <h2 className="user-name">{user?.name || "Yerlan Amanbekov"}</h2>
                <p className="user-role">{t('user_role')}: {user?.supervisor || t('loading')}</p>
            </div>
        </div>
    );
};

export default UserInfo;