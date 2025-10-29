import React from 'react';

export const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex-shrink-0 flex rounded-md shadow-sm">
      <button
        onClick={() => setViewMode('individual')}
        className={`px-4 py-2 text-sm font-medium rounded-l-md border transition-colors
          ${viewMode === 'individual'
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
      >
        My Schedule
      </button>
      <button
        onClick={() => setViewMode('team')}
        className={`px-4 py-2 text-sm font-medium rounded-r-md border border-l-0 transition-colors
          ${viewMode === 'team'
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
      >
        👥 Team View
      </button>
    </div>
  );
};
