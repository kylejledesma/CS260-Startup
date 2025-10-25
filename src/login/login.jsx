import React from 'react'
import '../app.css';
import './login.css';
import { NavLink } from 'react-router-dom';

export default function Login() {
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
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700" htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        name="username"
                                        inputMode="text"
                                        pattern="\d{6}"
                                        maxLength={12}
                                        placeholder="Enter your username"
                                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                                        aria-describedby="username-help"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        inputMode="text"
                                        pattern="\d{6}"
                                        maxLength={24}
                                        placeholder="Enter your password"
                                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                                        aria-describedby="password-help"
                                    />
                                </div>

                                {/* Primary button */}
                                <div>
                                    <NavLink to="/about" className="btn btn-primary">
                                        Log In
                                    </NavLink>
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