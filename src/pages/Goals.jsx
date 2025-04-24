import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import performanceService from '../services/performanceService';
import { Modal, Button, Progress, Form, Input, DatePicker, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Goals.css';
import { useTranslation } from 'react-i18next';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [newProgress, setNewProgress] = useState(0);
    const { t } = useTranslation('goals');
    const [form] = Form.useForm();

    // Dummy data for goals
    const dummyGoals = [
        {
            id: 1,
            name: 'Increase EE score to 72',
            description: 'Make necessary work to increase...',
            progress: 20,
            startDate: '18 Jul 2024',
            dueDate: '18 Jul 2024',
            type: 'KPI',
            weight: 25
        },
        {
            id: 2,
            name: 'Increase EE score to 72',
            description: 'Make necessary work to increase...',
            progress: 60,
            startDate: '04 Jul 2024',
            dueDate: '04 Jul 2024',
            type: 'KPI',
            weight: 25
        },
        {
            id: 3,
            name: 'Increase EE score to 72',
            description: 'Make necessary work to increase...',
            progress: 60,
            startDate: '20 Jun 2024',
            dueDate: '20 Jun 2024',
            type: 'KPI',
            weight: 20
        },
        {
            id: 4,
            name: 'Improve communication skills',
            description: 'Attend workshops and practice...',
            progress: 60,
            startDate: '06 Jun 2024',
            dueDate: '06 Jun 2024',
            type: 'Competency',
            weight: 15
        },
        {
            id: 5,
            name: 'Develop leadership abilities',
            description: 'Take initiative in team projects...',
            progress: 100,
            startDate: '23 May 2024',
            dueDate: '23 May 2024',
            type: 'Competency',
            weight: 15
        }
    ];

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            // In a real app, we would fetch from API
            // const response = await performanceService.getGoals();
            // setGoals(response.data);
            
            // Using dummy data for now
            setTimeout(() => {
                setGoals(dummyGoals);
                setLoading(false);
            }, 500);
        } catch (err) {
            setError('Failed to fetch goals');
            setLoading(false);
        }
    };

    const [newType, setNewType] = useState('');
    const [newWeight, setNewWeight] = useState(0);

    const handleUpdate = (goal) => {
        setSelectedGoal(goal);
        setNewProgress(goal.progress);
        setNewType(goal.type);
        setNewWeight(goal.weight);
        setIsUpdateModalVisible(true);
    };

    const handleProgressUpdate = async () => {
        try {
            // Check if total weight will exceed 100% (only counting active goals)
            const otherActiveGoalsWeight = goals
                .filter(goal => goal.id !== selectedGoal.id && goal.progress < 100)
                .reduce((sum, goal) => sum + goal.weight, 0);
            
            if (otherActiveGoalsWeight + newWeight > 100) {
                setError('Total weight of all active goals cannot exceed 100%');
                return;
            }

            // In a real app, we would update via API
            // await performanceService.updateGoalProgress(selectedGoal.id, newProgress, newType, newWeight);
            
            // Update locally for now
            const updatedGoals = goals.map(goal => 
                goal.id === selectedGoal.id ? { 
                    ...goal, 
                    progress: newProgress,
                    type: newType,
                    weight: newWeight
                } : goal
            );
            setGoals(updatedGoals);
            setIsUpdateModalVisible(false);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to update goal');
        }
    };

    const handleAddGoal = async (values) => {
        try {
            // Filter out completed goals (100% progress) when checking limits
            const activeGoals = goals.filter(goal => goal.progress < 100);
            
            // Check if we've reached the maximum number of active goals
            if (activeGoals.length >= 5) {
                setError('Maximum of 5 active goals allowed');
                return;
            }

            // Check if we've reached the maximum number of goals by type (excluding completed goals)
            const activeKpiGoalsCount = activeGoals.filter(goal => goal.type === 'KPI').length;
            const activeCompetencyGoalsCount = activeGoals.filter(goal => goal.type === 'Competency').length;

            if (values.type === 'KPI' && activeKpiGoalsCount >= 3) {
                setError('Maximum of 3 active KPI goals allowed');
                return;
            }

            if (values.type === 'Competency' && activeCompetencyGoalsCount >= 2) {
                setError('Maximum of 2 active Competency goals allowed');
                return;
            }

            // Check if total weight will exceed 100% (only counting active goals)
            const activeGoalsWeight = goals.filter(goal => goal.progress < 100).reduce((sum, goal) => sum + goal.weight, 0);
            const totalWeight = activeGoalsWeight + parseInt(values.weight);
            if (totalWeight > 100) {
                setError('Total weight of all active goals cannot exceed 100%');
                return;
            }

            // Format dates for display
            // Handle Moment objects from DatePicker
            const startDateObj = values.startDate ? values.startDate.toDate ? values.startDate.toDate() : new Date(values.startDate) : new Date();
            const dueDateObj = values.dueDate ? values.dueDate.toDate ? values.dueDate.toDate() : new Date(values.dueDate) : new Date();
            
            const startDateFormatted = startDateObj.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            
            const dueDateFormatted = dueDateObj.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            // Create new goal object
            const newGoal = {
                id: goals.length + 1,
                name: values.name,
                description: values.description,
                progress: 0,
                startDate: startDateFormatted,
                dueDate: dueDateFormatted,
                type: values.type,
                weight: parseInt(values.weight)
            };

            // In a real app, we would send to API
            // await performanceService.createGoal(newGoal);
            
            // Add locally for now
            setGoals([newGoal, ...goals]);
            setIsAddModalVisible(false);
            form.resetFields();
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to add goal');
        }
    };

    if (loading) return <Layout><div className="loading-container">Loading...</div></Layout>;

    const completedGoals = goals.filter(goal => goal.progress === 100).length;
    const totalGoals = goals.length;

    return (
        <Layout title={t('goals')}>
            <div className="breadcrumb">
                <span className="home-icon">🏠</span>
                <span>My Goals</span>
            </div>
            
            <div className="goals-container">
                <div className="goals-header">
                    <div className="goals-title">
                        <h2>My Goals</h2>
                        <div className="goals-count">
                            <span className="clock-icon">🕒</span>
                            <span>{completedGoals} out of {totalGoals} done this month</span>
                        </div>
                    </div>
                    <div className="goals-actions">
                        <div className="progress-circle">
                            <div className="progress-value">{Math.round((completedGoals / totalGoals) * 100)}%</div>
                        </div>
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={() => setIsAddModalVisible(true)}
                            className="add-goal-btn"
                        >
                            Add Goal
                        </Button>
                    </div>
                </div>
                
                <div className="goals-table-container">
                    <table className="goals-table">
                        <thead>
                            <tr>
                                <th>Goal</th>
                                <th>Type</th>
                                <th>Weight</th>
                                <th>Progress</th>
                                <th>Start date</th>
                                <th>Due date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {goals.map(goal => (
                                <tr key={goal.id}>
                                    <td className="goal-info-cell">
                                        <div className="goal-name">{goal.name}</div>
                                        <div className="goal-description">{goal.description}</div>
                                    </td>
                                    <td>
                                        <div className={`goal-type ${goal.type === 'KPI' ? 'kpi-type' : 'competency-type'}`}>
                                            {goal.type}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="goal-weight">{goal.weight}%</div>
                                    </td>
                                    <td>
                                        <div className="progress-bar-container">
                                            <div 
                                                className={`progress-bar ${goal.progress === 100 ? 'completed' : ''}`}
                                                style={{ width: `${goal.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="progress-text">{goal.progress}%</div>
                                    </td>
                                    <td>{goal.startDate}</td>
                                    <td>{goal.dueDate}</td>
                                    <td>
                                        <Button 
                                            className={goal.progress === 100 ? 'completed-button' : 'update-button'}
                                            onClick={() => handleUpdate(goal)}
                                        >
                                            {goal.progress === 100 ? 'Completed' : 'Update'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Update Goal Modal */}
                <Modal
                    title="Update Goal"
                    open={isUpdateModalVisible}
                    onOk={handleProgressUpdate}
                    onCancel={() => setIsUpdateModalVisible(false)}
                    okText="Save"
                    cancelText="Cancel"
                >
                    <div className="progress-update-form">
                        <h4>{selectedGoal?.name}</h4>
                        
                        <div className="update-form-section">
                            <label>Progress:</label>
                            <input
                                type="range"
                                value={newProgress}
                                onChange={(e) => setNewProgress(parseInt(e.target.value))}
                                min="0"
                                max="100"
                                className="progress-slider"
                            />
                            <div className="progress-value">{newProgress}%</div>
                        </div>
                        
                        
                    </div>
                </Modal>
                
                {/* Add Goal Modal */}
                <Modal
                    title="Add New Goal"
                    open={isAddModalVisible}
                    onCancel={() => setIsAddModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleAddGoal}
                        className="add-goal-form"
                    >
                        <Form.Item
                            name="name"
                            label="Goal Name"
                            rules={[{ required: true, message: 'Please enter goal name' }]}
                        >
                            <Input placeholder="Enter goal name" />
                        </Form.Item>
                        
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter description' }]}
                        >
                            <Input.TextArea placeholder="Enter goal description" rows={3} />
                        </Form.Item>
                        
                        <div className="form-row">
                            <Form.Item
                                name="type"
                                label="Goal Type"
                                rules={[{ required: true, message: 'Please select goal type' }]}
                                className="type-input"
                            >
                                <Select placeholder="Select goal type">
                                    <Select.Option value="KPI">KPI</Select.Option>
                                    <Select.Option value="Competency">Competency</Select.Option>
                                </Select>
                            </Form.Item>
                            
                            <Form.Item
                                name="weight"
                                label="Weight (%)"
                                rules={[{ required: true, message: 'Please enter weight' }]}
                                className="weight-input"
                            >
                                <Input type="number" min="1" max="100" placeholder="Enter weight percentage" />
                            </Form.Item>
                        </div>
                        
                        <div className="form-row">
                            <Form.Item
                                name="startDate"
                                label="Start Date"
                                rules={[{ required: true, message: 'Please select start date' }]}
                                className="date-input"
                            >
                                <DatePicker format="DD MMM YYYY" />
                            </Form.Item>
                            
                            <Form.Item
                                name="dueDate"
                                label="Due Date"
                                rules={[{ required: true, message: 'Please select due date' }]}
                                className="date-input"
                            >
                                <DatePicker format="DD MMM YYYY" />
                            </Form.Item>
                        </div>
                        
                        <div className="form-actions">
                            <Button onClick={() => setIsAddModalVisible(false)}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Add Goal</Button>
                        </div>

                        {error && <div className="error-message">{error}</div>}
                    </Form>
                </Modal>
            </div>
        </Layout>
    );
};

export default Goals;