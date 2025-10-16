import React, { useState } from 'react';

import Button from '@/components/Button';

const EventCalendar = ({ events, onEventClick, selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const getEventsForDate = (date) => {
    const dateString = date?.toISOString()?.split('T')?.[0];
    return events?.filter(event => event?.date === dateString);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days?.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days?.push(day);
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
        </h3>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
            iconName="ChevronLeft"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
            iconName="ChevronRight"
          />
        </div>
      </div>
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames?.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days?.map((day, index) => {
          if (!day) {
            return <div key={index} className="p-2 h-20"></div>;
          }

          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const dayEvents = getEventsForDate(date);
          const isCurrentDay = isToday(date);
          const isSelectedDay = isSelected(date);

          return (
            <div
              key={day}
              className={`p-1 h-20 border border-border rounded cursor-pointer transition-smooth hover:bg-muted ${
                isCurrentDay ? 'bg-primary/10 border-primary' : ''
              } ${isSelectedDay ? 'bg-secondary/10 border-secondary' : ''}`}
              onClick={() => onDateSelect(date)}
            >
              <div className={`text-sm font-medium mb-1 ${
                isCurrentDay ? 'text-primary' : 'text-foreground'
              }`}>
                {day}
              </div>
              {/* Event Indicators */}
              <div className="space-y-1">
                {dayEvents?.slice(0, 2)?.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="text-xs px-1 py-0.5 bg-primary text-primary-foreground rounded truncate cursor-pointer hover:bg-primary/80"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onEventClick(event);
                    }}
                    title={event?.title}
                  >
                    {event?.title}
                  </div>
                ))}
                {dayEvents?.length > 2 && (
                  <div className="text-xs text-muted-foreground px-1">
                    +{dayEvents?.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span>Events</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-primary rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border-2 border-secondary rounded"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;