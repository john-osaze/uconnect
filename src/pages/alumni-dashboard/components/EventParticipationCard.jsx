import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const EventParticipationCard = ({ event, onRSVP, onViewDetails }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'homecoming':
        return 'text-accent bg-accent/10';
      case 'networking':
        return 'text-secondary bg-secondary/10';
      case 'symposium':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1">
      <div className="relative h-32 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-md text-xs font-medium font-caption ${getEventTypeColor(event?.type)}`}>
            {event?.type?.charAt(0)?.toUpperCase() + event?.type?.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-md px-2 py-1">
          <div className="text-xs font-medium text-foreground text-center">
            <div className="font-caption">{formatDate(event?.date)?.split(' ')?.[1]}</div>
            <div className="text-[10px] text-muted-foreground font-caption">
              {formatDate(event?.date)?.split(' ')?.[0]}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-medium text-foreground mb-2 line-clamp-2">{event?.title}</h4>
        
        <div className="space-y-1 mb-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span className="font-caption">{formatTime(event?.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span className="font-caption truncate">{event?.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={14} />
            <span className="font-caption">{event?.attendeeCount} attending</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={event?.isRSVPed ? "default" : "outline"}
            size="sm" 
            onClick={() => onRSVP(event?.id)}
            iconName={event?.isRSVPed ? "Check" : "Calendar"}
            iconPosition="left"
            className="flex-1"
          >
            {event?.isRSVPed ? 'Going' : 'RSVP'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewDetails(event?.id)}
            iconName="ExternalLink"
            iconPosition="left"
            className="flex-1"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventParticipationCard;