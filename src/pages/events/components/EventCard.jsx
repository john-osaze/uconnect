import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const EventCard = ({ event, onRSVP, onAddToCalendar, onShare }) => {
  const [isRSVPLoading, setIsRSVPLoading] = useState(false);

  const handleRSVP = async () => {
    setIsRSVPLoading(true);
    await onRSVP(event?.id);
    setIsRSVPLoading(false);
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'Career': 'bg-primary text-primary-foreground',
      'Alumni-only': 'bg-secondary text-secondary-foreground',
      'Departmental': 'bg-accent text-accent-foreground',
      'Social': 'bg-success text-success-foreground'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event?.type)}`}>
            {event?.type}
          </span>
        </div>
        {event?.featured && (
          <div className="absolute top-3 right-3">
            <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          </div>
        )}
      </div>
      {/* Event Content */}
      <div className="p-4">
        {/* Date and Time */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(event?.date)}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{formatTime(event?.startTime)} - {formatTime(event?.endTime)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-2">
          {event?.title}
        </h3>

        {/* Location */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
          <Icon name="MapPin" size={16} />
          <span>{event?.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event?.description}
        </p>

        {/* Organizer */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-medium">
              {event?.organizer?.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Organized by {event?.organizer}
          </span>
        </div>

        {/* RSVP Status and Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {event?.attendeeCount} attending
              </span>
            </div>
            {event?.capacity && (
              <span className="text-xs text-muted-foreground">
                / {event?.capacity} capacity
              </span>
            )}
          </div>
          {event?.isRSVPed && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Check" size={16} />
              <span className="text-sm font-medium">RSVP'd</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant={event?.isRSVPed ? "outline" : "default"}
            size="sm"
            loading={isRSVPLoading}
            onClick={handleRSVP}
            className="flex-1"
            iconName={event?.isRSVPed ? "Check" : "Calendar"}
            iconPosition="left"
          >
            {event?.isRSVPed ? "RSVP'd" : "RSVP"}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddToCalendar(event)}
            iconName="CalendarPlus"
          >
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(event)}
            iconName="Share2"
          >
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;