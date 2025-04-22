import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ title }) => {
    const { user } = useAuth();
    
    return (
        <div className="header">
            <h1 className="header-title">{title}</h1>
            <div className="header-right">
                <div className="language-selector">
                    <select defaultValue="English">
                        <option value="English">English</option>
                        <option value="Russian">Русский</option>
                        <option value="Kazakh">Қазақша</option>
                    </select>
                </div>
                <div className="user-profile">
                    <div className="user-avatar">
                        <span>{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;