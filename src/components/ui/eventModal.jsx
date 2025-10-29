import React, { useState, useEffect } from 'react';
// FIX: Made import paths more explicit to resolve build errors
import { EVENT_TYPES } from '../../../constants.js';
import { formatTime } from '../../utils/dateHelpers.js';

/**
 * A simple modal component for creating new events.
 * I've added the error state fix we discussed.
 */
export const EventModal = ({ isOpen, onClose, onSave, eventData, setEventData }) => {
  const [error, setError] = useState('');

  // Clear error when modal closes or event data changes
  useEffect(() => {
    if (isOpen) {
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { start, end, title, type } = eventData;

  const handleSave = () => {
    // Basic validation
    if (!title || !type) {
      setError("Title and event type are required.");
      return;
    }
    setError(''); // Clear error
    onSave(eventData);
    onClose();
  };

  const handleClose = () => {
    setError(''); // Clear error
    onClose();
  };

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Event</h2>

        {/* --- ERROR MESSAGE --- */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-md mb-4 text-sm" role="alert">
            {error}
          </div>
        )}
        
        {/* Event Title */}
        <div className="mb-4">
          <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            id="eventTitle"
            value={title}
            onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Team Meeting"
          />
        </div>

        {/* Event Type */}
        <div className="mb-4">
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
          </label>
          <select
            id="eventType"
            value={type}
            onChange={(e) => setEventData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Select a type...</option>
            {Object.entries(EVENT_TYPES).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Time Display (Read-only) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <div className="w-full px-3 py-2 bg-gray-50 text-gray-600 rounded-md border border-gray-200">
            {start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            , {formatTime(start)} &ndash; {formatTime(end)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

