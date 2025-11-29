import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../app.css';
import './createpage.css';

export default function Createpage() {
  const localUsername = localStorage.getItem('localUsername') || 'User';
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (groupName.trim() === '') {
      setError('Group name cannot be empty');
      return;
    }

    const response = await fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name: groupName }),
    });

    if (response.ok) {
      const newTeam = await response.json();
      
      try {
        navigator.clipboard.writeText(newTeam.teamPin);
        alert(`Group created! PIN copied: ${newTeam.teamPin}`);
      } catch (err) {
        alert(`Group created! PIN: ${newTeam.teamPin}`);
      }

      // Save locally only for display on the next page
      localStorage.setItem('localGroupName', newTeam.name);
      localStorage.setItem('localGroupPin', newTeam.teamPin);

      navigate('/calendar');
    } else {
      setError('Failed to create group. Please try again.');
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
                <h1 className="mt-1 text-lg font-semibold text-slate-900">Welcome {localUsername}!</h1>
                <h1 className="mt-1 text-lg font-semibold text-slate-900">Create New Group</h1>
                <p className="mt-2 text-sm text-slate-500">Start a new calendar sharing session for your team</p>
                <p className="mt-2 text-sm text-slate-500" style={{textAlign: 'center'}}>Or</p>
                <NavLink className='nav-link' to='/joinpage'><p className="mt-2 text-sm text-slate-500" style={{color: "#4f46e5", textAlign: 'center'}}>Join Existing Group</p></NavLink>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="groupname">Group Name</label>
                  <input
                    id="groupname"
                    name="groupname"
                    type="text"
                    maxLength={24}
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <button type="submit" className="btn btn-primary w-full">
                    Create Group
                  </button>
                </div>
              </form>

              <div className="mt-6 rounded-lg bg-green-50 border border-green-100 p-4">
                <p className="text-sm text-slate-800 leading-relaxed">
                  <span className="font-semibold text-green-700">How it works</span>
                  <span className="ml-1 text-slate-700">Once you create the group, you'll get a unique pin code that others can use to join. Share this code with your team!</span>
                </p>
              </div>
            </div>
          </div>
        </main>
        <div className="h-10" />
      </div>
    </div>
  );
}