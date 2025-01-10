// src/pages/Auth.js
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../services/firebase';

const Auth = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary text-white">
            {user ? (
                <h2>Welcome, {user.displayName}</h2>
            ) : (
                <button 
                    onClick={handleGoogleLogin} 
                    className="bg-accent p-4 rounded-lg text-lg">
                    Login with Google
                </button>
            )}
        </div>
    );
};

export default Auth;
