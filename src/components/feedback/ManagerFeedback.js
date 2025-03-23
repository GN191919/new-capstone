import React, { useState } from 'react';
import performanceService from '../../services/performanceService';
import './ManagerFeedback.css';

const ManagerFeedback = () => {
    const [feedbackData, setFeedbackData] = useState({
        leadership: 0,
        communication: 0,
        support: 0,
        development: 0,
        comments: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const ratingDescriptions = {
        leadership: {
            1: 'Rarely demonstrates leadership qualities',
            2: 'Sometimes shows leadership abilities',
            3: 'Consistently demonstrates good leadership',
            4: 'Exceptional leadership skills'
        },
        communication: {
            1: 'Poor communication skills',
            2: 'Basic communication abilities',
            3: 'Good communication skills',
            4: 'Excellent communicator'
        },
        support: {
            1: 'Minimal support provided',
            2: 'Provides basic support when asked',
            3: 'Proactively provides good support',
            4: 'Exceptional support and guidance'
        },
        development: {
            1: 'Limited focus on team development',
            2: 'Some effort in team development',
            3: 'Active interest in team growth',
            4: 'Outstanding commitment to development'
        }
    };

    const handleRatingChange = (category, rating) => {
        setFeedbackData(prev => ({
            ...prev,
            [category]: rating
        }));
    };

    const handleCommentsChange = (e) => {
        setFeedbackData(prev => ({
            ...prev,
            comments: e.target.value
        }));
    };

    const validateFeedback = () => {
        const requiredCategories = ['leadership', 'communication', 'support', 'development'];
        const missingRatings = requiredCategories.filter(category => feedbackData[category] === 0);

        if (missingRatings.length > 0) {
            setError(`Please provide ratings for: ${missingRatings.join(', ')}`);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFeedback()) return;

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await performanceService.submitEmployeeFeedback('manager-id', feedbackData);
            setSuccess(true);
            setFeedbackData({
                leadership: 0,
                communication: 0,
                support: 0,
                development: 0,
                comments: ''
            });
        } catch (err) {
            setError(err.message || 'Failed to submit feedback');
        } finally {
            setLoading(false);
        }
    };

    const renderRatingButtons = (category) => {
        return [
            { value: 1, label: 'Poor' },
            { value: 2, label: 'Fair' },
            { value: 3, label: 'Good' },
            { value: 4, label: 'Excellent' }
        ].map(rating => (
            <button
                key={rating.value}
                type="button"
                className={`rating-button ${feedbackData[category] === rating.value ? 'selected' : ''}`}
                onClick={() => handleRatingChange(category, rating.value)}
                title={ratingDescriptions[category][rating.value]}
            >
                {rating.label}
            </button>
        ));
    };

    return (
        <div className="feedback-container">
            <h2>Manager Feedback</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Feedback submitted successfully!</div>}

            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="rating-section">
                    <div className="rating-group">
                        <label title="Rate your manager's leadership abilities">
                            Leadership Skills
                        </label>
                        <div className="rating-buttons">
                            {renderRatingButtons('leadership')}
                        </div>
                        {feedbackData.leadership > 0 && (
                            <div className="rating-description">
                                {ratingDescriptions.leadership[feedbackData.leadership]}
                            </div>
                        )}
                    </div>

                    <div className="rating-group">
                        <label title="Rate your manager's communication effectiveness">
                            Communication
                        </label>
                        <div className="rating-buttons">
                            {renderRatingButtons('communication')}
                        </div>
                        {feedbackData.communication > 0 && (
                            <div className="rating-description">
                                {ratingDescriptions.communication[feedbackData.communication]}
                            </div>
                        )}
                    </div>

                    <div className="rating-group">
                        <label title="Rate the level of support provided by your manager">
                            Support & Guidance
                        </label>
                        <div className="rating-buttons">
                            {renderRatingButtons('support')}
                        </div>
                        {feedbackData.support > 0 && (
                            <div className="rating-description">
                                {ratingDescriptions.support[feedbackData.support]}
                            </div>
                        )}
                    </div>

                    <div className="rating-group">
                        <label title="Rate your manager's commitment to team development">
                            Team Development
                        </label>
                        <div className="rating-buttons">
                            {renderRatingButtons('development')}
                        </div>
                        {feedbackData.development > 0 && (
                            <div className="rating-description">
                                {ratingDescriptions.development[feedbackData.development]}
                            </div>
                        )}
                    </div>
                </div>

                <div className="comments-section">
                    <label htmlFor="comments" title="Provide additional comments or suggestions">
                        Additional Comments
                    </label>
                    <textarea
                        id="comments"
                        value={feedbackData.comments}
                        onChange={handleCommentsChange}
                        placeholder="Share your thoughts and suggestions..."
                        className="comments-input"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                    title="Submit your feedback"
                >
                    {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
        </div>
    );
};

export default ManagerFeedback;