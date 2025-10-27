import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../app.css';
import './createpage.css';

export default function Createpage() {
  const username = localStorage.getItem('username') || 'User'
  const groupNames = localStorage.getItem('groupNames') ? JSON.parse(localStorage.getItem('groupNames')) : []
  const [error, setError] = useState(''); // State for error messages
  const [groupName, setGroupName] = useState('')
  const groupPins = localStorage.getItem('groupPins') ? JSON.parse(localStorage.getItem('groupPins')) : []
  const [groupPin, setGroupPin] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // 1. Check group name is non-empty
    if (groupName.trim() === '') {
      setError('Group name cannot be empty');
      return; // Stop execution
    }

    e.preventDefault()
    // for demo: generate a random 6-digit pin and navigate to calendar
    const pin = String(Math.floor(100000 + Math.random() * 900000))

    // 2. Validate the pin
    // In a real app, you'd check the pin against the server here
    // First, get the group names safely, defaulting to an empty array
    const allGroupNames = localStorage.getItem('groupNames') ? JSON.parse(localStorage.getItem('groupNames')) : [];
    console.log(allGroupNames);
    // Check if the group name already exists
    if (allGroupNames.includes(groupName) === true) {
      setError('A group already exists. Please choose a different name.');
      return; // Stop execution
    }

    try {
      navigator.clipboard.writeText(pin)
      // In a real app you'd POST groupName to a backend and receive the pin
      alert(`Group created! Pin copied to clipboard: ${pin}`)
    } catch (err) {
      // fallback: show the pin
      alert(`Group created! Pin: ${pin}`)
    }
    setGroupPin(pin)
    localStorage.setItem('groupPins', JSON.stringify([...groupPins, pin])) 
    localStorage.setItem('groupNames', JSON.stringify([...groupNames, groupName]))

    // --- NEW LOGIC TO UPDATE THE USER ---

    // 1. Get existing users array from localStorage
    const allUsers = localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : []

    // 2. Use .find() to search the array
    const foundUser = allUsers.find(user => {
        return user.username === username && user.password === localStorage.getItem('password');
    });

    // 4. Check if a user was found
    if (foundUser) {
        // Success!
        console.log("Login successful! Welcome,", foundUser.username);
        // A. Define the pin you want to add.
        // !!! You need to get this from your state or an input !!!
        const pinToAppend = pin;

        // B. Create the updated user object
        // This safely adds the pin to a 'groupPins' array, creating it if it doesn't exist
        const updatedUser = {
            ...foundUser,
            groupPins: [...(foundUser.groupPins || []), pinToAppend]
        };

        // C. Find the index of the user in the original array
        const userIndex = allUsers.findIndex(user => user.username === username);

        console.log("User index:", userIndex);
        // D. Create a new users array with the updated user
        const updatedUsersArray = [
            ...allUsers.slice(0, userIndex), // All users before
            updatedUser,                     // The updated user
            ...allUsers.slice(userIndex + 1)  // All users after
        ];
        
        // E. Save the *entire updated array* back to localStorage
        localStorage.setItem('allUsers', JSON.stringify(updatedUsersArray));
      }

    // --- END OF NEW LOGIC ---
    navigate('/calendar')
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
                  {/* Improved back arrow for consistent alignment */}
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="15" y1="10" x2="5" y2="10" />
                    <polyline points="12 15 5 10 12 5" />
                  </svg>
                  <span className="sr-only">Back</span>
                </NavLink>
                <h1 className="mt-1 text-lg font-semibold text-slate-900">Welcome {username}!</h1>
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
                    inputMode="text"
                    maxLength={24}
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                    aria-describedby="groupname-help"
                  />
                </div>

                {/* Error catching */}
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <button type="submit" className="btn btn-primary">
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
  )
}