import React from 'react';
import { EVENT_TYPES } from '../../../constants.js';

export const CalendarSidebar = ({ localGroupPin, copied, handleCopyPin, members = [] }) => {
  console.log("Sidebar received members:", members); // debugging log

  const colors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'gray'
  ];

  return (
    <aside className="w-72 border-r bg-white p-6 space-y-8 overflow-y-auto">
        
      {/* Pin Code Section */}
      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pin Code</h3>
        <div className="flex items-center gap-2 mt-3">
          <div className="text-2xl font-mono text-gray-800 tracking-wider">{localGroupPin}</div>
          <button
            onClick={handleCopyPin}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Share this code with your team</p>
      </section>

      {/* Members Section */}
      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Members ({members.length})
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-gray-800">
          {members.length === 0 ? (
            <li className="text-gray-400 italic">No members found.</li>
          ) : (
            members.map((member, index) => (
              <li key={member.id || index} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 bg-${colors[index % colors.length]}-500 rounded-full inline-block`} />
                {member.name}
              </li>
            ))
          )}
        </ul>
      </section>
      
      {/* Event Types Section */}
      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Event Types</h3>
        <ul className="mt-3 space-y-2 text-sm text-gray-800">
          {Object.entries(EVENT_TYPES).map(([key, { label, color }]) => (
            <li key={key} className="flex items-center gap-2">
              <span className={`w-3.5 h-3.5 ${color} inline-block rounded-sm`} /> 
              {label}
            </li>
          ))}
        </ul>
      </section>

    </aside>
  );
};
