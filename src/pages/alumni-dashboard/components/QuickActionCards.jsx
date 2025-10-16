import React from 'react';

import Icon from '@/components/AppIcon';
import Button from '@/components/Button';

const QuickActionCards = () => {
  const quickActions = [
    {
      id: 'post-job',
      title: 'Post Job Opportunity',
      description: 'Share career opportunities with students',
      icon: 'Briefcase',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      action: () => console.log('Post job clicked')
    },
    {
      id: 'offer-mentorship',
      title: 'Offer Mentorship',
      description: 'Guide students in their career journey',
      icon: 'UserPlus',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      action: () => console.log('Offer mentorship clicked')
    },
    {
      id: 'create-event',
      title: 'Create Event',
      description: 'Organize alumni networking events',
      icon: 'Calendar',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      action: () => console.log('Create event clicked')
    },
    {
      id: 'contribute',
      title: 'Contribute',
      description: 'Contribute financially to the committee',
      icon: 'HandCoins',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      action: () => console.log('Post job clicked')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quickActions?.map((action) => (
        <div key={action?.id} className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon name={action?.icon} size={24} className={action?.textColor} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-medium text-foreground mb-1">{action?.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{action?.description}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={action?.action}
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActionCards;