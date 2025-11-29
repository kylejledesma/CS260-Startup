import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- REMOVED MOCK DATA IMPORTS ---
// import { MY_EVENTS_DATA, TEAM_EVENTS_DATA } from '../../constants.js';

// Import Utils (Helpers)
import { generateTimeSlots } from '../utils/dateHelpers';
import { calculateHeatmapData } from '../utils/heatmapHelpers';

// Import Hooks (Logic)
import { useCalendarNav } from '../hooks/useCalendarNav';
import { useEventDrag } from '../hooks/useEventDrag';

// Import Components (UI)
import { Navbar } from '../components/layout/Navbar';
import { CalendarSidebar } from '../components/calendar/calendarSidebar';
import { ViewToggle } from '../components/ui/viewToggle';
import { EventModal } from '../components/ui/eventModal';
import { PersonalCalendar } from '../components/calendar/personalCalendar';
import { TeamHeatmap } from '../components/calendar/teamHeatmap';

/**
 * This is the main "smart" component for the calendar page.
 * It fetches data, manages state, and assembles the UI components.
 */
export default function CalendarPage() {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('individual'); // 'individual' or 'team'
  
  // --- STATE FOR EVENTS ---
  const [myEvents, setMyEvents] = useState([]);      // Your personal events
  const [teamEvents, setTeamEvents] = useState([]);  // Events for the whole team

  // --- LOCAL STORAGE DATA ---
  // We grab these from storage so they persist after the user logs in
  const localGroupName = localStorage.getItem('localGroupName') || "My Team";
  const localGroupPin = localStorage.getItem('localGroupPin') || "000000";

  // State for the event modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEventData, setModalEventData] = useState({
    title: '',
    type: '',
    start: null,
    end: null,
  });

  // Ref for the scrollable calendar container
  const calendarScrollRef = useRef(null);

  // --- Hooks ---

  // Handles date navigation and week day calculation
  const { currentDate, weekDays, handleWeekChange } = useCalendarNav();

  // Opens the modal when a drag operation is complete
  const handleDragEnd = (start, end) => {
    setModalEventData({
      title: '',
      type: '',
      start: start,
      end: end,
    });
    setIsModalOpen(true);
  };

  // Handles drag-to-create logic
  const { handleMouseDown, handleMouseEnter, handleMouseUp, isCellSelected } = useEventDrag({
    onDragEnd: handleDragEnd,
  });
  
  // --- DATA FETCHING (NEW) ---

  // 1. Fetch Personal Events on Mount
  useEffect(() => {
    fetch('/api/events')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          // If server returns 401 Unauthorized, return null so we can handle it
          return null;
        }
      })
      .then((data) => {
        if (data) {
          setMyEvents(data); // Success: Save the array of events
        } else {
          // Failure: Server doesn't know us. Redirect to login.
          // Optional: clear local storage so the UI knows we are logged out
          localStorage.removeItem('localUsername');
          window.location.href = '/login';
        }
      })
      .catch((err) => console.error("Failed to fetch my events:", err));
  }, []);

  // 2. Fetch Team Events when View Mode changes to 'team'
  useEffect(() => {
    if (viewMode === 'team' && localGroupPin) {
      fetch(`/api/events?teamPin=${localGroupPin}`)
        .then(res => res.json())
        .then(data => {
          setTeamEvents(data);
        })
        .catch(err => console.error("Failed to fetch team events:", err));
    }
  }, [viewMode, localGroupPin]);

  // --- Memoized Computations ---

  const timeSlots = useMemo(() => generateTimeSlots(), []); // 48 slots
  
  const heatmapData = useMemo(() => {
    if (viewMode !== 'team') return new Map();
    // We now calculate this using the real data fetched from the server
    return calculateHeatmapData(teamEvents);
  }, [viewMode, teamEvents]); 

  // Auto-scroll to 8:00 AM on mount
  useEffect(() => {
    if (calendarScrollRef.current) {
      const scrollPosition = 16 * 40;
      calendarScrollRef.current.scrollTop = scrollPosition;
    }
  }, []);

  // --- Event Handlers ---

  const handleCopyPin = () => {
    navigator.clipboard.writeText(localGroupPin).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSaveEvent = async (newEventData) => {
    // Prepare the payload for the API
    const eventPayload = {
      title: newEventData.title,
      type: newEventData.type,
      start: newEventData.start.toISOString(),
      end: newEventData.end.toISOString(),
      teamPin: localGroupPin // Attach to current team so it shows up in heatmap
    };

    try {
      // 1. Send to Server
      const response = await fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      });

      if (response.ok) {
        const savedEvent = await response.json();
        
        // 2. Update Local State (Immediate UI feedback)
        setMyEvents(prevEvents => [...prevEvents, savedEvent]);
        
        // If we are in team view, we might want to push it there too, 
        // or just let the next fetch handle it. 
        // For simplicity, we assume the user switches views to see it in the heatmap.
      } else {
        alert("Failed to save event");
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  return (
    <div 
      className="flex flex-col h-screen bg-gray-50 font-sans"
      onMouseUp={handleMouseUp} // Listen globally to end drag
    >
      
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        
        <CalendarSidebar 
          localGroupPin={localGroupPin}
          copied={copied}
          handleCopyPin={handleCopyPin}
        />

        {/* --- Main Calendar Area --- */}
        <main className="flex-1 flex flex-col p-6 lg:p-8 overflow-hidden">
          
          {/* Main Header */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 flex-shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Schedule
                <span className="text-xl font-normal text-gray-500 ml-3">{localGroupName}</span>
              </h1>
            </div>
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
          </header>

          {/* Sub-header (Title & Week Nav) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 flex-shrink-0">
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
          
          {/* --- Scrollable Calendar Container --- */}
          <div 
            ref={calendarScrollRef}
            className="flex-1 overflow-auto"
          >
            {/* Conditionally render the correct calendar view */}
            {viewMode === 'individual' ? (
              <PersonalCalendar 
                weekDays={weekDays}
                timeSlots={timeSlots}
                myEvents={myEvents}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                isCellSelected={isCellSelected}
              />
            ) : (
              <TeamHeatmap 
                weekDays={weekDays}
                timeSlots={timeSlots}
                heatmapData={heatmapData}
              />
            )}
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