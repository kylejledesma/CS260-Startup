// --- HELPER FUNCTIONS ---

/**
 * Generates time slots for the day in 30-minute intervals.
 */
export const generateTimeSlots = () => {
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
export const getWeekDays = (startDate) => {
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
export const parseDateTime = (dateTimeStr) => new Date(dateTimeStr);

/**
 * Formats a Date object into a 'HH:mm' string.
 * @param {Date} date
 * @returns {string}
 */
export const formatTime = (date) => {
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
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Combines a date and a time string into a new Date object.
 * @param {Date} date - The date part.
 * @param {string} time - The time part (e.g., "09:00").
 * @returns {Date}
 */
export const combineDateAndTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const newDate = new Date(date);
  newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return newDate;
};
