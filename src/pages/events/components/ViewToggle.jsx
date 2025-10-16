import React from 'react';
import Icon from '@/components/AppIcon';


const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    {
      id: 'list',
      label: 'List View',
      icon: 'List'
    },
    {
      id: 'calendar',
      label: 'Calendar View',
      icon: 'Calendar'
    }
  ];

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      {views?.map((view) => {
        const isActive = currentView === view?.id;
        
        return (
          <button
            key={view?.id}
            onClick={() => onViewChange(view?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={view?.label}
          >
            <Icon name={view?.icon} size={16} />
            <span className="hidden sm:inline">{view?.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ViewToggle;