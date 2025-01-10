// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Auth from './pages/Auth';

const App = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Auth />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/project" element={<Project />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
