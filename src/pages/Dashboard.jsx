import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import UserInfo from '../components/dashboard/UserInfo';
import CheckIns from '../components/dashboard/CheckIns';
import Goals from '../components/dashboard/Goals';
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
        <Layout title="Dashboard">
            <div className="dashboard-container">
                <div className="dashboard-top-section">
                    <UserInfo user={user} />
                </div>
                
                <div className="dashboard-grid">
                    <div className="dashboard-column">
                        <CheckIns />
                    </div>
                    <div className="dashboard-column">
                        <Goals />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;