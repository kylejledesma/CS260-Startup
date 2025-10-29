import React, { useState } from 'react'
import '../app.css';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {

    /* INITIALIZATION OF LOCAL STORAGE ITEMS */
    const dbAllUsers = localStorage.getItem('dbAllUsers') ? JSON.parse(localStorage.getItem('dbAllUsers')) : []
    const localUsername = localStorage.getItem('localUsername') || 'User'
    const localPassword = localStorage.getItem('localPassword') || ''

    /* SET STATES FOR FILE */
    const [usernameText, setUsernameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    function loginUser() {

        // 1. Create new user object from text fields
        const newUser = {
            username: usernameText,
            password: passwordText, // Hash this in real app
            userGroupPins: null,
            userGroupNames: null
        }

        // 2. Create updated users array
        const updatedUsers = [...dbAllUsers, newUser]

        // 3. Save the new array back to the 'users' key
        localStorage.setItem('dbAllUsers', JSON.stringify(updatedUsers))

        // 4. Set the current username and password in localStorage
        localStorage.setItem('localUsername', usernameText);
        localStorage.setItem('localPassword', passwordText);

        // 5. Then navigate to createpage
        navigate('/createpage');
    }

    function textChangeUsername(e) {
        setUsernameText(e.target.value);
    }

    function textChangePassword(e) {
        setPasswordText(e.target.value);
    }

    // This function will be called by the form's 'onSubmit'
    function handleSubmit(e) {
        e.preventDefault(); // Stop the form from reloading the page
        loginUser();
    }

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
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700" htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        name="username"
                                        inputMode="text"
                                        type = 'text'
                                        maxLength={12}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                                        aria-describedby="username-help"
                                        onChange={textChangeUsername}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        inputMode="password"
                                        maxLength={24}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                                        aria-describedby="password-help"
                                        onChange={textChangePassword}
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm mt-2">{error}</div>
                                )}

                                {/* Primary button */}
                                <div>
                                    <button type="submit" className="btn btn-primary">Log In</button>
                                </div>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-slate-500">Or continue with</span>
                                </div>
                            </div>

                            <NavLink 
                                to="/createpage"
                                onClick={loginUser}
                                className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {/* SVG for Google Icon */}
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 48 48">
                                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.35 6.52C12.91 13.46 18.06 9.5 24 9.5z"></path>
                                    <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.57 3.39-2.21 6.22-4.78 8.12l7.74 6.02C43.51 39.54 46.98 32.74 46.98 24.55z"></path>
                                    <path fill="#FBBC05" d="M10.91 28.74c-.21-.65-.33-1.33-.33-2.04s.12-1.39.33-2.04l-8.35-6.52C.73 19.25 0 21.55 0 24s.73 4.75 2.56 6.78l8.35-6.04z"></path>
                                    <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.74-6.02c-2.11 1.42-4.78 2.27-7.65 2.27-5.94 0-11.09-3.96-12.91-9.28L2.56 34.78C6.51 42.62 14.62 48 24 48z"></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                                Sign in with Google
                            </NavLink>

                        </div> {/* end card */}

                    </div>
                </main>

                <div className="h-10" />
            </div>
        </div>
    )
}