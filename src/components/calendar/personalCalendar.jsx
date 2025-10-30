import React from 'react';
import { EVENT_TYPES } from '../../../constants.js';
import { parseDateTime, formatDate, formatTime } from '../../utils/dateHelpers';

/**
 * Renders a single event block on the calendar.
 */
const EventBlock = ({ event, weekDays }) => {
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
  
  const eventType = EVENT_TYPES[event.type] || { label: 'Event', color: 'bg-gray-500' };

  return (
    <div
      className={`rounded-lg p-2 text-white overflow-hidden shadow ${eventType.color}`}
      style={{
        gridColumn: dayIndex + 2, // +2 for time column - this keeps it in ONE day column
        gridRowStart: startRow,
        gridRowEnd: endRow, // This makes it span the full duration
        zIndex: 10,
        margin: '2px',
      }}
    >
      <p className="font-semibold text-xs">{event.title}</p>
      <p className="text-xs opacity-80">
        {formatTime(startDate)} - {formatTime(endDate)}
      </p>
    </div>
  );
};

/**
 * Renders the main grid for the "My Schedule" view.
 */
export const PersonalCalendar = ({ 
  weekDays, 
  timeSlots, 
  myEvents,
  handleMouseDown,
  handleMouseEnter,
  isCellSelected
}) => {
  return (
    <div className="relative h-full">
      <div 
        className="grid bg-gray-200 border border-gray-200 rounded-lg select-none"
        style={{ 
          gridTemplateColumns: '80px repeat(7, 1fr)',
          gridTemplateRows: `50px repeat(${timeSlots.length}, 2.5rem)` 
        }}
        onMouseDown={handleMouseDown}
      >
        {/* --- Grid Header: Time (Sticky) --- */}
        <div className="sticky top-0 z-20 row-start-1 col-start-1 bg-gray-50 p-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border-b border-gray-200">
          Time
        </div>
        
        {/* --- Grid Header: Days (Sticky) --- */}
        {weekDays.map((day, i) => (
          <div
            key={day.toISOString()}
            className="sticky top-0 z-20 row-start-1 bg-gray-50 p-2 text-center border-b border-gray-200 border-l"
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
        
        {/* --- Time Gutter Cells (Sticky Left) --- */}
        {timeSlots.map((time, i) => {
          const showLabel = time.endsWith(':00');
          return (
            <div
              key={time}
              className="sticky left-0 z-10 bg-gray-50 border-r border-gray-200 text-right pr-2 flex items-start"
              style={{ gridRow: i + 2, gridColumn: 1 }}
            >
              {showLabel && (
                <span className="text-xs text-gray-500 -mt-2">
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
            const isSelected = isCellSelected(dayStr, time);
            const cellClass = `border-t border-l border-gray-200 ${
              isSelected 
                ? ' bg-indigo-200 opacity-70' 
                : ' bg-white hover:bg-gray-50 transition-colors'
            }`;
            
            return (
              <div
                key={`${dayStr}-${time}`}
                className={cellClass}
                style={{
                  gridRow: timeIndex + 2,
                  gridColumn: dayIndex + 2,
                }}
                data-day={dayStr}
                data-time={time}
                onMouseEnter={handleMouseEnter}
              >
                {/* Cell content */}
              </div>
            );
          })
        ))}

        {/* --- Event Block Rendering --- */}
        {myEvents.map(event => (
          <EventBlock key={event.id} event={event} weekDays={weekDays} />
        ))}

      </div>
    </div>
  );
};