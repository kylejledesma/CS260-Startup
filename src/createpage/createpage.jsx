import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Createpage() {
  const [groupName, setGroupName] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // for demo: generate a random 6-digit pin and navigate to calendar
    const pin = String(Math.floor(100000 + Math.random() * 900000))
    try {
      navigator.clipboard.writeText(pin)
      // In a real app you'd POST groupName to a backend and receive the pin
      alert(`Group created! Pin copied to clipboard: ${pin}`)
    } catch (err) {
      // fallback: show the pin
      alert(`Group created! Pin: ${pin}`)
    }
    navigate('/about')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-sky-50 flex items-center justify-center">
      <div className="w-full max-w-3xl px-6">
        <header className="flex justify-center mt-6 mb-10">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" strokeLinejoin="round"></rect>
              <path d="M16 3v4M8 3v4" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="text-2xl font-semibold text-slate-800">Whenworks</span>
          </div>
        </header>

        <main className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-[0_20px_30px_rgba(2,6,23,0.08)] p-6 sm:p-8">
              <div className="mb-4">
                <NavLink to="/" className="inline-flex items-center text-slate-600 hover:text-slate-800">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M15 9H6.5M8.75 4.75L3.75 9.75 8.75 14.75" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="sr-only">Back</span>
                </NavLink>
                <h1 className="mt-1 text-lg font-semibold text-slate-900">Create New Group</h1>
                <p className="mt-2 text-sm text-slate-500">Start a new calendar sharing session for your team</p>
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

                <div>
                  <button type="submit" className="w-full block text-center rounded-lg bg-blue-600 text-white py-2.5 font-medium shadow-sm hover:bg-blue-700 transition-colors">
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