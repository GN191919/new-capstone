import React, { useState } from 'react';
import './CheckIns.css';

const CheckIns = () => {
    const [activeTab, setActiveTab] = useState('Regular');
    
    // Mock data for check-ins
    const checkIns = [
        { id: 1, dueDate: '18 Jul 2024', submittedDate: '18 Jul 2024', status: 'Not Submitted', reviewer: 'Olivia Rhye' },
        { id: 2, dueDate: '04 Jul 2024', submittedDate: '04 Jul 2024', status: 'Not Submitted', reviewer: 'Olivia Rhye' },
        { id: 3, dueDate: '20 Jun 2024', submittedDate: '20 Jun 2024', status: 'Submitted', reviewer: 'Olivia Rhye' },
        { id: 4, dueDate: '06 Jun 2024', submittedDate: '06 Jun 2024', status: 'Submitted', reviewer: 'Olivia Rhye' },
        { id: 5, dueDate: '23 May 2024', submittedDate: '23 May 2024', status: 'Submitted', reviewer: 'Olivia Rhye' },
        { id: 6, dueDate: '09 May 2024', submittedDate: '09 May 2024', status: 'Submitted', reviewer: 'Olivia Rhye' },
    ];

    return (
        <div className="check-ins-container">
            <div className="check-ins-header">
                <div className="check-ins-title">
                    <h3>My Check-ins</h3>
                    <div className="check-ins-count">
                        <span className="icon">🕒</span>
                        <span>0 out of 2 done this month</span>
                    </div>
                </div>
                <a href="#" className="view-all-link">view all</a>
            </div>
            
            <div className="check-ins-tabs">
                <button 
                    className={`tab-button ${activeTab === 'Regular' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Regular')}
                >
                    Regular
                </button>
                <button 
                    className={`tab-button ${activeTab === 'Quarter' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Quarter')}
                >
                    Quarter <span className="badge">1</span>
                </button>
                <button 
                    className={`tab-button ${activeTab === 'Annual' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Annual')}
                >
                    Annual
                </button>
            </div>
            
            <div className="check-ins-table">
                <div className="table-header">
                    <div className="header-cell">Due date</div>
                    <div className="header-cell">Submitted date</div>
                    <div className="header-cell">Status</div>
                    <div className="header-cell">Reviewed by</div>
                </div>
                
                {checkIns.map(checkIn => (
                    <div className="table-row" key={checkIn.id}>
                        <div className="table-cell">{checkIn.dueDate}</div>
                        <div className="table-cell">{checkIn.submittedDate}</div>
                        <div className="table-cell">
                            <span className={`status-badge ${checkIn.status === 'Submitted' ? 'submitted' : 'not-submitted'}`}>
                                {checkIn.status}
                            </span>
                        </div>
                        <div className="table-cell reviewer">
                            <div className="reviewer-avatar">OR</div>
                            <span>{checkIn.reviewer}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckIns;