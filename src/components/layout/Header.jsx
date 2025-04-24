import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = ({ title }) => {
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    
    return (
        <div className="header">
            <h1 className="header-title">{title}   </h1>
            <div className="header-right">
                <div className="language-selector">
                    <select 
                        value={i18n.language} 
                        onChange={async (e) => {
                            const lang = e.target.value;
                            await i18n.changeLanguage(lang);
                            localStorage.setItem('language', lang);
                        }}
                    >
                        <option value="en">English</option>
                        <option value="ru">Русский</option>
                        <option value="kz">Қазақша</option>
                    </select>
                </div>
                <div className="user-profile">
                    <div className="user-avatar">
                        <span>{user?.name?.charAt(0) || 'M'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;