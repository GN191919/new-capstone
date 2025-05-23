import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import performanceService from '../services/performanceService';
import './EmployeeOverview.css';

const EmployeeOverview = () => {
    const { t } = useTranslation(['overview']);

    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchEmployeeData();
    }, [employeeId]);

    const fetchEmployeeData = async () => {
        try {
            const data = await performanceService.getEmployeeDetails(employeeId);
            setEmployee(data);
        } catch (err) {
            setError(t('error_fetch_employee'));
        } finally {
            setLoading(false);
        }
    };

    const handleReportSelect = (report) => {
        setSelectedReport(report);
        setFeedback(report.feedback || '');
    };

    const handleFeedbackSubmit = async () => {
        try {
            await performanceService.submitFeedback(employeeId, selectedReport.id, feedback);
            setSuccess(t('feedback_submitted'));
            await fetchEmployeeData(); // Refresh data
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || t('error_submit_feedback'));
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;
    if (!employee) return <Layout><div>Employee not found</div></Layout>;

    return (
        <Layout>
            <div className="employee-overview-container">
                <h1 className="page-title">{t('employee_overview')}</h1>
                <div className="employee-header">
                    <h2>{employee.name}</h2>
                    <div className="employee-info">
                        <p><strong>{t('position')}:</strong> {employee.title}</p>
                        <p><strong>{t('department')}:</strong> {employee.department}</p>
                        <p><strong>{t('email')}:</strong> {employee.email}</p>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="overview-grid">
                    <div className="reports-section">
                        <h3>{t('reports_section')}</h3>
                        <div className="reports-list">
                            {employee.reports.map(report => (
                                <div
                                    key={report.id}
                                    className={`report-card ${selectedReport?.id === report.id ? 'selected' : ''}`}
                                    onClick={() => handleReportSelect(report)}
                                >
                                    <h4>{report.title}</h4>
                                    <p>Submitted: {new Date(report.submissionDate).toLocaleDateString()}</p>
                                    <span className={`status-badge ${report.status.toLowerCase()}`}>
                                        {report.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="goals-section">
                        <h3>{t('goals_section')}</h3>
                        <div className="goals-list">
                            <div className="goals-category">
                                <h4>{t('kpi_goals')} ({employee.goals.kpi.length}/3)</h4>
                                {employee.goals.kpi.map(goal => (
                                    <div key={goal.id} className="goal-card">
                                        <h5>{goal.name}</h5>
                                        <p>Progress: {goal.progress}%</p>
                                        <p>Weight: {goal.weight}%</p>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${goal.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="goals-category">
                                <h4>{t('competency_goals')} ({employee.goals.competency.length}/2)</h4>
                                {employee.goals.competency.map(goal => (
                                    <div key={goal.id} className="goal-card">
                                        <h5>{goal.name}</h5>
                                        <p>Progress: {goal.progress}%</p>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${goal.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {selectedReport && (
                    <div className="report-detail-section">
                        <h3>{t('report_details')}</h3>
                        <div className="report-content">
                            {selectedReport.questions.map((question, index) => (
                                <div key={index} className="question-answer">
                                    <h4>{question.text}</h4>
                                    <p>{question.answer}</p>
                                </div>
                            ))}
                        </div>

                        <div className="feedback-section">
                            <h4>{t('feedback')}</h4>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder={t('enter_feedback')}
                                rows={4}
                            />
                            <button
                                className="submit-feedback-button"
                                onClick={handleFeedbackSubmit}
                                disabled={!feedback.trim()}
                            >
                                {t('submit_feedback')}
                            </button>
                        </div>
                    </div>
                )}

                <div className="ai-analysis-section">
                    <h3>{t('ai_analysis')}</h3>
                    <div className="analysis-content">
                        {employee.aiAnalysis ? (
                            <p>{employee.aiAnalysis}</p>
                        ) : (
                            <p>No AI analysis available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EmployeeOverview;