import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const AssociationCard = ({ association, onJoin, onView, isJoined = false }) => {
  const {
    id,
    name,
    department,
    logo,
    description,
    memberCount,
    recentActivity,
    upcomingEvents,
    activityLevel,
    alumniRatio
  } = association;

  const getActivityLevelColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}k`;
    }
    return count?.toString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {logo ? (
            <Image 
              src={logo} 
              alt={`${name} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="GraduationCap" size={24} className="text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-heading font-semibold text-foreground text-sm mb-1 truncate">
                {name}
              </h3>
              <p className="text-xs text-muted-foreground font-caption">
                {department}
              </p>
            </div>
            {isJoined && (
              <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full">
                <Icon name="Check" size={12} />
                <span className="text-xs font-medium">Joined</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-caption">
              {formatMemberCount(memberCount)} members
            </span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityLevelColor(activityLevel)}`}>
            {activityLevel} activity
          </div>
        </div>
        <div className="text-xs text-muted-foreground font-caption">
          {alumniRatio}% alumni
        </div>
      </div>

      {/* Recent Activity */}
      {recentActivity && (
        <div className="mb-3 p-2 bg-muted/50 rounded-md">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <p className="text-xs text-foreground font-medium">Recent Activity</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {recentActivity}
          </p>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEvents > 0 && (
        <div className="flex items-center space-x-1 mb-3">
          <Icon name="Calendar" size={14} className="text-secondary" />
          <span className="text-xs text-secondary font-medium">
            {upcomingEvents} upcoming event{upcomingEvents > 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {isJoined ? (
          <>
            <Button
              variant="default"
              size="sm"
              fullWidth
              iconName="Eye"
              iconPosition="left"
              onClick={() => onView(association)}
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              onClick={() => onView(association)}
            >
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="default"
              size="sm"
              fullWidth
              iconName="Plus"
              iconPosition="left"
              onClick={() => onJoin(association)}
            >
              Join Association
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              onClick={() => onView(association)}
            >
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AssociationCard;