import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import GoalForm from '../components/goals/GoalForm';
import performanceService from '../services/performanceService';
import './Goals.css';

const Goals = () => {
    const [goals, setGoals] = useState({
        kpi: [],
        competency: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const userGoals = await performanceService.getUserGoals();
            setGoals(userGoals);
        } catch (err) {
            setError('Failed to fetch goals');
        } finally {
            setLoading(false);
        }
    };

    const handleGoalSubmit = async (newGoal) => {
        // Validate goal limits
        if (newGoal.type === 'kpi' && goals.kpi.length >= 3) {
            setError('Maximum limit of 3 KPI goals reached');
            return false;
        }
        if (newGoal.type === 'competency' && goals.competency.length >= 2) {
            setError('Maximum limit of 2 competency goals reached');
            return false;
        }

        try {
            await performanceService.addGoal(newGoal);
            await fetchGoals(); // Refresh goals list
            return true;
        } catch (err) {
            setError(err.message || 'Failed to add goal');
            return false;
        }
    };

    const handleProgressUpdate = async (goalId, progress) => {
        try {
            await performanceService.updateGoalProgress(goalId, progress);
            await fetchGoals(); // Refresh goals list
        } catch (err) {
            setError(err.message || 'Failed to update progress');
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="goals-container">
                <h2>Goals Management</h2>
                {error && <div className="error-message">{error}</div>}

                <div className="goals-section">
                    <h3>KPI Goals ({goals.kpi.length}/3)</h3>
                    <div className="goals-list">
                        {goals.kpi.map(goal => (
                            <div key={goal.id} className="goal-card">
                                <h4>{goal.name}</h4>
                                <p>Progress: {goal.progress}%</p>
                                <p>Weight: {goal.weight}%</p>
                                <input
                                    type="range"
                                    value={goal.progress}
                                    onChange={(e) => handleProgressUpdate(goal.id, e.target.value)}
                                    min="0"
                                    max="100"
                                />
                            </div>
                        ))}
                    </div>

                    <h3>Competency Goals ({goals.competency.length}/2)</h3>
                    <div className="goals-list">
                        {goals.competency.map(goal => (
                            <div key={goal.id} className="goal-card">
                                <h4>{goal.name}</h4>
                                <p>Progress: {goal.progress}%</p>
                                <input
                                    type="range"
                                    value={goal.progress}
                                    onChange={(e) => handleProgressUpdate(goal.id, e.target.value)}
                                    min="0"
                                    max="100"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <GoalForm onSubmit={handleGoalSubmit} />
            </div>
        </Layout>
    );
};

export default Goals;