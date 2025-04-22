import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import './Reports.css';

const Reports = () => {
    const [questions, setQuestions] = useState([
        { id: 1, type: 'text', question: 'What were your main achievements this week?' },
        { id: 2, type: 'rating', question: 'How would you rate your productivity?' },
        { id: 3, type: 'multiChoice', question: 'Which areas need improvement?', 
          options: ['Time Management', 'Communication', 'Technical Skills', 'Leadership'] }
    ]);

    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would typically send the answers to the backend
        console.log('Submitted answers:', answers);
        setSubmitted(true);
    };

    const renderQuestion = (question) => {
        switch (question.type) {
            case 'text':
                return (
                    <textarea
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="Enter your answer"
                        className="text-input"
                    />
                );
            case 'rating':
                return (
                    <div className="rating-input">
                        {[1, 2, 3, 4, 5].map(rating => (
                            <button
                                key={rating}
                                type="button"
                                className={`rating-button ${answers[question.id] === rating ? 'selected' : ''}`}
                                onClick={() => handleAnswerChange(question.id, rating)}
                            >
                                {rating}
                            </button>
                        ))}
                    </div>
                );
            case 'multiChoice':
                return (
                    <div className="multi-choice-input">
                        {question.options.map(option => (
                            <label key={option} className="choice-label">
                                <input
                                    type="checkbox"
                                    checked={answers[question.id]?.includes(option) || false}
                                    onChange={(e) => {
                                        const currentAnswers = answers[question.id] || [];
                                        if (e.target.checked) {
                                            handleAnswerChange(question.id, [...currentAnswers, option]);
                                        } else {
                                            handleAnswerChange(question.id, 
                                                currentAnswers.filter(item => item !== option)
                                            );
                                        }
                                    }}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    if (submitted) {
        return (
            <Layout>
                <div className="reports-container">
                    <h2>Report Submitted Successfully!</h2>
                    <p>Thank you for submitting your report.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="reports-container">
                <h2>Performance Report</h2>
                <form onSubmit={handleSubmit} className="report-form">
                    {questions.map(question => (
                        <div key={question.id} className="question-container">
                            <h3>{question.question}</h3>
                            {renderQuestion(question)}
                        </div>
                    ))}
                    <button type="submit" className="submit-button">
                        Submit Report
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Reports;