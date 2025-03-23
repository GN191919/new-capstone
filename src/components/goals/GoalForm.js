import React, { useState, useEffect } from 'react';
import performanceService from '../../services/performanceService';
import './GoalForm.css';

const GoalForm = () => {
    const [goalData, setGoalData] = useState({
        kpiGoals: [],
        competencyGoals: [],
        selectedCompetencies: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Fetch available competency goals on component mount
    useEffect(() => {
        const fetchCompetencyGoals = async () => {
            try {
                const competencies = await performanceService.getCompetencyGoals();
                setGoalData(prev => ({ ...prev, competencyGoals: competencies }));
            } catch (err) {
                setError('Failed to fetch competency goals');
            }
        };
        fetchCompetencyGoals();
    }, []);

    const handleKPIGoalAdd = () => {
        if (goalData.kpiGoals.length >= 3) {
            setError('Maximum 3 KPI goals allowed');
            return;
        }
        setGoalData(prev => ({
            ...prev,
            kpiGoals: [...prev.kpiGoals, { verb: '', noun: '', number: '', deadline: '', weight: 15 }]
        }));
    };

    const handleCompetencySelect = (competency) => {
        if (goalData.selectedCompetencies.length >= 2 && 
            !goalData.selectedCompetencies.find(c => c.id === competency.id)) {
            setError('Maximum 2 competency goals allowed');
            return;
        }
        setGoalData(prev => ({
            ...prev,
            selectedCompetencies: prev.selectedCompetencies.find(c => c.id === competency.id)
                ? prev.selectedCompetencies.filter(c => c.id !== competency.id)
                : [...prev.selectedCompetencies, { ...competency, weight: 15 }]
        }));
    };

    const handleKPIGoalChange = (index, field, value) => {
        const updatedKPIGoals = [...goalData.kpiGoals];
        updatedKPIGoals[index] = { ...updatedKPIGoals[index], [field]: value };

        // Validate weight distribution
        const totalWeight = updatedKPIGoals.reduce((sum, goal) => sum + Number(goal.weight), 0) +
            goalData.selectedCompetencies.reduce((sum, goal) => sum + Number(goal.weight), 0);

        if (field === 'weight' && totalWeight > 100) {
            setError('Total weight cannot exceed 100%');
            return;
        }

        setGoalData(prev => ({ ...prev, kpiGoals: updatedKPIGoals }));
        setError('');
    };

    const handleCompetencyWeightChange = (competencyId, weight) => {
        const updatedCompetencies = goalData.selectedCompetencies.map(comp =>
            comp.id === competencyId ? { ...comp, weight: Number(weight) } : comp
        );

        // Validate weight distribution
        const totalWeight = goalData.kpiGoals.reduce((sum, goal) => sum + Number(goal.weight), 0) +
            updatedCompetencies.reduce((sum, goal) => sum + Number(goal.weight), 0);

        if (totalWeight > 100) {
            setError('Total weight cannot exceed 100%');
            return;
        }

        setGoalData(prev => ({ ...prev, selectedCompetencies: updatedCompetencies }));
        setError('');
    };

    const validateGoals = () => {
        const kpiWeight = goalData.kpiGoals.reduce((sum, goal) => sum + Number(goal.weight), 0);
        const compWeight = goalData.selectedCompetencies.reduce((sum, goal) => sum + Number(goal.weight), 0);

        if (Math.abs(kpiWeight - 70) > 0.1) {
            setError('KPI goals must total 70% weight');
            return false;
        }

        if (Math.abs(compWeight - 30) > 0.1) {
            setError('Competency goals must total 30% weight');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateGoals()) return;

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await performanceService.setGoals({
                kpiGoals: goalData.kpiGoals,
                competencyGoals: goalData.selectedCompetencies
            });
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to set goals');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="goal-form-container">
            <h2>Goal Setting</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Goals set successfully!</div>}

            <form onSubmit={handleSubmit} className="goal-form">
                <section className="kpi-goals-section">
                    <h3>KPI Goals (70%)</h3>
                    {goalData.kpiGoals.map((goal, index) => (
                        <div key={index} className="goal-input-group">
                            <input
                                type="text"
                                placeholder="Verb (e.g., Increase)"
                                value={goal.verb}
                                onChange={(e) => handleKPIGoalChange(index, 'verb', e.target.value)}
                                required
                                title="Enter an action verb that describes what needs to be achieved"
                            />
                            <input
                                type="text"
                                placeholder="Noun (e.g., Sales)"
                                value={goal.noun}
                                onChange={(e) => handleKPIGoalChange(index, 'noun', e.target.value)}
                                required
                                title="Enter the subject or area of focus"
                            />
                            <input
                                type="number"
                                placeholder="Target Number"
                                value={goal.number}
                                onChange={(e) => handleKPIGoalChange(index, 'number', e.target.value)}
                                required
                                title="Enter the target number to be achieved"
                            />
                            <input
                                type="date"
                                value={goal.deadline}
                                onChange={(e) => handleKPIGoalChange(index, 'deadline', e.target.value)}
                                required
                                title="Select the deadline for this goal"
                            />
                            <input
                                type="number"
                                min="15"
                                max="40"
                                value={goal.weight}
                                onChange={(e) => handleKPIGoalChange(index, 'weight', e.target.value)}
                                required
                                title="Enter the weight (15-40%)"
                            />
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={handleKPIGoalAdd}
                        className="add-goal-button"
                        title="Add a new KPI goal"
                    >
                        Add KPI Goal
                    </button>
                </section>

                <section className="competency-goals-section">
                    <h3>Competency Goals (30%)</h3>
                    <div className="competency-list">
                        {goalData.competencyGoals.map((competency) => (
                            <div key={competency.id} className="competency-item">
                                <label className="competency-label">
                                    <input
                                        type="checkbox"
                                        checked={goalData.selectedCompetencies.some(c => c.id === competency.id)}
                                        onChange={() => handleCompetencySelect(competency)}
                                        title={`Select ${competency.name} as a competency goal`}
                                    />
                                    {competency.name}
                                </label>
                                {goalData.selectedCompetencies.some(c => c.id === competency.id) && (
                                    <input
                                        type="number"
                                        min="15"
                                        max="40"
                                        value={goalData.selectedCompetencies.find(c => c.id === competency.id).weight}
                                        onChange={(e) => handleCompetencyWeightChange(competency.id, e.target.value)}
                                        className="competency-weight"
                                        title="Enter the weight (15-40%)"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="submit-button"
                    title="Save all goals"
                >
                    {loading ? 'Saving...' : 'Save Goals'}
                </button>
            </form>
        </div>
    );
};

export default GoalForm;