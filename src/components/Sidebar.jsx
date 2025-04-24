import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Optional: Create this if you're using custom CSS

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>MyDashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li onClick={() => handleNav('/dashboard')}>Dashboard</li>
          <li>Reports</li>
          <li>Goals</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
