import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';

const AssociationDetailModal = ({ association, isOpen, onClose, onJoin, isJoined = false }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [notificationPreferences, setNotificationPreferences] = useState({
    events: true,
    announcements: true,
    discussions: false,
    newsletters: true
  });

  if (!isOpen || !association) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'members', label: 'Members', icon: 'Users' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
    { id: 'discussions', label: 'Discussions', icon: 'MessageCircle' }
  ];

  const mockLeadership = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Faculty Advisor",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      department: "Computer Science",
      email: "s.chen@university.edu"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "President",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      department: "Computer Science",
      year: "Senior"
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Vice President",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      department: "Computer Science",
      year: "Junior"
    }
  ];

  const mockMembers = [
    {
      id: 1,
      name: "Alex Thompson",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      year: "Sophomore",
      status: "student"
    },
    {
      id: 2,
      name: "Lisa Wang",
      avatar: "https://randomuser.me/api/portraits/women/15.jpg",
      company: "Google",
      status: "alumni",
      graduationYear: "2019"
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      year: "Graduate Student",
      status: "student"
    }
  ];

  const mockEvents = [
    {
      id: 1,
      title: "Tech Talk: AI in Healthcare",
      date: "2025-01-15",
      time: "6:00 PM",
      location: "Room 301, CS Building",
      attendees: 45,
      type: "workshop"
    },
    {
      id: 2,
      title: "Alumni Networking Night",
      date: "2025-01-22",
      time: "7:00 PM",
      location: "University Center",
      attendees: 78,
      type: "networking"
    }
  ];

  const mockDiscussions = [
    {
      id: 1,
      title: "Internship Opportunities for Summer 2025",
      author: "Michael Rodriguez",
      replies: 12,
      lastActivity: "2 hours ago",
      isPinned: true
    },
    {
      id: 2,
      title: "Study Group for Advanced Algorithms",
      author: "Emily Johnson",
      replies: 8,
      lastActivity: "5 hours ago",
      isPinned: false
    }
  ];

  const handleJoinAssociation = () => {
    onJoin(association, notificationPreferences);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3">About</h3>
        <p className="text-muted-foreground leading-relaxed">
          {association?.description}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{association?.memberCount}</div>
          <div className="text-sm text-muted-foreground font-caption">Members</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{association?.upcomingEvents}</div>
          <div className="text-sm text-muted-foreground font-caption">Events</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{association?.alumniRatio}%</div>
          <div className="text-sm text-muted-foreground font-caption">Alumni</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground capitalize">{association?.activityLevel}</div>
          <div className="text-sm text-muted-foreground font-caption">Activity</div>
        </div>
      </div>

      {/* Leadership */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3">Leadership</h3>
        <div className="space-y-3">
          {mockLeadership?.map((leader) => (
            <div key={leader?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={leader?.avatar} 
                  alt={leader?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{leader?.name}</h4>
                <p className="text-sm text-muted-foreground">{leader?.role}</p>
                <p className="text-xs text-muted-foreground font-caption">
                  {leader?.department} {leader?.year && `• ${leader?.year}`}
                </p>
              </div>
              <Button variant="outline" size="sm" iconName="Mail">
                Contact
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">Members ({association?.memberCount})</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search members</span>
        </div>
      </div>
      
      <div className="grid gap-3">
        {mockMembers?.map((member) => (
          <div key={member?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src={member?.avatar} 
                alt={member?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{member?.name}</h4>
              <p className="text-sm text-muted-foreground">
                {member?.status === 'alumni' ? 
                  `${member?.company} • Class of ${member?.graduationYear}` : 
                  member?.year
                }
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="MessageCircle">
                Message
              </Button>
              <Button variant="outline" size="sm" iconName="UserPlus">
                Connect
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold text-foreground">Upcoming Events</h3>
      
      <div className="space-y-3">
        {mockEvents?.map((event) => (
          <div key={event?.id} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-foreground">{event?.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                event?.type === 'workshop' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
              }`}>
                {event?.type}
              </span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} />
                <span>{event?.date} at {event?.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} />
                <span>{event?.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={14} />
                <span>{event?.attendees} attending</span>
              </div>
            </div>
            <div className="mt-3">
              <Button variant="outline" size="sm" fullWidth>
                RSVP
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">Recent Discussions</h3>
        <Button variant="outline" size="sm" iconName="Plus">
          New Topic
        </Button>
      </div>
      
      <div className="space-y-3">
        {mockDiscussions?.map((discussion) => (
          <div key={discussion?.id} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start space-x-3">
              {discussion?.isPinned && (
                <Icon name="Pin" size={16} className="text-accent mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{discussion?.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>by {discussion?.author}</span>
                  <span>{discussion?.replies} replies</span>
                  <span>{discussion?.lastActivity}</span>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {association?.logo ? (
                <Image 
                  src={association?.logo} 
                  alt={`${association?.name} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="GraduationCap" size={24} className="text-muted-foreground" />
              )}
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground">{association?.name}</h2>
              <p className="text-muted-foreground">{association?.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-smooth"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setSelectedTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-smooth ${
                  selectedTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {selectedTab === 'overview' && renderOverview()}
          {selectedTab === 'members' && renderMembers()}
          {selectedTab === 'events' && renderEvents()}
          {selectedTab === 'discussions' && renderDiscussions()}
        </div>

        {/* Footer */}
        {!isJoined && (
          <div className="p-6 border-t border-border bg-muted/30">
            <div className="mb-4">
              <h4 className="font-medium text-foreground mb-3">Notification Preferences</h4>
              <div className="grid grid-cols-2 gap-3">
                <Checkbox
                  label="Event notifications"
                  checked={notificationPreferences?.events}
                  onChange={(e) => setNotificationPreferences(prev => ({
                    ...prev,
                    events: e?.target?.checked
                  }))}
                />
                <Checkbox
                  label="Announcements"
                  checked={notificationPreferences?.announcements}
                  onChange={(e) => setNotificationPreferences(prev => ({
                    ...prev,
                    announcements: e?.target?.checked
                  }))}
                />
                <Checkbox
                  label="Discussion updates"
                  checked={notificationPreferences?.discussions}
                  onChange={(e) => setNotificationPreferences(prev => ({
                    ...prev,
                    discussions: e?.target?.checked
                  }))}
                />
                <Checkbox
                  label="Newsletters"
                  checked={notificationPreferences?.newsletters}
                  onChange={(e) => setNotificationPreferences(prev => ({
                    ...prev,
                    newsletters: e?.target?.checked
                  }))}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="default"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                onClick={handleJoinAssociation}
              >
                Join Association
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssociationDetailModal;