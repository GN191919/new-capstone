import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import performanceService from '../services/performanceService';
import { addMockEmployee } from '../mockEmployeeData';
import './EmployeeAddition.css';
import { useTranslation } from 'react-i18next';

const EmployeeAddition = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('employee');
    const [supervisors, setSupervisors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        firstNameCyrillic: '',
        lastNameCyrillic: '',
        email: '',
        department: '',
        title: '',
        supervisorId: '',
        trainingRecords: []
    });

    useEffect(() => {
        fetchSupervisors();
    }, []);

    const fetchSupervisors = async () => {
        try {
            const supervisorList = await performanceService.getSupervisors();
            setSupervisors(supervisorList);
        } catch (err) {
            setError('Failed to fetch supervisors');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTrainingRecordAdd = () => {
        setEmployeeData(prev => ({
            ...prev,
            trainingRecords: [...prev.trainingRecords, { name: '', date: '', description: '' }]
        }));
    };

    const handleTrainingRecordChange = (index, field, value) => {
        setEmployeeData(prev => {
            const newTrainingRecords = [...prev.trainingRecords];
            newTrainingRecords[index] = {
                ...newTrainingRecords[index],
                [field]: value
            };
            return {
                ...prev,
                trainingRecords: newTrainingRecords
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await performanceService.addEmployee(employeeData);
            addMockEmployee(employeeData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/organization');
            }, 2000);
        } catch (err) {
            setError(err.message || t('error_save'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="employee-addition-container">
                <h2>Add New Employee</h2>
                {success && <div className="success-message">Employee added successfully! Redirecting...</div>}

                <form onSubmit={handleSubmit} className="employee-form">
                    <div className="form-section">
                        <h3>Personal Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">{t('first_name')}</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={employeeData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">{t('last_name')}</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={employeeData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstNameCyrillic">{t('first_name_cyrillic')}</label>
                                <input
                                    type="text"
                                    id="firstNameCyrillic"
                                    name="firstNameCyrillic"
                                    value={employeeData.firstNameCyrillic}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastNameCyrillic">{t('last_name_cyrillic')}</label>
                                <input
                                    type="text"
                                    id="lastNameCyrillic"
                                    name="lastNameCyrillic"
                                    value={employeeData.lastNameCyrillic}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">{t('email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={employeeData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Position Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="department">{t('department')}</label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={employeeData.department}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">{t('title')}</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={employeeData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="supervisorId">{t('supervisor')}</label>
                            <select
                                id="supervisorId"
                                name="supervisorId"
                                value={employeeData.supervisorId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a supervisor</option>
                                
                                    <option key={1} value={1}>
                                        Yerlan Amanbekov
                                    </option>
                                
                            </select>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Training Records</h3>
                        {employeeData.trainingRecords.map((record, index) => (
                            <div key={index} className="training-record">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Training Name</label>
                                        <input
                                            type="text"
                                            value={record.name}
                                            onChange={(e) => handleTrainingRecordChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('training_date')}</label>
                                        <input
                                            type="date"
                                            value={record.date}
                                            onChange={(e) => handleTrainingRecordChange(index, 'date', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>{t('training_description')}</label>
                                    <textarea
                                        value={record.description}
                                        onChange={(e) => handleTrainingRecordChange(index, 'description', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="add-training-button"
                            onClick={handleTrainingRecordAdd}
                        >
                            Add Training Record
                        </button>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate('/team')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? t('adding') : 'Add employee'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EmployeeAddition;