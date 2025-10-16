import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';


const QuickActions = () => {
  const quickActions = [
    {
      id: 'find-mentors',
      title: 'Find Mentors',
      description: 'Connect with alumni in your field',
      icon: 'Users',
      color: 'bg-primary',
      path: '/mentors',
      count: '24 available'
    },
    {
      id: 'browse-jobs',
      title: 'Browse Jobs',
      description: 'Discover career opportunities',
      icon: 'Briefcase',
      color: 'bg-warning',
      path: '/jobs',
      count: '12 new today'
    },
    {
      id: 'join-associations',
      title: 'Join Communities',
      description: 'Connect with your department',
      icon: 'Building',
      color: 'bg-error',
      path: '/associations',
      count: '8 active groups'
    },
    {
      id: 'upcoming-events',
      title: 'Events',
      description: 'Career fairs and networking',
      icon: 'Calendar',
      color: 'bg-success',
      path: '/events',
      count: '3 this week'
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <Link
            key={action?.id}
            to={action?.path}
            className="group block"
          >
            <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200 group-hover:border-primary/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={action?.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                    {action?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {action?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-caption">
                  {action?.count}
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={14} 
                  className="text-muted-foreground group-hover:text-primary transition-colors" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;