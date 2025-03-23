import React, { useState } from 'react';
import performanceService from '../../services/performanceService';

const ReportForm = () => {
    const [reportData, setReportData] = useState({
        achievements: '',
        challenges: '',
        nextSteps: '',
        attachments: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReportData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setReportData(prev => ({
            ...prev,
            attachments: files
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await performanceService.submitReport(reportData);
            setSuccess(true);
            setReportData({
                achievements: '',
                challenges: '',
                nextSteps: '',
                attachments: []
            });
        } catch (err) {
            setError(err.message || 'Failed to submit report');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-form-container">
            <h2>Performance Report Submission</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Report submitted successfully!</div>}
            
            <form onSubmit={handleSubmit} className="report-form">
                <div className="form-group">
                    <label htmlFor="achievements" title="List your key achievements for this period">
                        Achievements
                    </label>
                    <textarea
                        id="achievements"
                        name="achievements"
                        value={reportData.achievements}
                        onChange={handleInputChange}
                        placeholder="Describe your key achievements..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="challenges" title="Describe any challenges or obstacles faced">
                        Challenges
                    </label>
                    <textarea
                        id="challenges"
                        name="challenges"
                        value={reportData.challenges}
                        onChange={handleInputChange}
                        placeholder="Describe any challenges faced..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nextSteps" title="Outline your planned next steps">
                        Next Steps
                    </label>
                    <textarea
                        id="nextSteps"
                        name="nextSteps"
                        value={reportData.nextSteps}
                        onChange={handleInputChange}
                        placeholder="Describe your planned next steps..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="attachments" title="Upload supporting documents (optional)">
                        Attachments
                    </label>
                    <input
                        type="file"
                        id="attachments"
                        name="attachments"
                        onChange={handleFileChange}
                        multiple
                        className="file-input"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    title="Submit your performance report"
                    className="submit-button"
                >
                    {loading ? 'Submitting...' : 'Submit Report'}
                </button>
            </form>
        </div>
    );
};

export default ReportForm;