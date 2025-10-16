import React from 'react';
import Icon from '@/components/AppIcon';

const CategoryTabs = ({ activeCategory, onCategoryChange, eventCounts }) => {
  const categories = [
    {
      id: 'all',
      label: 'All Events',
      icon: 'Calendar',
      count: eventCounts?.all || 0
    },
    {
      id: 'career',
      label: 'Career',
      icon: 'Briefcase',
      count: eventCounts?.career || 0
    },
    {
      id: 'alumni-only',
      label: 'Alumni Only',
      icon: 'GraduationCap',
      count: eventCounts?.alumniOnly || 0
    },
    {
      id: 'departmental',
      label: 'Departmental',
      icon: 'Building2',
      count: eventCounts?.departmental || 0
    },
    {
      id: 'social',
      label: 'Social',
      icon: 'Users',
      count: eventCounts?.social || 0
    }
  ];

  return (
    <div className="border-b border-border bg-background sticky top-16 z-30">
      <div className="flex overflow-x-auto scrollbar-hide">
        {categories?.map((category) => {
          const isActive = activeCategory === category?.id;
          
          return (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
                isActive
                  ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
              {category?.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {category?.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;