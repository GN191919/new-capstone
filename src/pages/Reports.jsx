import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import './Reports.css';
import CheckIns from '../components/dashboard/CheckIns';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import performanceService from '../services/performanceService';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('Regular');

    const { t } = useTranslation('reports');
    
    const [checkIns, setCheckIns] = useState([]);

    useEffect(() => {
        const fetchCheckIns = async () => {
            try {
                const data = await performanceService.getCheckIns();
                setCheckIns(data);
            } catch (error) {
                console.error('Failed to fetch check-ins:', error);
            }
        };
        fetchCheckIns();
    }, []);

    const filteredCheckIns = checkIns.filter(checkIn => checkIn.type === activeTab);
    const reportTypes = ['Regular', 'Quarter', 'Annual'];
    const regularCount = checkIns.filter(checkIn => checkIn.type === 'Regular' && checkIn.status === 'Not Submitted').length;
    const quarterCount = checkIns.filter(checkIn => checkIn.type === 'Quarter' && checkIn.status === 'Not Submitted').length;
    const annualCount = checkIns.filter(checkIn => checkIn.type === 'Annual' && checkIn.status === 'Not Submitted').length;

    return (
        <Layout title={t('reports')}>
            <div className="check-ins-container">
                <div className="check-ins-header">
                    <div className="check-ins-title">
                        <h3>{t('my_checkins')}</h3>
                    </div>
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
                        <div className='header-cell'>{t('action')}</div>
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
                            <div className="table-cell">
                                <Link to = {`/reports/${checkIn.id}`}>
                                <button className={`submit-button ${checkIn.status === 'Submitted' ? 'submitted' : 'not-submitted'}`}>{checkIn.status === 'Submitted' ?  t('Review') : t('Submit')}</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </Layout>
    );
};

export default Reports;