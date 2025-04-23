import React, { useState } from 'react';
import './CheckIns.css';
import { useTranslation,  } from 'react-i18next';
import { type } from '@testing-library/user-event/dist/type';

const CheckIns = () => {
    const [activeTab, setActiveTab] = useState('Regular');

    const { t } = useTranslation('dashboard');
    
    // Mock data for check-ins
    const checkIns = [
        { id: 1, dueDate: '18 Jul 2024', submittedDate: '18 Jul 2024', status: 'Not Submitted', reviewer: 'Olivia Rhye', type: 'Regular'  },
        { id: 2, dueDate: '04 Jul 2024', submittedDate: '04 Jul 2024', status: 'Not Submitted', reviewer: 'Olivia Rhye', type: 'Quarter'},
        { id: 3, dueDate: '20 Jun 2024', submittedDate: '20 Jun 2024', status: 'Submitted', reviewer: 'Olivia Rhye', type: 'Annual'},
        { id: 4, dueDate: '06 Jun 2024', submittedDate: '06 Jun 2024', status: 'Submitted', reviewer: 'Olivia Rhye', type: 'Quarter' },
        { id: 5, dueDate: '23 May 2024', submittedDate: '23 May 2024', status: 'Submitted', reviewer: 'Olivia Rhye', type: 'Regular'  },
        { id: 6, dueDate: '09 May 2024', submittedDate: '09 May 2024', status: 'Submitted', reviewer: 'Olivia Rhye', type: 'Quarter' },
    ];

    const regularCount = checkIns.filter(checkIn => checkIn.type === 'Regular' && checkIn.status === 'Not Submitted').length;
    const quarterCount = checkIns.filter(checkIn => checkIn.type === 'Quarter' && checkIn.status === 'Not Submitted').length;
    const annualCount = checkIns.filter(checkIn => checkIn.type === 'Annual' && checkIn.status === 'Not Submitted').length;

    const filteredCheckIns = checkIns.filter(checkIn => checkIn.type === activeTab);

    return (
        <div className="check-ins-container">
            <div className="check-ins-header">
                <div className="check-ins-title">
                    <h3>{t('my_checkins')}</h3>
                </div>
                <a href="/reports" className="view-all-link">{t('view_all')}</a>
            </div>
            
            <div className="check-ins-tabs">
                    <button 
                        className={`tab-button ${activeTab === 'Regular' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Regular')}
                    >
                        {t('regular')} {regularCount === 0 ? (null): (<span className="badge">{regularCount}</span>)} 
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'Quarter' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Quarter')}
                    >
                        {t('quarter')} {quarterCount === 0 ? (null) : (<span className="badge">{quarterCount}</span>)} 
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'Annual' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Annual')}
                    >
                        {t('annual')} {annualCount === 0 ? (null): (<span className="badge">{annualCount}</span>)} 
                    </button>
            </div>
            
            <div className="check-ins-table">
                <div className="table-header">
                    <div className="header-cell">{t('due_date')}</div>
                    <div className="header-cell">{t('submitted_date')}</div>
                    <div className="header-cell">{t('status')}</div>
                    <div className="header-cell">{t('reviewed_by')}</div>
                </div>
                
                {filteredCheckIns.map(checkIn => (
                    <div className="table-row" key={checkIn.id}>
                        <div className="table-cell">{checkIn.dueDate}</div>
                        <div className="table-cell">{checkIn.submittedDate}</div>
                        <div className="table-cell">
                            <span className={`status-badge ${checkIn.status === 'Submitted' ? 'submitted' : 'not-submitted'}`}>
                                {t(checkIn.status)}
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