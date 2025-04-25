import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import performanceService from '../services/performanceService';
import Avatar from '../components/common/Avatar';
import './Organization.css';
import { getMockEmployees } from '../mockEmployeeData';
// Mock data for organization employees when API fails
const mockEmployees = [
    {
        id: 1,
        name: 'John Smith',
        title: 'Senior Developer',
        department: 'Engineering',
        status: 'Active',
        hasOverdueReports: false
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        title: 'Product Manager',
        department: 'Product',
        status: 'On Vacation',
        hasOverdueReports: false
    },
    {
        id: 3,
        name: 'Michael Chen',
        title: 'UX Designer',
        department: 'Design',
        status: 'Overdue',
        hasOverdueReports: true
    },
    {
        id: 4,
        name: 'Emily Rodriguez',
        title: 'QA Engineer',
        department: 'Quality Assurance',
        status: 'Active',
        hasOverdueReports: false
    },
    {
        id: 5,
        name: 'David Kim',
        title: 'Frontend Developer',
        department: 'Engineering',
        status: 'Active',
        hasOverdueReports: false
    },
    {
        id: 6,
        name: 'Lisa Wang',
        title: 'Backend Developer',
        department: 'Engineering',
        status: 'Active',
        hasOverdueReports: true
    }
];

const Organization = () => {
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
            // Use mock data when API call fails
            setEmployees(getMockEmployees());
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = () => {
        navigate('/organization/add');
    };

    const handleEmployeeClick = (employeeId) => {
        navigate(`/organization/${employeeId}`);
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
            <div className="organization-container">
                <div className="organization-header">
                    <h2>Organization Management</h2>
                    <button 
                        className="add-employee-button"
                        onClick={handleAddEmployee}
                    >
                        Add New Employee
                    </button>
                </div>

                

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
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar name={employee.name} size="small" />
                                            {employee.name}
                                        </div>
                                    </td>
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

export default Organization;