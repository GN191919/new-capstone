import React, { useState, useEffect } from 'react';
import performanceService from '../../services/performanceService';
import './TeamManagement.css';

const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [newMember, setNewMember] = useState({
        email: '',
        name: '',
        position: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const members = await performanceService.getTeamMembers();
            setTeamMembers(members);
        } catch (err) {
            setError('Failed to fetch team members');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!newMember.email || !newMember.name || !newMember.position) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await performanceService.addTeamMember(newMember);
            setSuccess('Team member added successfully');
            setNewMember({ email: '', name: '', position: '' });
            await fetchTeamMembers();
        } catch (err) {
            setError(err.message || 'Failed to add team member');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (employeeId) => {
        if (!window.confirm('Are you sure you want to remove this team member?')) {
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await performanceService.removeTeamMember(employeeId);
            setSuccess('Team member removed successfully');
            await fetchTeamMembers();
        } catch (err) {
            setError(err.message || 'Failed to remove team member');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="team-management-container">
            <h2>Team Management</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleAddMember} className="add-member-form">
                <h3>Add New Team Member</h3>
                <div className="form-group">
                    <label htmlFor="email" title="Enter team member's email address">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={newMember.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name" title="Enter team member's full name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newMember.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="position" title="Enter team member's position or role">
                        Position
                    </label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={newMember.position}
                        onChange={handleInputChange}
                        placeholder="Enter position"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                    title="Add new team member"
                >
                    {loading ? 'Adding...' : 'Add Member'}
                </button>
            </form>

            <div className="team-members-list">
                <h3>Current Team Members</h3>
                {teamMembers.length === 0 ? (
                    <p className="no-members">No team members found</p>
                ) : (
                    <div className="members-grid">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="member-card">
                                <div className="member-info">
                                    <h4>{member.name}</h4>
                                    <p className="member-position">{member.position}</p>
                                    <p className="member-email">{member.email}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveMember(member.id)}
                                    className="remove-button"
                                    title="Remove team member"
                                    disabled={loading}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamManagement;