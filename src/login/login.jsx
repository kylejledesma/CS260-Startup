import React from 'react'
import '../app.css';
import { NavLink } from 'react-router-dom';

export default function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-sky-50 flex items-center justify-center">
            {/* Page container */}
            <div className="w-full max-w-3xl px-6">

                {/* Top logo centered */}
                <header className="flex justify-center mt-6 mb-10">
                    <div className="flex items-center gap-3">
                        {/* Simple calendar icon (SVG) */}
                        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="16" rx="2" strokeLinejoin="round"></rect>
                            <path d="M16 3v4M8 3v4" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span className="text-2xl font-semibold text-slate-800">Whenworks</span>
                    </div>
                </header>

                {/* Centered card */}
                <main className="flex justify-center">
                    <div className="w-full max-w-md">

                        <div className="bg-white rounded-2xl shadow-[0_20px_30px_rgba(2,6,23,0.08)] p-6 sm:p-8">

                            {/* Back + Title */}
                            <div className="mb-4">
                                <NavLink to="/" className="inline-flex items-center text-slate-600 hover:text-slate-800">
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <path d="M15 9H6.5M8.75 4.75L3.75 9.75 8.75 14.75" strokeLinecap="round" strokeLinejoin="round"></path>
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
                                    <NavLink to="/about" className="w-full block text-center rounded-lg bg-blue-600 text-white py-2.5 font-medium shadow-sm hover:bg-blue-700 transition-colors">
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