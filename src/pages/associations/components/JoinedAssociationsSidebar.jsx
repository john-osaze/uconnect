import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const JoinedAssociationsSidebar = ({ joinedAssociations, onViewAssociation }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  if (joinedAssociations?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Users" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-medium text-foreground mb-2">
          No Associations Yet
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Join departmental associations to connect with peers and alumni in your field.
        </p>
        <Button variant="outline" size="sm">
          Explore Associations
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-semibold text-foreground">
            My Associations
          </h2>
          <span className="text-sm text-muted-foreground font-caption">
            {joinedAssociations?.length}
          </span>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-muted/50 rounded-md">
            <div className="text-lg font-semibold text-foreground">
              {joinedAssociations?.reduce((sum, assoc) => sum + (assoc?.unreadNotifications || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Notifications
            </div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-md">
            <div className="text-lg font-semibold text-foreground">
              {joinedAssociations?.reduce((sum, assoc) => sum + (assoc?.upcomingEvents || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Events
            </div>
          </div>
        </div>
      </div>
      {/* Joined Associations List */}
      <div className="space-y-3">
        {joinedAssociations?.map((association) => (
          <div
            key={association?.id}
            className="bg-card border border-border rounded-lg p-3 hover:shadow-elevation-1 transition-smooth cursor-pointer"
            onClick={() => onViewAssociation(association)}
          >
            {/* Association Header */}
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                {association?.logo ? (
                  <Image 
                    src={association?.logo} 
                    alt={`${association?.name} logo`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="GraduationCap" size={16} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm truncate">
                  {association?.name}
                </h3>
                <p className="text-xs text-muted-foreground font-caption">
                  {association?.department}
                </p>
              </div>
              {association?.unreadNotifications > 0 && (
                <div className="w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {association?.unreadNotifications > 9 ? '9+' : association?.unreadNotifications}
                  </span>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            {association?.recentActivity && (
              <div className="mb-2">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {association?.recentActivity}
                </p>
                <p className="text-xs text-muted-foreground font-caption mt-1">
                  {formatTimeAgo(association?.lastActivityTime)}
                </p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {association?.upcomingEvents > 0 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} className="text-secondary" />
                    <span className="text-xs text-secondary font-medium">
                      {association?.upcomingEvents}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-caption">
                    {association?.memberCount}
                  </span>
                </div>
              </div>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      <Button
        variant="outline"
        size="sm"
        fullWidth
        iconName="ArrowRight"
        iconPosition="right"
      >
        View All Associations
      </Button>
    </div>
  );
};

export default JoinedAssociationsSidebar;