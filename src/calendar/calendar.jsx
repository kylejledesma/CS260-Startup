import React, { useEffect, useRef, useState } from 'react'
import '../app.css'
import './calendar.css'

export default function Calendar() {
  const [copied, setCopied] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const calendarRef = useRef(null)

  useEffect(() => {
    const copyBtn = calendarRef.current?.querySelector('.copy-btn')
    const addBtn = calendarRef.current?.querySelector('.add-time-block-btn')
    const cells = calendarRef.current?.querySelectorAll('.calendar-cell') || []

    function onCopy() {
      navigator.clipboard.writeText('123456').then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
    }

    function onAdd() {
      alert('Add Time Block functionality would open a modal here')
    }

    let localSelecting = false

    function onMouseDown(e) {
      localSelecting = true
      setIsSelecting(true)
      e.currentTarget.style.background = '#ddd6fe'
    }

    function onMouseEnter(e) {
      if (localSelecting) e.currentTarget.style.background = '#ddd6fe'
    }

    function onMouseUp() {
      if (localSelecting) {
        localSelecting = false
        setIsSelecting(false)
        alert('Time block would be created here')
        cells.forEach(c => { c.style.background = '' })
      }
    }

    copyBtn?.addEventListener('click', onCopy)
    addBtn?.addEventListener('click', onAdd)
    cells.forEach(c => {
      c.addEventListener('mousedown', onMouseDown)
      c.addEventListener('mouseenter', onMouseEnter)
      c.addEventListener('mouseup', onMouseUp)
    })

    document.addEventListener('mouseup', () => { localSelecting = false; setIsSelecting(false); cells.forEach(c => c.style.background = '') })

    return () => {
      copyBtn?.removeEventListener('click', onCopy)
      addBtn?.removeEventListener('click', onAdd)
      cells.forEach(c => {
        c.removeEventListener('mousedown', onMouseDown)
        c.removeEventListener('mouseenter', onMouseEnter)
        c.removeEventListener('mouseup', onMouseUp)
      })
    }
  }, [])

  return (
    <div ref={calendarRef} className="min-h-screen bg-white">
      <nav className="p-4 border-b">
        <a href="/" className="logo">Whenworks</a>
      </nav>

      <div className="flex">
        <aside className="w-72 border-r p-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700">Pin Code</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-lg font-mono">123456</div>
              <button className="copy-btn px-2 py-1 bg-slate-100 rounded">📋</button>
              {copied && <span className="text-sm text-green-600">Copied</span>}
            </div>
            <p className="text-xs text-slate-500 mt-2">Share this code with your team</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700">Members (3)</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full inline-block" />You <span className="ml-2 text-xs text-slate-500">You</span></li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full inline-block" />Alice Johnson</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full inline-block" />Bob Smith</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-700">Event Types</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2"><span className="w-3 h-3 bg-indigo-400 inline-block rounded" /> Classes</li>
              <li className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-400 inline-block rounded" /> Meetings</li>
              <li className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-400 inline-block rounded" /> Homework</li>
              <li className="flex items-center gap-2"><span className="w-3 h-3 bg-pink-300 inline-block rounded" /> Social</li>
            </ul>
            <button className="add-time-block-btn mt-4 px-3 py-2 bg-slate-100 rounded">Add Time Block</button>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <header className="flex items-center justify-between mb-4">
            <div>
              <h1 className="logo">Whenworks <span className="text-base font-normal text-slate-600">Demo Study Group</span></h1>
            </div>
            <div className="space-x-2">
              <button className="btn btn-dark px-3 py-1 bg-slate-800 text-white rounded">My Schedule</button>
              <button className="btn btn-light px-3 py-1 border rounded">👥 Team View</button>
            </div>
          </header>

          <div className="calendar-content">
            <div className="calendar-view">
              <div className="schedule-header flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Your Schedule</h2>
                <div className="text-sm text-slate-500">🔒 Private view</div>
              </div>

              <div className="week-navigation flex items-center gap-3 mb-4">
                <button className="week-nav-btn px-3 py-1 border rounded">Previous Week</button>
                <div className="current-week">Week of Sep 8, 2025</div>
                <button className="week-nav-btn px-3 py-1 border rounded">Next Week</button>
              </div>

              <div className="tip-banner bg-yellow-50 p-3 rounded mb-4">
                <strong>Tip:</strong> Click and drag on the calendar to quickly create time blocks.
              </div>

              <div className="calendar-grid gap-px bg-slate-200">
                <div className="calendar-header-cell bg-white p-2">Time</div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                  <div key={d} className="calendar-header-cell bg-white p-2 text-sm text-slate-700">{d}<br /><small className="text-xs">Sep {8 + i}</small></div>
                ))}

                {Array.from({ length: 8 }).flatMap((_, hour) => [
                  <div key={`time-${hour}`} className="time-cell bg-white p-2 text-sm">{`${hour}:00`}</div>,
                  ...Array.from({ length: 7 }).map((__, col) => (
                    <div key={`cell-${hour}-${col}`} className="calendar-cell bg-white h-12"></div>
                  ))
                ])}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}