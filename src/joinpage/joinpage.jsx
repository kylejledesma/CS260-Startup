import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../app.css';
import './joinpage.css';

export default function Joinpage() {

  /* INITIALIZATION OF LOCAL STORAGE ITEMS */
  const localUsername = localStorage.getItem('localUsername') || 'User'
  const localPassword = localStorage.getItem('localPassword') || ''
  const dbGroupPins = localStorage.getItem('dbGroupPins') ? JSON.parse(localStorage.getItem('dbGroupPins')) : []

  /* SET STATES FOR FILE */
  const [groupPin, setGroupPin] = useState('')
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  function updateUserPins(pin) {
  // Get existing users array from localStorage and search for matching user
  const dbAllUsers = localStorage.getItem('dbAllUsers') ? JSON.parse(localStorage.getItem('dbAllUsers')) : []
  const foundUser = dbAllUsers.find(user => {
      return user.localUsername === localUsername && user.localPassword === localPassword;
  });

  // Check if a user was found
  if (foundUser) {
      // Success!
      console.log("Login successful! Welcome,", foundUser.localUsername);
      const pinToAppend = pin;

      const updatedUser = {
          ...foundUser,
          dbGroupPins: [...(foundUser.dbGroupPins || []), groupPin]
      };

      // C. Find the index of the user in the original array
      const userIndex = dbAllUsers.findIndex(user => user.localUsername === localUsername);

      // D. Create a new users array with the updated user
      const updatedUsersArray = [
          ...dbAllUsers.slice(0, userIndex), // All users before
          updatedUser,                     // The updated user
          ...dbAllUsers.slice(userIndex + 1)  // All users after
      ];

      // E. Save the *entire updated array* back to localStorage
      localStorage.setItem('dbAllUsers', JSON.stringify(updatedUsersArray));

      // --- END OF NEW LOGIC ---
      
      // Set the *currently logged-in user* in localStorage
      localStorage.setItem('localUsername', foundUser.localUsername); 
    } else {
        // Failure!
        setError('Invalid username or password.'); // Show error message to user
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // 1. Check pin format
    if (!/^[0-9]{6}$/.test(groupPin)) {
      setError('Please enter a valid 6-digit pin code.');
      return; // Stop execution
    }

    // 2. Validate the pin
    // In a real app, you'd check the pin against the server here
    if (dbGroupPins.includes(groupPin)) {
      // Success!
      // alert(`Joining group with pin ${pin}`) // Replaced with navigation
      updateUserPins(groupPin);
      navigate('/calendar');
    } else {
      // Failure - correct format, but invalid pin
      setError('Invalid pin code. Please try again.');
    }
  }

  return (
    <div className="container">
      <div className="card">
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
                <h1 className="mt-1 text-lg font-semibold text-slate-900">Welcome {localUsername}!</h1>
                <h1 className="mt-1 text-lg font-semibold text-slate-900">Join Group</h1>
                <p className="mt-2 text-sm text-slate-500">Enter the pin code shared by your group organizer</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="pin">Group Pin Code</label>
                  <input
                    id="pin"
                    name="pin"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="Enter 6-digit pin"
                    value={groupPin}
                    onChange={(e) => setGroupPin(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-slate-700 placeholder-slate-400"
                    aria-describedby="pin-help"
                  />
                </div>

                {/* Display error message here */}
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div>
                    <button
                      type="submit" 
                      className="btn btn-primary"
                    >
                      Join Group
                    </button>
                </div>
              </form>

              <div className="mt-6 rounded-lg bg-green-50 border border-green-100 p-4">
                <p className="text-sm text-slate-800 leading-relaxed">
                  <span className="font-semibold text-green-700">Need a pin code?</span>
                  <span className="ml-1 text-slate-700">Ask your group organizer to share the 6-digit pin code they received when creating the group.</span>
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