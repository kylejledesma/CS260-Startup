import { useState, useMemo } from 'react';
import { getWeekDays } from '../utils/dateHelpers';

const STARTING_DATE = new Date('2025-09-08T00:00:00');

export const useCalendarNav = (initialDate = STARTING_DATE) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const handleWeekChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return {
    currentDate,
    weekDays,
    handleWeekChange,
  };
};
