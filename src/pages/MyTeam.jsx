import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import performanceService from '../services/performanceService';
import './MyTeam.css';

const MyTeam = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTeamData();
    }, []);

    const fetchTeamData = async () => {
        try {
            const data = await performanceService.getTeamMembers();
            setEmployees(data);
        } catch (err) {
            setError('Failed to fetch team data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="my-team-container">
                <h2>My Team</h2>
                {error && <div className="error-message">{error}</div>}
                
                <div className="team-list">
                    <div className="team-list-header">
                        <div className="header-name">Name</div>
                        <div className="header-status">Status</div>
                        <div className="header-progress">Goal Progress</div>
                        <div className="header-checkin">Last Check-in</div>
                        <div className="header-due">Due Date</div>
                        <div className="header-actions">Actions</div>
                    </div>

                    {employees.map(employee => (
                        <div key={employee.id} className="team-member-row">
                            <div className="member-name">{employee.name}</div>
                            <div className="member-status">
                                <span className={`status-badge ${employee.status.toLowerCase()}`}>
                                    {employee.status}
                                </span>
                            </div>
                            <div className="member-progress">
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ width: `${employee.goalProgress}%` }}
                                    />
                                </div>
                                <span>{employee.goalProgress}%</span>
                            </div>
                            <div className="member-checkin">
                                {new Date(employee.lastCheckIn).toLocaleDateString()}
                            </div>
                            <div className="member-due">
                                {new Date(employee.nextDueDate).toLocaleDateString()}
                            </div>
                            <div className="member-actions">
                                <Link 
                                    to={`/organization/${employee.id}`}
                                    className="review-button"
                                >
                                    Review
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default MyTeam;