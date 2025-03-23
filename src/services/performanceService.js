import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const performanceService = {
    // Report Management
    submitReport: async (reportData) => {
        try {
            const response = await axios.post(`${API_URL}/reports`, reportData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error submitting report' };
        }
    },

    getReportTemplates: async () => {
        try {
            const response = await axios.get(`${API_URL}/reports/templates`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching report templates' };
        }
    },

    // Goal Management
    setGoals: async (goalData) => {
        try {
            const response = await axios.post(`${API_URL}/goals`, goalData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error setting goals' };
        }
    },

    updateGoalProgress: async (goalId, progressData) => {
        try {
            const response = await axios.put(`${API_URL}/goals/${goalId}/progress`, progressData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error updating goal progress' };
        }
    },

    getCompetencyGoals: async () => {
        try {
            const response = await axios.get(`${API_URL}/goals/competencies`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching competency goals' };
        }
    },

    // Feedback Management
    submitManagerFeedback: async (employeeId, feedbackData) => {
        try {
            const response = await axios.post(`${API_URL}/feedback/manager/${employeeId}`, feedbackData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error submitting manager feedback' };
        }
    },

    submitEmployeeFeedback: async (managerId, feedbackData) => {
        try {
            const response = await axios.post(`${API_URL}/feedback/employee/${managerId}`, feedbackData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error submitting employee feedback' };
        }
    },

    getFeedbackHistory: async () => {
        try {
            const response = await axios.get(`${API_URL}/feedback/history`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching feedback history' };
        }
    },

    // Team Management
    getTeamMembers: async () => {
        try {
            const response = await axios.get(`${API_URL}/team/members`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error fetching team members' };
        }
    },

    addTeamMember: async (employeeData) => {
        try {
            const response = await axios.post(`${API_URL}/team/members`, employeeData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error adding team member' };
        }
    },

    removeTeamMember: async (employeeId) => {
        try {
            const response = await axios.delete(`${API_URL}/team/members/${employeeId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error removing team member' };
        }
    }
};

export default performanceService;