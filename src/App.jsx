import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Goals from './pages/Goals';
import Organization from './pages/Organization';
import EmployeeAddition from './pages/EmployeeAddition';
import EmployeeOverview from './pages/EmployeeOverview';
import ReportSubmission from './pages/ReportSubmission';
import MyTeam from './pages/MyTeam';

function App() {
    const { user } = useAuth();

    const ProtectedRoute = ({ children, allowedRoles }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }

        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/dashboard" />;
        }

        return children;
    };

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:reportID" element={<ReportSubmission />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/my-team" element={
  
                    <MyTeam />
               
            } />
            <Route path="/organization" element={
                
                    <Organization />
               
            } />
            <Route path="/organization/add" element={
               
                    <EmployeeAddition />
                
            } />
            <Route path="/organization/:id" element={
               
                    <EmployeeOverview />
                
            } />
        </Routes>
    );
}

export default App;