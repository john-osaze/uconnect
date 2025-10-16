import React from 'react';

import Image from '@/components/AppImage';
import Button from '@/components/Button';

const StudentRequestCard = ({ 
  student,
  onAccept,
  onDecline 
}) => {
  const timeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={student?.avatar}
            alt={student?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-card"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground">{student?.name}</h4>
              <p className="text-sm text-muted-foreground font-caption">
                {student?.department} • {student?.year}
              </p>
            </div>
            <span className="text-xs text-muted-foreground font-caption">
              {timeAgo(student?.requestDate)}
            </span>
          </div>
          
          <p className="text-sm text-foreground mb-3 line-clamp-2">
            {student?.message}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {student?.interests?.slice(0, 3)?.map((interest, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-caption"
              >
                {interest}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onAccept(student?.id)}
              className="flex-1"
            >
              Accept
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDecline(student?.id)}
              className="flex-1"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRequestCard;