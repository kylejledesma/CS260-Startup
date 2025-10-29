import React from 'react';
import { formatDate } from '../../utils/dateHelpers';
import { getHeatmapColor } from '../../utils/heatmapHelpers';

/**
 * Renders the main grid for the "Team View" heatmap.
 */
export const TeamHeatmap = ({ weekDays, timeSlots, heatmapData }) => {
  return (
    <div 
      className="grid bg-gray-200 border border-gray-200 rounded-lg overflow-hidden select-none"
      style={{ 
        gridTemplateColumns: '80px repeat(7, 1fr)',
        gridTemplateRows: `auto repeat(${timeSlots.length}, minmax(0, 1fr))` 
      }}
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
          const cellClass = `border-t border-l border-gray-200 ${getHeatmapColor(heatmapData, day, time)} transition-colors`;
          
          return (
            <div
              key={`${dayStr}-${time}`}
              className={cellClass}
              style={{
                gridRow: timeIndex + 2,
                gridColumn: dayIndex + 2,
                minHeight: '2.5rem',
              }}
              data-day={dayStr}
              data-time={time}
            >
              {/* Cell content */}
            </div>
          );
        })
      ))}
    </div>
  );
};
