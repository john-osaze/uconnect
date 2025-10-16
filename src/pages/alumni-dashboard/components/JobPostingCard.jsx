import React from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/Button';

const JobPostingCard = ({ job, onEdit, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'expired':
        return 'text-error bg-error/10';
      case 'draft':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground mb-1 truncate">{job?.title}</h4>
          <p className="text-sm text-muted-foreground font-caption">{job?.company}</p>
        </div>
        <span className={`px-2 py-1 rounded-md text-xs font-medium font-caption ${getStatusColor(job?.status)}`}>
          {job?.status?.charAt(0)?.toUpperCase() + job?.status?.slice(1)}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span className="font-caption">{job?.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span className="font-caption">Expires: {formatDate(job?.expiryDate)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={14} />
          <span className="font-caption">{job?.applicationCount} applications</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onView(job?.id)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onEdit(job?.id)}
          iconName="Edit"
          iconPosition="left"
          className="flex-1"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default JobPostingCard;