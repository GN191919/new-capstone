import React, { useState, useEffect } from 'react';
import performanceService from '../../services/performanceService';
import './CheckIns.css';
import { useTranslation } from 'react-i18next';

const CheckIns = () => {
    const [activeTab, setActiveTab] = useState('Regular');
    const { t } = useTranslation('dashboard');
    const [checkIns, setCheckIns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock data for check-ins
    const mockCheckIns = [
        {
            id: 1,
            type: 'Regular',
            dueDate: '2023-11-15',
            submittedDate: '2023-11-14',
            status: 'Submitted',
            reviewer: 'Olzhas Rakhimov'
        },
        {
            id: 2,
            type: 'Regular',
            dueDate: '2023-12-15',
            submittedDate: '',
            status: 'Not Submitted',
            reviewer: 'Olzhas Rakhimov'
        },
        {
            id: 3,
            type: 'Quarter',
            dueDate: '2023-09-30',
            submittedDate: '2023-09-28',
            status: 'Submitted',
            reviewer: 'Olzhas Rakhimov'
        },
        {
            id: 4,
            type: 'Quarter',
            dueDate: '2023-12-31',
            submittedDate: '',
            status: 'Not Submitted',
            reviewer: 'Olzhas Rakhimov'
        },
        {
            id: 5,
            type: 'Annual',
            dueDate: '2023-12-31',
            submittedDate: '',
            status: 'Not Submitted',
            reviewer: 'Olzhas Rakhimov'
        }
    ];

    useEffect(() => {
        const fetchCheckIns = async () => {
            setLoading(true);
            try {
                const data = await performanceService.getCheckIns();
                setCheckIns(data);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch check-ins:', error);
                setError('Failed to fetch check-ins from server. Showing mock data.');
                setCheckIns(mockCheckIns);
            } finally {
                setLoading(false);
            }
        };
        fetchCheckIns();
    }, []);

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