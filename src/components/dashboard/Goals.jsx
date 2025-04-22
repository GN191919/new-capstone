import React from 'react';
import './Goals.css';

const Goals = () => {
    // Mock data for goals
    const goals = [
        { id: 1, title: 'Improve team communication', progress: 75, type: 'KPI' },
        { id: 2, title: 'Complete project documentation', progress: 40, type: 'KPI' },
        { id: 3, title: 'Leadership skills development', progress: 60, type: 'Competency' },
    ];

    return (
        <div className="goals-container">
            <div className="goals-header">
                <div className="goals-title">
                    <h3>My Goals</h3>
                    <div className="goals-count">
                        <span className="icon">🎯</span>
                        <span>3 active goals</span>
                    </div>
                </div>
                <a href="#" className="view-all-link">view all</a>
            </div>
            
            <div className="goals-list">
                {goals.map(goal => (
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