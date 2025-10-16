import React from 'react';
import Icon from '@/components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const getBadgeIcon = (type) => {
    switch (type) {
      case 'mentor':
        return 'Award';
      case 'recruiter':
        return 'Briefcase';
      case 'community':
        return 'Users';
      case 'speaker':
        return 'Mic';
      default:
        return 'Star';
    }
  };

  const getBadgeColor = (level) => {
    switch (level) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'silver':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'bronze':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  if (!achievements || achievements?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="text-center">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Award" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading font-medium text-foreground mb-2">Start Your Journey</h3>
          <p className="text-sm text-muted-foreground">
            Earn badges by mentoring students and contributing to the community
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">Achievement Badges</h3>
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Award" size={20} className="text-warning" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
        {achievements?.map((achievement) => (
          <div 
            key={achievement?.id}
            className={`border rounded-lg p-3 text-center transition-smooth hover:shadow-elevation-1 ${getBadgeColor(achievement?.level)}`}
          >
            <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
              <Icon name={getBadgeIcon(achievement?.type)} size={20} />
            </div>
            <h4 className="font-medium text-xs mb-1">{achievement?.title}</h4>
            <p className="text-[10px] opacity-80 font-caption">{achievement?.description}</p>
            {achievement?.progress && (
              <div className="mt-2">
                <div className="w-full bg-white/30 rounded-full h-1">
                  <div 
                    className="bg-current h-1 rounded-full transition-smooth"
                    style={{ width: `${achievement?.progress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] mt-1 opacity-80 font-caption">
                  {achievement?.progress}% Complete
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-caption">
            Keep contributing to unlock more badges!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;