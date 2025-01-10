// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Ensure the backend runs here

const Dashboard = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        socket.on('taskUpdated', (newTask) => {
            setTasks((prev) => [...prev, newTask]);
        });
        return () => socket.off('taskUpdated');
    }, []);

    const handleAddTask = () => {
        socket.emit('updateTask', task);
        setTask('');
    };

    return (
        <div className="p-8 bg-secondary text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">TeamPulse Tasks</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a task"
                className="p-3 w-1/2 bg-primary border border-gray-600 rounded"
            />
            <button 
                onClick={handleAddTask} 
                className="bg-accent p-3 ml-4 rounded">
                Add Task
            </button>
            <ul className="mt-6 space-y-3">
                {tasks.map((t, index) => (
                    <li key={index} className="p-3 bg-primary rounded">{t}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
