import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import performanceService from '../../services/performanceService';
import './Goals.css';

const Goals = () => {
    const { t } = useTranslation('dashboard');
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock data for goals
    const mockGoals = [
        {
            id: 1,
            title: 'Improve Communication Skills',
            type: 'KPI',
            progress: 75
        },
        {
            id: 2,
            title: 'Learn React Advanced Patterns',
            type: 'KPI',
            progress: 45
        },
        {
            id: 3,
            title: 'Complete Leadership Training',
            type: 'Competency',
            progress: 20
        },
        {
            id: 4,
            title: 'Mentor Junior Developers',
            type: 'Competency',
            progress: 60
        }
    ];

    useEffect(() => {
        const fetchGoals = async () => {
            setLoading(true);
            try {
                const competencyGoals = await performanceService.getCompetencyGoals();
                setGoals(competencyGoals);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch goals:', err);
                setError('Failed to fetch goals from server. Showing mock data.');
                setGoals(mockGoals);
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
                {mockGoals.map(goal => (
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