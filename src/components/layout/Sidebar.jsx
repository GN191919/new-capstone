import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Icons for sidebar
import { FaHome, FaFileAlt, FaBullseye, FaUsers, FaSitemap, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={isActive('/reports')}>
                        <Link to="/reports">
                            <FaFileAlt className="sidebar-icon" />
                            <span>Reports</span>
                        </Link>
                    </li>
                    <li className={isActive('/goals')}>
                        <Link to="/goals">
                            <FaBullseye className="sidebar-icon" />
                            <span>Goals</span>
                        </Link>
                    </li>
                    <li className={isActive('/team')}>
                        <Link to="/team">
                            <FaUsers className="sidebar-icon" />
                            <span>Your Team</span>
                        </Link>
                    </li>
                    <li className={isActive('/organization')}>
                        <Link to="/organization">
                            <FaSitemap className="sidebar-icon" />
                            <span>Your Organization</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <ul>
                    <li className={isActive('/settings')}>
                        <Link to="/settings">
                            <FaCog className="sidebar-icon" />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="logout-link" onClick={handleLogout}>
                            <FaSignOutAlt className="sidebar-icon" />
                            <span>Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;