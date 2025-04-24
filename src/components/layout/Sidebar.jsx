import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

// Icons for sidebar
import { FaHome, FaFileAlt, FaBullseye, FaUsers, FaSitemap, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const {t} = useTranslation('sidebar');

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={require('../../assets/logo.png')} alt="Nazarbayev University" />
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li className={isActive('/dashboard')}>
                        <Link to="/dashboard">
                            <FaHome className="sidebar-icon" />
                            <span>{t('dashboard')}</span>
                        </Link>
                    </li>
                    <li className={isActive('/reports')}>
                        <Link to="/reports">
                            <FaFileAlt className="sidebar-icon" />
                            <span>{t('reports')}</span>
                        </Link>
                    </li>
                    <li className={isActive('/goals')}>
                        <Link to="/goals">
                            <FaBullseye className="sidebar-icon" />
                            <span>{t('goals')}</span>
                        </Link>
                    </li>
                    
                    { (
                        <li className={isActive('/my-team')}>
                            <Link to="/my-team">
                                <FaUsers className="sidebar-icon" />
                                <span>{t('your_team')}</span>
                            </Link>
                        </li>
                    )}
                    { (
                        <li className={isActive('/organization')}>
                            <Link to="/organization">
                                <FaSitemap className="sidebar-icon" />
                                <span>{t('your_organization')}</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <ul>
                    <li className={isActive('/settings')}>
                        <Link to="/settings">
                            <FaCog className="sidebar-icon" />
                            <span>{t('settings')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="logout-link" onClick={handleLogout}>
                            <FaSignOutAlt className="sidebar-icon" />
                            <span>{t('logout')}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;