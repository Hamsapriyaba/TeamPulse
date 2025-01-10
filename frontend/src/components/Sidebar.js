// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 min-h-screen bg-primary text-white p-5">
            <h2 className="text-2xl font-bold mb-6">TeamPulse</h2>
            <ul className="space-y-4">
                <li><Link to="/" className="hover:text-accent">Home</Link></li>
                <li><Link to="/dashboard" className="hover:text-accent">Dashboard</Link></li>
                <li><Link to="/project" className="hover:text-accent">Projects</Link></li>
                <li><Link to="/settings" className="hover:text-accent">Settings</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
