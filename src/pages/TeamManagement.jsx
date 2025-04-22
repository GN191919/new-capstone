import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import performanceService from '../services/performanceService';
import './TeamManagement.css';

const TeamManagement = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const employeeList = await performanceService.getSubordinates();
            setEmployees(employeeList);
        } catch (err) {
            setError('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = () => {
        navigate('/team/add');
    };

    const handleEmployeeClick = (employeeId) => {
        navigate(`/team/${employeeId}`);
    };

    const handleDeleteEmployee = async (employeeId, event) => {
        event.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return;
        }

        try {
            await performanceService.deleteEmployee(employeeId);
            await fetchEmployees();
        } catch (err) {
            setError(err.message || 'Failed to delete employee');
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'status-active';
            case 'on vacation': return 'status-vacation';
            case 'overdue': return 'status-overdue';
            default: return 'status-default';
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="team-management-container">
                <div className="team-header">
                    <h2>Team Management</h2>
                    <button 
                        className="add-employee-button"
                        onClick={handleAddEmployee}
                    >
                        Add New Employee
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="employee-table-container">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Reports</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr 
                                    key={employee.id}
                                    onClick={() => handleEmployeeClick(employee.id)}
                                    className="employee-row"
                                >
                                    <td>{employee.name}</td>
                                    <td>{employee.title}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(employee.status)}`}>
                                            {employee.status}
                                        </span>
                                    </td>
                                    <td>
                                        {employee.hasOverdueReports ? (
                                            <span className="overdue-reports">Overdue</span>
                                        ) : (
                                            <span className="reports-complete">Complete</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="delete-button"
                                            onClick={(e) => handleDeleteEmployee(employee.id, e)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default TeamManagement;