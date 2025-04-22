import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Goals from './pages/Goals';
import TeamManagement from './pages/TeamManagement';
import EmployeeAddition from './pages/EmployeeAddition';
import EmployeeOverview from './pages/EmployeeOverview';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/team/add" element={<EmployeeAddition />} />
            <Route path="/team/:employeeId" element={<EmployeeOverview />} />
        </Routes>
    );
}

export default App;