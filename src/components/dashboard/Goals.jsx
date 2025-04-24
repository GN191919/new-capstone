import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import performanceService from '../../services/performanceService';
import './Goals.css';

const Goals = () => {
    const { t } = useTranslation('dashboard');
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const competencyGoals = await performanceService.getCompetencyGoals();
                setGoals(competencyGoals);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGoals();
    }, []);

    return (
        <div className="goals-container">
            <div className="goals-header">
                <div className="goals-title">
                    <h3>{t('my_goals')}</h3>
                    <div className="goals-count">
                        <span className="icon">🎯</span>
                        <span>{t('active_goals')}</span>
                    </div>
                </div>
                <a href="/goals" className="view-all-link">{t('view_all')}</a>
            </div>
            
            <div className="goals-list">
                {loading ? (
                    <div className="loading-message">{t('loading')}...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : goals.map(goal => (
                    <div className="goal-item" key={goal.id}>
                        <div className="goal-info">
                            <div className="goal-title">{goal.title}</div>
                            <div className="goal-type">{goal.type}</div>
                        </div>
                        <div className="goal-progress-container">
                            <div className="goal-progress-bar">
                                <div 
                                    className="goal-progress-fill" 
                                    style={{ width: `${goal.progress}%` }}
                                ></div>
                            </div>
                            <div className="goal-progress-text">{goal.progress}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goals;