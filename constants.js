// --- MOCK DATA ---
// In a real app, this would come from your database (like Firestore)
// and be fetched in your services/api layer.

export const TEAM_MEMBERS = [
  { id: 'user-self', name: 'You', color: 'indigo' },
  { id: 'alice', name: 'Alice Johnson', color: 'pink' },
  { id: 'bob', name: 'Bob Smith', color: 'green' },
];

export const MY_EVENTS_DATA = [
  // { id: 1, title: 'My Meeting', start: '2025-09-08T09:00:00', end: '2025-09-08T10:30:00', type: 'meetings' },
  // { id: 2, title: 'CS 101 Lecture', start: '2025-09-09T11:00:00', end: '2025-09-09T12:30:00', type: 'classes' },
  // { id: 3, title: 'Study Session', start: '2025-09-10T14:00:00', end: '2025-09-10T16:00:00', type: 'homework' },
  { id: 4, title: 'Team Sync', start: '2025-09-12T10:00:00', end: '2025-09-12T11:30:00', type: 'meetings' },
];

export const TEAM_EVENTS_DATA = [
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

export const EVENT_TYPES = {
  classes: { label: 'Classes', color: 'bg-indigo-500' },
  meetings: { label: 'Meetings', color: 'bg-blue-500' },
  homework: { label: 'Homework', color: 'bg-purple-500' },
  social: { label: 'Social', color: 'bg-pink-500' },
};
