import React, { useState, useMemo, useCallback } from 'react';

// --- MOCK DATA ---
// We'll use mock data to demonstrate the features.
// In a real app, this would come from your database (like Firestore).

const TEAM_MEMBERS = [
  { id: 'user-self', name: 'You', color: 'indigo' },
  { id: 'alice', name: 'Alice Johnson', color: 'pink' },
  { id: 'bob', name: 'Bob Smith', color: 'green' },
];

const MY_EVENTS_DATA = [
  { id: 1, title: 'My Meeting', start: '2025-09-08T09:00:00', end: '2025-09-08T10:30:00', type: 'meetings' },
  { id: 2, title: 'CS 101 Lecture', start: '2025-09-09T11:00:00', end: '2025-09-09T12:30:00', type: 'classes' },
  { id: 3, title: 'Study Session', start: '2025-09-10T14:00:00', end: '2025-09-10T16:00:00', type: 'homework' },
  { id: 4, title: 'Team Sync', start: '2025-09-12T10:00:00', end: '2025-09-12T10:30:00', type: 'meetings' },
];

const TEAM_EVENTS_DATA = [
  // My Events
  ...MY_EVENTS_DATA.map(e => ({ ...e, userId: 'user-self' })),
  
  // Alice's Events
  { id: 5, userId: 'alice', title: 'Alice\'s Project', start: '2025-09-08T10:00:00', end: '2025-09-08T11:30:00', type: 'meetings' },
  { id: 6, userId: 'alice', title: 'Design Review', start: '2025-09-09T11:00:00', end: '2025-09-09T13:00:00', type: 'classes' },
  { id: 7, userId: 'alice', title: 'Client Call', start: '2025-09-10T14:30:00', end: '2025-09-10T15:30:00', type: 'meetings' },
  
  // Bob's Events
  { id: 8, userId: 'bob', title: 'Bob\'s 1:1', start: '2025-09-08T09:30:00', end: '2025-09-08T10:30:00', type: 'meetings' },
  { id: 9, userId: 'bob', title: 'Code Review', start: '2025-09-10T14:00:00', end: '2025-09-10T15:30:00', type: 'homework' },
  { id: 10, userId: 'bob', title: 'All-Hands', start: '2025-09-12T10:00:00', end: '2025-09-12T11:00:00', type: 'meetings' },
];

const EVENT_TYPES = {
  classes: { label: 'Classes', color: 'bg-indigo-500' },
  meetings: { label: 'Meetings', color: 'bg-blue-500' },
  homework: { label: 'Homework', color: 'bg-purple-500' },
  social: { label: 'Social', color: 'bg-pink-500' },
};

// --- HELPER FUNCTIONS ---

/**
 * Generates time slots for the day in 30-minute intervals.
 */
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`);
    slots.push(`${i.toString().padStart(2, '0')}:30`);
  }
  return slots; // 48 slots
};

/**
 * Gets the days of the week for a given start date.
 * @param {Date} startDate - The starting date (e.g., Sunday or Monday).
 */
const getWeekDays = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    days.push(date);
  }
  return days;
};

/**
 * Parses a date-time string into a Date object.
 * @param {string} dateTimeStr - e.g., "2025-09-08T09:00:00"
 * @returns {Date}
 */
const parseDateTime = (dateTimeStr) => new Date(dateTimeStr);

/**
 * Formats a Date object into a 'HH:mm' string.
 * @param {Date} date
 * @returns {string}
 */
const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

/**
 * Formats a Date object into a 'YYYY-MM-DD' string.
 * @param {Date} date
 * @returns {string}
 */
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Combines a date and a time string into a new Date object.
 * @param {Date} date - The date part.
 * @param {string} time - The time part (e.g., "09:00").
 * @returns {Date}
 */
const combineDateAndTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const newDate = new Date(date);
  newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return newDate;
};

// --- REACT COMPONENTS ---

/**
 * A simple modal component for creating new events.
 */
const EventModal = ({ isOpen, onClose, onSave, eventData, setEventData }) => {
  if (!isOpen) return null;

  const { start, end, title, type } = eventData;

  const handleSave = () => {
    // Basic validation
    if (!title || !type) {
      // In a real app, show a user-friendly error
      console.error("Title and type are required.");
      return;
    }
    onSave(eventData);
    onClose();
  };

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Event</h2>
        
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
            onClick={onClose}
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


/**
 * The main component for the calendar page.
 */
export default function App() {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('individual'); // 'individual' or 'team'
  const [currentDate, setCurrentDate] = useState(new Date('2025-09-08T00:00:00')); // Start of the week
  
  // State for user's events
  const [myEvents, setMyEvents] = useState(MY_EVENTS_DATA);
  
  // State for drag-to-create
  const [dragState, setDragState] = useState({ isDragging: false, startCell: null, endCell: null });
  
  // State for the event modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEventData, setModalEventData] = useState({
    title: '',
    type: '',
    start: null,
    end: null,
  });

  const localGroupName = "My Team"; // Mock data
  const localGroupPin = "123456"; // Mock data
  const localUsername = "You (Me)"; // Mock data

  // --- Memoized Computations ---

  const timeSlots = useMemo(() => generateTimeSlots(), []); // 48 slots
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]); // [Date, Date, ...]

  /**
   * Calculates the heatmap data for the team view.
   * Returns a Map where key is 'YYYY-MM-DD:HH:mm' and value is the count.
   */
  const heatmapData = useMemo(() => {
    if (viewMode !== 'team') return new Map();

    const data = new Map();
    const slotDuration = 30; // 30 minutes

    for (const event of TEAM_EVENTS_DATA) {
      let currentSlot = parseDateTime(event.start);
      const endDate = parseDateTime(event.end);

      while (currentSlot < endDate) {
        const slotKey = `${formatDate(currentSlot)}:${formatTime(currentSlot)}`;
        const count = data.get(slotKey) || 0;
        data.set(slotKey, count + 1);

        // Move to the next 30-minute slot
        currentSlot = new Date(currentSlot.getTime() + slotDuration * 60000);
      }
    }
    return data;
  }, [viewMode]);

  // --- Event Handlers ---

  const handleCopyPin = () => {
    navigator.clipboard.writeText(localGroupPin).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWeekChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getCellData = (e) => {
    const cell = e.target.closest('[data-day][data-time]');
    if (!cell) return null;
    
    const { day, time } = cell.dataset;
    return { day, time };
  };
  
  const handleMouseDown = (e) => {
    // Only allow dragging in individual view
    if (viewMode !== 'individual') return;
    
    const cellData = getCellData(e);
    if (!cellData) return;

    setDragState({ isDragging: true, startCell: cellData, endCell: cellData });
    e.preventDefault();
  };
  
  const handleMouseEnter = (e) => {
    if (!dragState.isDragging) return;
    
    const cellData = getCellData(e);
    if (!cellData) return;
    
    // Only update if the cell is different
    if (cellData.day !== dragState.endCell.day || cellData.time !== dragState.endCell.time) {
      setDragState(prev => ({ ...prev, endCell: cellData }));
    }
  };
  
  const handleMouseUp = () => {
    if (!dragState.isDragging || !dragState.startCell) {
      setDragState({ isDragging: false, startCell: null, endCell: null });
      return;
    }
    
    // Determine start and end
    const start = combineDateAndTime(new Date(dragState.startCell.day), dragState.startCell.time);
    const endCellTime = combineDateAndTime(new Date(dragState.endCell.day), dragState.endCell.time);
    
    // The "end" of a cell is 30 mins after its start time
    const end = new Date(endCellTime.getTime() + 30 * 60000); 

    // Order them correctly
    const finalStart = start < end ? start : end;
    const finalEnd = start < end ? end : start;
    
    // Open the modal
    setModalEventData({
      title: '',
      type: '',
      start: finalStart,
      end: finalEnd,
    });
    setIsModalOpen(true);
    
    // Reset drag state
    setDragState({ isDragging: false, startCell: null, endCell: null });
  };
  
  const handleSaveEvent = (newEventData) => {
    setMyEvents(prevEvents => [
      ...prevEvents,
      {
        ...newEventData,
        id: prevEvents.length + 100, // simple mock ID
        start: newEventData.start.toISOString(),
        end: newEventData.end.toISOString(),
      }
    ]);
    // In a real app, you would also update TEAM_EVENTS_DATA and sync with the database
  };
  
  /**
   * Checks if a cell is currently part of the user's drag selection.
   */
  const isCellSelected = (day, time) => {
    if (!dragState.isDragging || !dragState.startCell) return false;

    const { startCell, endCell } = dragState;
    const cellTime = combineDateAndTime(new Date(day), time).getTime();
    
    const startTime = combineDateAndTime(new Date(startCell.day), startCell.time).getTime();
    const endTime = combineDateAndTime(new Date(endCell.day), endCell.time).getTime();

    const minTime = Math.min(startTime, endTime);
    const maxTime = Math.max(startTime, endTime);
    
    return cellTime >= minTime && cellTime <= maxTime;
  };

  /**
   * Renders the event blocks for the "My Schedule" view.
   */
  const renderEventBlocks = () => {
    return myEvents.map(event => {
      const startDate = parseDateTime(event.start);
      const endDate = parseDateTime(event.end);
      
      const startDay = formatDate(startDate);
      
      // Find the day column this event belongs to
      const dayIndex = weekDays.findIndex(day => formatDate(day) === startDay);
      if (dayIndex === -1) return null; // Event is not in the current week

      // Calculate grid row position
      const startHour = startDate.getHours();
      const startMinutes = startDate.getMinutes();
      // +2 because grid row index is 1-based and we have a header row
      const startRow = (startHour * 2) + (startMinutes / 30) + 2; 

      const endHour = endDate.getHours();
      const endMinutes = endDate.getMinutes();
      const endRow = (endHour * 2) + (endMinutes / 30) + 2;
      
      const durationRows = endRow - startRow;
      const eventType = EVENT_TYPES[event.type] || { label: 'Event', color: 'bg-gray-500' };

      return (
        <div
          key={event.id}
          className={`absolute left-1 right-1 rounded-lg p-2 text-white overflow-hidden shadow ${eventType.color}`}
          style={{
            gridColumn: dayIndex + 2, // +2 for time column
            gridRowStart: startRow,
            gridRowEnd: endRow,
          }}
        >
          <p className="font-semibold text-xs">{event.title}</p>
          <p className="text-xs opacity-80">
            {formatTime(startDate)} - {formatTime(endDate)}
          </p>
        </div>
      );
    });
  };

  /**
   * Gets the heatmap color for a specific cell in "Team View".
   */
  const getHeatmapColor = (day, time) => {
    const key = `${formatDate(day)}:${time}`;
    const count = heatmapData.get(key) || 0;
    
    // Tailwind shades for the 'indigo' theme
    if (count === 0) return 'bg-white';
    if (count === 1) return 'bg-indigo-100';
    if (count === 2) return 'bg-indigo-300';
    if (count === 3) return 'bg-indigo-500';
    return 'bg-indigo-700'; // 4+
  };

  return (
    <div 
      className="flex flex-col min-h-screen bg-gray-50 font-sans"
      onMouseUp={handleMouseUp} // Listen for mouseUp globally to end drag
    >
      
      {/* --- Header / Navbar --- */}
      <nav className="p-4 border-b bg-white shadow-sm">
        <a href="/" className="text-2xl font-bold text-gray-900">
          Whenworks
        </a>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        
        {/* --- Sidebar --- */}
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
              Members ({TEAM_MEMBERS.length})
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-800">
              {TEAM_MEMBERS.map((member) => (
                <li key={member.id} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 bg-${member.color}-500 rounded-full inline-block`} />
                  {member.name}
                </li>
              ))}
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

        {/* --- Main Calendar Area --- */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          
          {/* Main Header */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Schedule
                <span className="text-xl font-normal text-gray-500 ml-3">{localGroupName}</span>
              </h1>
            </div>
            {/* View Toggle Buttons */}
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
          </header>

          {/* Sub-header (Title & Week Nav) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {viewMode === 'individual' ? 'Your Schedule' : 'Team Heatmap'}
              </h2>
              <p className="text-sm text-gray-500">
                {viewMode === 'individual'
                  ? '🔒 This is your private view. Drag to create events.'
                  : '🟧 Darker blocks mean more people are busy.'
                }
              </p>
            </div>
            {/* Week Navigation */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleWeekChange('prev')}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <div className="text-base font-medium text-gray-800 whitespace-nowrap">
                Week of {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <button
                onClick={() => handleWeekChange('next')}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
          
          {/* --- Calendar Grid --- */}
          <div 
            className="grid bg-gray-200 border border-gray-200 rounded-lg overflow-hidden select-none"
            style={{ 
              gridTemplateColumns: '80px repeat(7, 1fr)',
              // 1 header row + 48 time slots
              gridTemplateRows: `auto repeat(${timeSlots.length}, minmax(0, 1fr))` 
            }}
            onMouseDown={handleMouseDown}
          >
            {/* --- Grid Header: Time --- */}
            <div className="row-start-1 col-start-1 bg-gray-50 p-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-200">
              Time
            </div>
            
            {/* --- Grid Header: Days --- */}
            {weekDays.map((day, i) => (
              <div
                key={day.toISOString()}
                className="row-start-1 bg-gray-50 p-2 text-center border-b border-gray-200 border-l"
                style={{ gridColumn: i + 2 }}
              >
                <div className="text-sm font-medium text-gray-800">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-xs text-gray-500">
                  {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
            
            {/* --- Time Gutter Cells --- */}
            {timeSlots.map((time, i) => {
              // Only show the label for the :00 slot
              const showLabel = time.endsWith(':00');
              return (
                <div
                  key={time}
                  className="bg-gray-50 border-r border-gray-200 text-right pr-2"
                  style={{ gridRow: i + 2, gridColumn: 1 }}
                >
                  {showLabel && (
                    <span className="text-xs text-gray-500 -translate-y-2.5 relative top-0 block">
                      {time}
                    </span>
                  )}
                </div>
              );
            })}
            
            {/* --- Calendar Cells --- */}
            {weekDays.map((day, dayIndex) => (
              timeSlots.map((time, timeIndex) => {
                const dayStr = formatDate(day);
                
                // Determine cell style based on viewMode
                let cellClass = 'border-t border-l border-gray-200';
                if (viewMode === 'individual') {
                  const isSelected = isCellSelected(dayStr, time);
                  cellClass += isSelected 
                    ? ' bg-indigo-200 opacity-70' 
                    : ' bg-white hover:bg-gray-50 transition-colors';
                } else {
                  // Team View: Apply heatmap color
                  cellClass += ` ${getHeatmapColor(day, time)} transition-colors`;
                }
                
                return (
                  <div
                    key={`${dayStr}-${time}`}
                    className={cellClass}
                    style={{
                      gridRow: timeIndex + 2,
                      gridColumn: dayIndex + 2,
                      minHeight: '2.5rem', // 40px height for each 30-min slot
                    }}
                    data-day={dayStr}
                    data-time={time}
                    onMouseEnter={handleMouseEnter}
                  >
                    {/* Content is absolutely positioned (events) or handled by bg color (heatmap) */}
                  </div>
                );
              })
            ))}

            {/* --- Event Block Rendering (Individual View Only) --- */}
            {viewMode === 'individual' && renderEventBlocks()}

          </div>
        </main>
      </div>

      {/* --- Event Creation Modal --- */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        eventData={modalEventData}
        setEventData={setModalEventData}
      />
    </div>
  );
}

