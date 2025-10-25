import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Helper Functions & Mock Data ---

// Generates a random 6-digit pin
const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();

// Mock initial data to simulate a database
const MOCK_DB = {
  users: [
    { id: 'user1', name: 'Alex Doe', email: 'alex@example.com' },
    { id: 'user2', name: 'Brenda Smith', email: 'brenda@example.com' },
    { id: 'user3', name: 'Casey Jones', email: 'casey@example.com' },
  ],
  groups: {
    '123456': {
      name: 'Project Alpha',
      members: ['user1', 'user2', 'user3'],
    },
  },
  events: [
    // Alex's Schedule
    { id: 'evt1', userId: 'user1', groupId: '123456', type: 'class', day: 'Mon', start: 9, end: 11 },
    { id: 'evt2', userId: 'user1', groupId: '123456', type: 'work', day: 'Mon', start: 14, end: 17 },
    { id: 'evt3', userId: 'user1', groupId: '123456', type: 'class', day: 'Wed', start: 9, end: 11 },
    { id: 'evt4', userId: 'user1', groupId: '123456', type: 'misc', day: 'Fri', start: 18, end: 20 },
    // Brenda's Schedule
    { id: 'evt5', userId: 'user2', groupId: '123456', type: 'class', day: 'Mon', start: 10, end: 12 },
    { id: 'evt6', userId: 'user2', groupId: '123456', type: 'work', day: 'Tue', start: 9, end: 17 },
    { id: 'evt7', userId: 'user2', groupId: '123456', type: 'class', day: 'Thu', start: 13, end: 15 },
    // Casey's Schedule
    { id: 'evt8', userId: 'user3', groupId: '123456', type: 'misc', day: 'Mon', start: 18, end: 21 },
    { id: 'evt9', userId: 'user3', groupId: '123456', type: 'work', day: 'Wed', start: 9, end: 17 },
    { id: 'evt10', userId: 'user3', groupId: '123456', type: 'class', day: 'Fri', start: 10, end: 13 },
  ],
};

// --- API Simulation ---
// Simulates fetching and saving data to a backend
const api = {
  login: async (email, password) => {
    console.log('API: Logging in...');
    return new Promise(resolve => setTimeout(() => resolve({ id: 'user1', name: 'Alex Doe', email: 'alex@example.com' }), 500));
  },
  createGroup: async (groupName, userId) => {
    console.log(`API: Creating group "${groupName}" for user ${userId}`);
    return new Promise(resolve => {
      setTimeout(() => {
        const pin = generatePin();
        MOCK_DB.groups[pin] = { name: groupName, members: [userId] };
        resolve({ pin, name: groupName });
      }, 500);
    });
  },
  joinGroup: async (pin, userId) => {
    console.log(`API: User ${userId} joining group with pin ${pin}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MOCK_DB.groups[pin]) {
          if (!MOCK_DB.groups[pin].members.includes(userId)) {
            MOCK_DB.groups[pin].members.push(userId);
          }
          resolve({ pin, name: MOCK_DB.groups[pin].name });
        } else {
          reject(new Error('Group not found.'));
        }
      }, 500);
    });
  },
  getUserEvents: async (userId, groupId) => {
    console.log(`API: Getting events for user ${userId} in group ${groupId}`);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_DB.events.filter(e => e.userId === userId && e.groupId === groupId)), 300));
  },
  getTeamEvents: async (groupId) => {
    console.log(`API: Getting all team events for group ${groupId}`);
     return new Promise(resolve => setTimeout(() => {
        const group = MOCK_DB.groups[groupId];
        if (!group) return resolve([]);
        const teamEvents = MOCK_DB.events.filter(e => e.groupId === groupId);
        const members = MOCK_DB.users.filter(u => group.members.includes(u.id));
        resolve({ events: teamEvents, members });
    }, 500));
  },
  saveUserEvents: async (userId, groupId, events) => {
    console.log(`API: Saving events for user ${userId} in group ${groupId}`);
    return new Promise(resolve => {
        setTimeout(() => {
            // Remove old events for this user in this group
            MOCK_DB.events = MOCK_DB.events.filter(e => !(e.userId === userId && e.groupId === groupId));
            // Add new events
            MOCK_DB.events.push(...events);
            console.log("DB updated", MOCK_DB.events);
            resolve([...events]);
        }, 500);
    });
  },
};

// --- Context for Global State ---
const AppContext = React.createContext();

// --- Main App Component ---
export default function App() {
  const [route, setRoute] = useState({ name: 'home' });
  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const appContextValue = {
    user,
    setUser,
    group,
    setGroup,
    setRoute,
    isLoading,
    setIsLoading,
    error,
    setError
  };
  
  const renderPage = () => {
    switch (route.name) {
      case 'login': return <LoginPage />;
      case 'create': return <CreatePage />;
      case 'join': return <JoinPage />;
      case 'calendar': return <CalendarPage groupId={route.groupId} />;
      default: return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
        <Navbar />
        <main className="p-4 sm:p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </AppContext.Provider>
  );
}

// --- UI Components ---

function Navbar() {
    const { user, setUser, setRoute, setGroup } = React.useContext(AppContext);

    const handleLogout = () => {
        setUser(null);
        setGroup(null);
        setRoute({ name: 'home' });
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                <div 
                    className="text-2xl font-bold text-indigo-600 cursor-pointer"
                    onClick={() => setRoute({ name: user ? 'join' : 'home' })}
                >
                    WhenWorks
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-600 hidden sm:block">Welcome, {user.name}!</span>
                            <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setRoute({ name: 'login' })} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Log In
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}

function HomePage() {
  const { setRoute } = React.useContext(AppContext);
  return (
    <div className="text-center">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                Find the perfect time to meet. <span className="text-indigo-600">Effortlessly.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Stop the back-and-forth scheduling. WhenWorks lets your group visually share their schedules to instantly find common free time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button onClick={() => setRoute({ name: 'create' })} className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                    Create a Group
                </button>
                <button onClick={() => setRoute({ name: 'join' })} className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                    Join a Group
                </button>
            </div>
        </div>
        <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                 {/* Placeholder for an illustrative image/gif */}
                 <div className="bg-gray-200 h-80 flex items-center justify-center">
                    <p className="text-gray-500 text-xl"></p>
                </div>
            </div>
        </div>
    </div>
  );
}

function LoginPage() {
    const { setUser, setRoute, setIsLoading, setError } = React.useContext(AppContext);

    const handleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            // In a real app, this would involve a Google OAuth flow.
            const loggedInUser = await api.login('alex@example.com', 'password');
            setUser(loggedInUser);
            setRoute({ name: 'join' });
        } catch (err) {
            setError('Failed to log in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
            <p className="text-center text-gray-600 mb-6">
                To keep things simple, this prototype uses a mock user. Click below to log in as "Alex".
            </p>
            <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 48 48">
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.35 6.52C12.91 13.46 18.06 9.5 24 9.5z"></path>
                    <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.57 3.39-2.21 6.22-4.78 8.12l7.74 6.02C43.51 39.54 46.98 32.74 46.98 24.55z"></path>
                    <path fill="#FBBC05" d="M10.91 28.74c-.21-.65-.33-1.33-.33-2.04s.12-1.39.33-2.04l-8.35-6.52C.73 19.25 0 21.55 0 24s.73 4.75 2.56 6.78l8.35-6.04z"></path>
                    <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.74-6.02c-2.11 1.42-4.78 2.27-7.65 2.27-5.94 0-11.09-3.96-12.91-9.28L2.56 34.78C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                Sign in with Google
            </button>
        </div>
    );
}

function CreatePage() {
    const { user, setGroup, setRoute, isLoading, setIsLoading, error, setError } = React.useContext(AppContext);
    const [groupName, setGroupName] = useState('');
    const [createdGroup, setCreatedGroup] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupName || !user) return;
        setIsLoading(true);
        setError('');
        try {
            const newGroup = await api.createGroup(groupName, user.id);
            setCreatedGroup(newGroup);
            setGroup(newGroup);
        } catch (err) {
            setError('Could not create group. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!user) {
        return <p className="text-center text-red-500">Please log in to create a group.</p>;
    }

    if (createdGroup) {
        return (
            <div className="max-w-lg mx-auto mt-10 text-center bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Group Created!</h2>
                <p className="text-gray-600 mb-2">Your group "{createdGroup.name}" is ready.</p>
                <p className="text-gray-600 mb-4">Share this pin with your team:</p>
                <div className="bg-gray-100 p-4 rounded-lg inline-block mb-6">
                    <span className="text-4xl font-mono font-bold tracking-widest text-indigo-600">{createdGroup.pin}</span>
                </div>
                <button
                    onClick={() => setRoute({ name: 'calendar', groupId: createdGroup.pin })}
                    className="w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
                >
                    Go to Calendar
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Create a New Group</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                    <input
                        type="text"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., CS 240 Project Team"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                >
                    {isLoading ? 'Creating...' : 'Create Group'}
                </button>
            </form>
        </div>
    );
}


function JoinPage() {
    const { user, setGroup, setRoute, isLoading, setIsLoading, error, setError } = React.useContext(AppContext);
    const [pin, setPin] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pin || !user) return;
        setIsLoading(true);
        setError('');
        try {
            const joinedGroup = await api.joinGroup(pin, user.id);
            setGroup(joinedGroup);
            setRoute({ name: 'calendar', groupId: joinedGroup.pin });
        } catch (err) {
            setError(err.message || 'Invalid PIN. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!user) {
        return <p className="text-center text-red-500">Please log in to join a group.</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Join an Existing Group</h2>
            <div className="flex justify-center gap-4 mb-6">
                <button onClick={() => setRoute({ name: 'create' })} className="text-indigo-600 hover:underline">
                    or Create a Group
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">Enter 6-Digit PIN</label>
                    <input
                        type="text"
                        id="pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full text-center text-2xl font-mono tracking-widest px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="123456"
                        maxLength="6"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <button
                    type="submit"
                    disabled={isLoading || pin.length !== 6}
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                >
                    {isLoading ? 'Joining...' : 'Join Group'}
                </button>
            </form>
        </div>
    );
}

// --- Calendar Page & Sub-components ---

const EVENT_TYPES = {
    class: { label: 'Class/Lecture', color: 'bg-red-400', darkColor: 'bg-red-500' },
    work: { label: 'Work/Meeting', color: 'bg-blue-400', darkColor: 'bg-blue-500' },
    misc: { label: 'Social/Misc', color: 'bg-green-400', darkColor: 'bg-green-500' },
};
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 17 }, (_, i) => i + 7); // 7am to 11pm (23:00)

function CalendarPage({ groupId }) {
    const { user } = React.useContext(AppContext);
    const [activeTab, setActiveTab] = useState('my-schedule');
    const [myEvents, setMyEvents] = useState([]);
    const [teamData, setTeamData] = useState({ events: [], members: [] });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            api.getUserEvents(user.id, groupId).then(setMyEvents);
        }
    }, [user, groupId]);

    useEffect(() => {
        if (activeTab === 'team-schedule') {
            api.getTeamEvents(groupId).then(setTeamData);
        }
    }, [activeTab, groupId]);

    const handleSave = async (newEvents) => {
        setIsSaving(true);
        const savedEvents = await api.saveUserEvents(user.id, groupId, newEvents);
        setMyEvents(savedEvents);
        setIsSaving(false);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Group: {MOCK_DB.groups[groupId]?.name || '...'}</h2>
                        <p className="text-sm text-gray-500">PIN: {groupId}</p>
                    </div>
                    <div className="flex border border-gray-200 rounded-md overflow-hidden mb-6">
                        <button 
                            onClick={() => setActiveTab('my-schedule')}
                            className={`flex-1 p-2 text-sm font-medium focus:outline-none ${activeTab === 'my-schedule' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
                        >
                            My Schedule
                        </button>
                        <button 
                            onClick={() => setActiveTab('team-schedule')}
                            className={`flex-1 p-2 text-sm font-medium focus:outline-none ${activeTab === 'team-schedule' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'}`}
                        >
                            Team Schedule
                        </button>
                    </div>
                    {activeTab === 'my-schedule' && (
                        <DraggableEventsSidebar isSaving={isSaving} />
                    )}
                     {activeTab === 'team-schedule' && teamData.members.length > 0 && (
                        <TeamMembersList members={teamData.members} />
                    )}
                </div>
            </div>
            <div className="flex-1">
                {activeTab === 'my-schedule' && (
                    <PersonalCalendar initialEvents={myEvents} onSave={handleSave} />
                )}
                {activeTab === 'team-schedule' && (
                    <TeamCalendar teamData={teamData} />
                )}
            </div>
        </div>
    );
}

function DraggableEventsSidebar({ isSaving }) {
    const handleDragStart = (e, eventType) => {
        e.dataTransfer.setData('application/json', JSON.stringify({ type: eventType, duration: 2 }));
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-3">Commitments</h3>
            <p className="text-sm text-gray-600 mb-4">Drag these blocks onto your calendar. You can resize them later.</p>
            <div className="space-y-3">
                {Object.entries(EVENT_TYPES).map(([key, { label, color }]) => (
                    <div
                        key={key}
                        draggable
                        onDragStart={(e) => handleDragStart(e, key)}
                        className={`p-3 rounded-md cursor-grab text-white font-semibold text-sm ${color}`}
                    >
                        {label}
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500 h-6">
                {isSaving && "Saving..."}
            </div>
        </div>
    );
}

function TeamMembersList({ members }) {
    const userColors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200'];
    return (
        <div>
            <h3 className="text-lg font-semibold mb-3">Team Members ({members.length})</h3>
            <ul className="space-y-2">
                {members.map((member, index) => (
                    <li key={member.id} className="flex items-center text-sm">
                        <span className={`w-4 h-4 rounded-full mr-2 ${userColors[index % userColors.length]}`}></span>
                        {member.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}


function PersonalCalendar({ initialEvents, onSave }) {
    const [events, setEvents] = useState(initialEvents);
    const calendarRef = useRef(null);

    // Update internal state if initialEvents prop changes
    useEffect(() => {
        setEvents(initialEvents);
    }, [initialEvents]);

    const findEvent = (day, hour) => events.find(e => e.day === day && hour >= e.start && hour < e.end);

    const handleDrop = (e) => {
        e.preventDefault();
        const target = e.target.closest('[data-day][data-hour]');
        if (!target) return;

        const { day, hour } = target.dataset;
        const start = parseInt(hour, 10);
        
        // Prevent dropping on existing events
        if (findEvent(day, start)) {
            return;
        }

        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        const newEvent = {
            id: `evt-${Date.now()}`,
            type: data.type,
            day,
            start: start,
            end: start + data.duration,
        };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        onSave(updatedEvents);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const removeEvent = (eventId) => {
        const updatedEvents = events.filter(e => e.id !== eventId);
        setEvents(updatedEvents);
        onSave(updatedEvents);
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow-md" ref={calendarRef}>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <div className="text-sm text-right"></div>
                <div className="grid grid-cols-7 gap-px">
                    {DAYS.map(day => (
                        <div key={day} className="text-center font-semibold text-sm py-2">{day}</div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2" onDragOver={handleDragOver} onDrop={handleDrop}>
                {/* Hour Labels */}
                <div className="text-xs text-right text-gray-500">
                    {HOURS.map(hour => (
                        <div key={hour} className="h-12 flex items-start justify-end pr-2" style={{ gridRow: hour - 6 }}>
                           {hour > 12 ? `${hour-12}p` : `${hour}a`}
                        </div>
                    ))}
                </div>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 grid-rows-[repeat(17,_minmax(0,_1fr))] gap-px relative bg-gray-200 rounded-md overflow-hidden">
                    {DAYS.map(day => (
                        <div key={day} className="relative" style={{ gridColumn: DAYS.indexOf(day) + 1 }}>
                            {HOURS.map(hour => (
                                <div
                                    key={`${day}-${hour}`}
                                    data-day={day}
                                    data-hour={hour}
                                    className="h-12 border-t border-r border-gray-200 bg-white"
                                    style={{ gridRow: hour - 6 }}
                                ></div>
                            ))}
                        </div>
                    ))}
                     {/* Render Events */}
                     {events.map(event => {
                         const {label, color} = EVENT_TYPES[event.type];
                         return (
                            <div
                                key={event.id}
                                className={`${color} absolute w-full p-1 rounded-md text-white text-xs font-medium flex flex-col justify-between`}
                                style={{
                                    gridColumn: DAYS.indexOf(event.day) + 1,
                                    gridRowStart: event.start - 6,
                                    gridRowEnd: event.end - 6,
                                }}
                            >
                                <span>{label}</span>
                                <button onClick={() => removeEvent(event.id)} className="self-end text-white hover:text-red-900 text-xs w-4 h-4 rounded-full bg-black bg-opacity-20 flex items-center justify-center">
                                    &times;
                                </button>
                            </div>
                         );
                     })}
                </div>
            </div>
        </div>
    );
}

function TeamCalendar({ teamData }) {
    const { events, members } = teamData;
    const userCount = members.length;
    
    // Memoize the heatmap calculation to prevent re-running on every render
    const heatmap = useCallback(() => {
        const grid = {}; // Key: "day-hour", Value: count
        for (const event of events) {
            for (let hour = event.start; hour < event.end; hour++) {
                const key = `${event.day}-${hour}`;
                grid[key] = (grid[key] || 0) + 1;
            }
        }
        return grid;
    }, [events]);

    const availabilityGrid = heatmap();

    const getCellColor = (day, hour) => {
        const key = `${day}-${hour}`;
        const count = availabilityGrid[key] || 0;
        if (userCount === 0) return 'bg-gray-100';

        const busyRatio = count / userCount;
        
        if (count === 0) return 'bg-green-200'; // All free
        if (busyRatio <= 0.33) return 'bg-yellow-200';
        if (busyRatio <= 0.66) return 'bg-orange-300';
        return 'bg-red-400'; // Most busy
    };
    
    if (!events.length || !members.length) {
        return (
            <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <p>Loading team data or no members yet...</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Team Availability Heatmap</h2>
            <div className="flex justify-end items-center space-x-4 mb-4 text-xs">
                <span>Free</span>
                <div className="w-5 h-5 rounded bg-green-200"></div>
                <div className="w-5 h-5 rounded bg-yellow-200"></div>
                <div className="w-5 h-5 rounded bg-orange-300"></div>
                <div className="w-5 h-5 rounded bg-red-400"></div>
                <span>Busy</span>
            </div>
             <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <div></div>
                <div className="grid grid-cols-7 gap-px">
                    {DAYS.map(day => (
                        <div key={day} className="text-center font-semibold text-sm py-2">{day}</div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-2">
                {/* Hour Labels */}
                <div className="text-xs text-right text-gray-500">
                     {HOURS.map(hour => (
                        <div key={hour} className="h-10 flex items-center justify-end pr-2">
                           {hour > 12 ? `${hour-12}p` : `${hour}a`}
                        </div>
                    ))}
                </div>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 grid-rows-[repeat(17,_minmax(0,_1fr))] gap-px bg-gray-200 rounded-md overflow-hidden">
                     {DAYS.map(day => (
                        <div key={day} className="relative grid grid-rows-[repeat(17,_minmax(0,_1fr))] gap-px">
                             {HOURS.map(hour => (
                                 <div
                                    key={`${day}-${hour}`}
                                    className={`h-10 ${getCellColor(day, hour)} flex items-center justify-center text-xs text-gray-700`}
                                    style={{ gridRow: hour - 6 }}
                                    title={`${availabilityGrid[`${day}-${hour}`] || 0} / ${userCount} busy`}
                                >
                                    {availabilityGrid[`${day}-${hour}`] > 0 ? `${availabilityGrid[`${day}-${hour}`]}` : ''}
                                </div>
                            ))}
                        </div>
                     ))}
                </div>
            </div>
        </div>
    );
}
