import React, { useState } from 'react';
import '../app.css';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const [usernameText, setUsernameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Create
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submitAuth(e) {
    e.preventDefault();
    setError('');

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/create';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ username: usernameText, password: passwordText }),
    });

    if (response.ok) {
      localStorage.setItem('localUsername', usernameText);
      navigate('/createpage');
    } else {
      const body = await response.json();
      setError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <header className="header">
          <div className="logo">
            <svg className="calendar-icon-outline" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" strokeLinejoin="round"></rect>
              <path d="M16 3v4M8 3v4" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>Whenworks</span>
          </div>
        </header>

        <main className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-[0_20px_30px_rgba(2,6,23,0.08)] p-6 sm:p-8">
              <div className="mb-4">
                <NavLink to="/" className="inline-flex items-center text-slate-600 hover:text-slate-800">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="15" y1="10" x2="5" y2="10" />
                    <polyline points="12 15 5 10 12 5" />
                  </svg>
                  <span className="sr-only">Back</span>
                </NavLink>
                <h1 className="mt-1 text-lg font-semibold text-slate-900">
                  {isLoginMode ? 'Login' : 'Create Account'}
                </h1>
              </div>

              <form className="space-y-4" onSubmit={submitAuth}>
                <div>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={usernameText}
                    onChange={(e) => setUsernameText(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={passwordText}
                    onChange={(e) => setPasswordText(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                  />
                </div>

                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                <div>
                  <button type="submit" className="btn btn-primary w-full">
                    {isLoginMode ? 'Log In' : 'Create Account'}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <button 
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                >
                  {isLoginMode ? "Need an account? Create one" : "Already have an account? Login"}
                </button>
              </div>

            </div>
          </div>
        </main>
        <div className="h-10" />
      </div>
    </div>
  );
}