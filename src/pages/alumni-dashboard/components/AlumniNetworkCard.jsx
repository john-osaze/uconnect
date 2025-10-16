import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const AlumniNetworkCard = ({ alumni, onConnect, onMessage }) => {
  const getMutualConnections = (count) => {
    if (count === 0) return 'No mutual connections';
    if (count === 1) return '1 mutual connection';
    return `${count} mutual connections`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={alumni?.avatar}
            alt={alumni?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {alumni?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <h4 className="font-medium text-foreground truncate">{alumni?.name}</h4>
            <p className="text-sm text-muted-foreground font-caption truncate">
              {alumni?.jobTitle} at {alumni?.company}
            </p>
          </div>
          
          <div className="space-y-1 mb-3">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="GraduationCap" size={12} />
              <span className="font-caption">{alumni?.department} • Class of {alumni?.graduationYear}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="MapPin" size={12} />
              <span className="font-caption">{alumni?.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Users" size={12} />
              <span className="font-caption">{getMutualConnections(alumni?.mutualConnections)}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onConnect(alumni?.id)}
              iconName="UserPlus"
              iconPosition="left"
              className="flex-1"
            >
              Connect
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onMessage(alumni?.id)}
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniNetworkCard;