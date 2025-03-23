import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user.name}!</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <div className="dashboard-content">
                <p>You are logged in as: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        </div>
    );
};

export default Dashboard;