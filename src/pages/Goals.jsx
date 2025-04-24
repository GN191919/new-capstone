import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import performanceService from '../services/performanceService';
import { Modal, Button, Progress, Tabs } from 'antd';
import './Goals.css';

const { TabPane } = Tabs;

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [newProgress, setNewProgress] = useState(0);

    useEffect(() => {
        fetchGoals();
    }, []);

    const [activeTab, setActiveTab] = useState('personal');

    const handleTabChange = (key) => {
        setActiveTab(key);
        fetchGoals(key);
    };

    // Add dummy data
    const dummyGoals = {
        personal: [
            {
                id: 1,
                name: 'Increase EE score to 72',
                description: 'Make necessary work to increase...',
                progress: 20,
                startDate: '18 Jul 2024',
                dueDate: '18 Jul 2024'
            },
            {
                id: 2,
                name: 'Increase EE score to 72',
                description: 'Make necessary work to increase...',
                progress: 60,
                startDate: '04 Jul 2024',
                dueDate: '04 Jul 2024'
            },
            {
                id: 3,
                name: 'Increase EE score to 72',
                description: 'Make necessary work to increase...',
                progress: 100,
                startDate: '23 May 2024',
                dueDate: '23 May 2024'
            }
        ],
        team: [
            {
                id: 4,
                name: 'Team Performance Goal',
                description: 'Improve team productivity...',
                progress: 45,
                startDate: '01 Jul 2024',
                dueDate: '31 Jul 2024'
            }
        ],
        department: [
            {
                id: 5,
                name: 'Department Initiative',
                description: 'Implement new processes...',
                progress: 30,
                startDate: '01 Jun 2024',
                dueDate: '30 Aug 2024'
            }
        ]
    };

    // Modify fetchGoals to use dummy data
    const fetchGoals = async (type = 'personal') => {
        try {
            setLoading(true);
            // Simulate API call with dummy data
            setGoals(dummyGoals[type]);
        } catch (err) {
            setError('Failed to fetch goals');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = (goal) => {
        setSelectedGoal(goal);
        setNewProgress(goal.progress);
        setIsModalVisible(true);
    };

    const handleProgressUpdate = async () => {
        try {
            await performanceService.updateGoalProgress(selectedGoal.id, newProgress);
            await fetchGoals();
            setIsModalVisible(false);
        } catch (err) {
            setError(err.message || 'Failed to update progress');
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;

    const completedGoals = goals.filter(goal => goal.progress === 100).length;
    const totalGoals = goals.length;
    const completionPercentage = Math.round((completedGoals / totalGoals) * 100) || 0;

    const renderGoalsTable = (goals) => (
        <div className="goals-table">
            <div className="table-header">
                <span>Goal</span>
                <span>Progress</span>
                <span>Start date</span>
                <span>Due date</span>
                <span>Actions</span>
            </div>
            {goals.map(goal => (
                <div key={goal.id} className="table-row">
                    <div className="goal-info">
                        <h4>{goal.name}</h4>
                        <p>{goal.description}</p>
                    </div>
                    <div className="goal-progress">
                        <Progress percent={goal.progress} />
                    </div>
                    <span>{goal.startDate}</span>
                    <span>{goal.dueDate}</span>
                    <Button 
                        type="primary"
                        onClick={() => handleUpdate(goal)}
                        className={goal.progress === 100 ? 'completed-button' : ''}
                    >
                        {goal.progress === 100 ? 'Completed' : 'Update'}
                    </Button>
                </div>
            ))}
        </div>
    );

    return (
        <Layout>
            <div className="page-header">Goals</div>
            <div className="goals-container">
                <div className="goals-header">
                    <div className="goals-summary">
                        <h2>My Goals</h2>
                        <p>{completedGoals} out of {totalGoals} done this month</p>
                    </div>
                    <div className="goals-actions">
                        <Progress type="circle" percent={completionPercentage} />
                        <Button type="primary" onClick={() => setIsModalVisible(true)}>+ Create Goal</Button>
                    </div>
                </div>

                // In the return statement, modify the Tabs component:
                <Tabs defaultActiveKey="personal" onChange={handleTabChange}>
                    <TabPane tab="Personal" key="personal">
                        {renderGoalsTable(goals)}
                    </TabPane>
                    <TabPane tab={<>Team <span className="beta-tag">1</span></>} key="team">
                        {renderGoalsTable(goals)}
                    </TabPane>
                    <TabPane tab="Department" key="department">
                        {renderGoalsTable(goals)}
                    </TabPane>
                </Tabs>

                <Modal
                    title="Update Goal Progress"
                    visible={isModalVisible}
                    onOk={handleProgressUpdate}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <div className="progress-update-form">
                        <h4>{selectedGoal?.name}</h4>
                        <input
                            type="range"
                            value={newProgress}
                            onChange={(e) => setNewProgress(parseInt(e.target.value))}
                            min="0"
                            max="100"
                        />
                        <span>{newProgress}%</span>
                    </div>
                </Modal>
            </div>
        </Layout>
    );
};

export default Goals;