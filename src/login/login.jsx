import React, { useState } from 'react'
import '../app.css';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        // For now, we'll mock a successful login
        // In the future, this would make a backend call
        const userData = {
            username,
            isAuthenticated: true,
            loginTime: new Date().toISOString()
        };

        login(userData);
        navigate('/calendar');
    };

    return (
        <div className="container">
            {/* Page container */}
            <div className="card">

                {/* Top logo centered */}
                <header className="header">
                    <div className="logo">
                        {/* Outline calendar icon (SVG) - transparent background; CSS sets stroke */}
                        <svg className="calendar-icon-outline" viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="16" rx="2" strokeLinejoin="round"></rect>
                            <path d="M16 3v4M8 3v4" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>Whenworks</span>
                    </div>
                </header>

                {/* Centered card */}
                <main className="flex justify-center">
                    <div className="w-full max-w-md">

                        <div className="bg-white rounded-2xl shadow-[0_20px_30px_rgba(2,6,23,0.08)] p-6 sm:p-8">

                            {/* Back + Title */}
                            <div className="mb-4">
                                <NavLink to="/" className="inline-flex items-center text-slate-600 hover:text-slate-800">
                                    {/* Improved back arrow: horizontal line centered with symmetric arrow head */}
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="15" y1="10" x2="5" y2="10" />
                                        <polyline points="12 15 5 10 12 5" />
                                    </svg>
                                    <span className="sr-only">Back</span>
                                </NavLink>
                                <h1 className="mt-1 text-lg font-semibold text-slate-900">Login</h1>
                            </div>

                            {/* Single form for username + password */}
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700" htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        maxLength={12}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                                        aria-describedby="username-help"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        maxLength={24}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                                        aria-describedby="password-help"
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm mt-2">{error}</div>
                                )}

                                {/* Primary button */}
                                <div>
                                    <button type="submit" className="btn btn-primary w-full">
                                        Log In
                                    </button>
                                </div>
                            </form>

                        </div> {/* end card */}

                    </div>
                </main>

                <div className="h-10" />
            </div>
        </div>
    )
}