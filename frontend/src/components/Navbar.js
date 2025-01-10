// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
                <img src="/logo1.png" alt="TeamPulse Logo" className="h-16 w-17 mr-2" />
                <h1 className="text-2xl font-bold tracking-wider">TeamPulse</h1>
            </div>
            <ul className="flex gap-6">
                <li className="hover:text-accent cursor-pointer">Home</li>
                <li className="hover:text-accent cursor-pointer">Dashboard</li>
                <li className="hover:text-accent cursor-pointer">Contact</li>
            </ul>
        </nav>
    );
};

export default Navbar;
