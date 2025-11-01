import { useState } from 'react';
import { combineDateAndTime } from '../utils/dateHelpers';

const getCellData = (e) => {
  const cell = e.target.closest('[data-day][data-time]');
  if (!cell) return null;
  
  const { day, time } = cell.dataset;
  return { day, time };
};

export const useEventDrag = ({ onDragEnd }) => {
  const [dragState, setDragState] = useState({ 
    isDragging: false, 
    startCell: null, 
    endCell: null 
  });

  const handleMouseDown = (e) => {
    const cellData = getCellData(e);
    if (!cellData) return;

    setDragState({ isDragging: true, startCell: cellData, endCell: cellData });
    e.preventDefault();
  };
  
  const handleMouseEnter = (e) => {
    if (!dragState.isDragging) return;
    
    const cellData = getCellData(e);
    if (!cellData) return;
    
    // FIXED: Only allow dragging within the same day column
    if (cellData.day !== dragState.startCell.day) return;
    
    // Only update if the cell is different
    if (cellData.time !== dragState.endCell.time) {
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
    
    console.log('Combined dates:', {
      start: start.toISOString(),
      endCellTime: endCellTime.toISOString()
    });
    
    // The "end" of a cell is 30 mins after its start time
    const end = new Date(endCellTime.getTime() + 30 * 60000); 

    // Order them correctly
    const finalStart = start < end ? start : end;
    const finalEnd = start < end ? end : start;
    
    console.log('Final event times:', {
      finalStart: finalStart.toISOString(),
      finalEnd: finalEnd.toISOString()
    });
    
    // Call the callback from the parent page
    if (onDragEnd) {
      onDragEnd(finalStart, finalEnd);
    }
    
    // Reset drag state
    setDragState({ isDragging: false, startCell: null, endCell: null });
  };
  
  /**
   * Checks if a cell is currently part of the user's drag selection.
   */
  const isCellSelected = (day, time) => {
    if (!dragState.isDragging || !dragState.startCell) return false;

    const { startCell, endCell } = dragState;
    
    // FIXED: Must be the same day as where the drag started
    if (day !== startCell.day) return false;
    
    const cellTime = combineDateAndTime(new Date(day), time).getTime();
    
    const startTime = combineDateAndTime(new Date(startCell.day), startCell.time).getTime();
    const endTime = combineDateAndTime(new Date(endCell.day), endCell.time).getTime();

    const minTime = Math.min(startTime, endTime);
    const maxTime = Math.max(startTime, endTime);
    
    return cellTime >= minTime && cellTime <= maxTime;
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    isCellSelected,
  };
};