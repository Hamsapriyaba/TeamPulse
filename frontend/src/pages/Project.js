// src/pages/Project.js
import React, { useState } from 'react';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');

    const handleAddProject = () => {
        setProjects([...projects, projectName]);
        setProjectName('');
    };

    return (
        <div className="p-8 bg-secondary text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
            <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="New Project Name"
                className="p-3 w-1/2 bg-primary border border-gray-600 rounded"
            />
            <button 
                onClick={handleAddProject} 
                className="bg-accent p-3 ml-4 rounded">
                Add Project
            </button>
            <ul className="mt-6 space-y-3">
                {projects.map((p, index) => (
                    <li key={index} className="p-3 bg-primary rounded">{p}</li>
                ))}
            </ul>
        </div>
    );
};

export default Project;
