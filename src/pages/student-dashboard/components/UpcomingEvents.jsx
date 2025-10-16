import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const UpcomingEvents = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Career Fair 2025",
      date: "2025-09-05",
      time: "10:00 AM - 4:00 PM",
      location: "SUG Building",
      type: "Career Fair",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?w=400&h=200&fit=crop",
      attendees: 245,
      isRSVPed: false,
      organizer: "Career Services",
      description: "Connect with top tech companies and explore internship and full-time opportunities.",
      tags: ["Technology", "Networking", "Career"]
    },
    {
      id: 2,
      title: "Alumni Networking Mixer",
      date: "2025-09-08",
      time: "6:00 PM - 9:00 PM",
      location: "Alumni Center",
      type: "Networking",
      image: "https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?w=400&h=200&fit=crop",
      attendees: 89,
      isRSVPed: true,
      organizer: "Alumni Association",
      description: "Meet successful alumni from various industries and build meaningful connections.",
      tags: ["Alumni", "Networking", "Professional"]
    },
    {
      id: 3,
      title: "Computer Science Symposium",
      date: "2025-09-12",
      time: "9:00 AM - 5:00 PM",
      location: "Engineering Building",
      type: "Academic",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
      attendees: 156,
      isRSVPed: false,
      organizer: "CS Department",
      description: "Latest research presentations and industry insights from leading professionals.",
      tags: ["Computer Science", "Research", "Academic"]
    }
  ];

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 7) return `In ${diffDays} days`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Upcoming Events
        </h2>
        <Link 
          to="/events"
          className="text-sm text-primary hover:text-primary/80 transition-colors font-caption"
        >
          View all events
        </Link>
      </div>
      <div className="space-y-4">
        {upcomingEvents?.map((event) => (
          <div
            key={event?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200"
          >
            <div className="">
              <div className="w-100 h-100 bg-muted">
                <Image
                  src={event?.image}
                  alt={event?.title}
                  className="w-100 h-100"
                />
              </div>
              
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-foreground truncate">
                        {event?.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full font-caption">
                        {event?.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {event?.description}
                    </p>
                  </div>
                  
                  {event?.isRSVPed && (
                    <div className="ml-2">
                      <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={14} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {event?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-caption">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{formatEventDate(event?.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{event?.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-caption">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{event?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{event?.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant={event?.isRSVPed ? "outline" : "default"}
                    size="sm"
                    iconName={event?.isRSVPed ? "Check" : "Calendar"}
                    iconPosition="left"
                    iconSize={14}
                  >
                    {event?.isRSVPed ? "RSVP'd" : "RSVP"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;