import { parseDateTime, formatDate, formatTime } from './dateHelpers';

/**
 * Calculates the heatmap data for the team view.
 * Returns a Map where key is 'YYYY-MM-DD:HH:mm' and value is the count.
 */
export const calculateHeatmapData = (teamEvents) => {
  const data = new Map();
  const slotDuration = 30; // 30 minutes

  for (const event of teamEvents) {
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
};

/**
 * Gets the heatmap color for a specific cell in "Team View".
 */
export const getHeatmapColor = (heatmapData, day, time) => {
  const key = `${formatDate(day)}:${time}`;
  const count = heatmapData.get(key) || 0;
  
  // Tailwind shades for the 'indigo' theme
  if (count === 0) return 'bg-white';
  if (count === 1) return 'bg-indigo-100';
  if (count === 2) return 'bg-indigo-300';
  if (count === 3) return 'bg-indigo-500';
  return 'bg-indigo-700'; // 4+
};
