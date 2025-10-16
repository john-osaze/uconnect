import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const JobCard = ({ job, onSave, onApply, onViewDetails, isSaved = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  const handleSave = () => {
    setIsBookmarked(!isBookmarked);
    onSave(job?.id, !isBookmarked);
  };

  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 3) return 'text-error';
    if (daysLeft <= 7) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Today';
    if (daysLeft === 1) return 'Tomorrow';
    if (daysLeft <= 7) return `${daysLeft} days left`;
    return deadlineDate?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-smooth cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <Image 
              src={job?.company?.logo} 
              alt={`${job?.company?.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-lg leading-tight">
              {job?.title}
            </h3>
            <p className="text-muted-foreground font-caption">{job?.company?.name}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="p-2 hover:bg-muted rounded-md transition-smooth"
          aria-label={isBookmarked ? 'Remove from saved' : 'Save job'}
        >
          <Icon 
            name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} 
            size={20} 
            className={isBookmarked ? 'text-primary' : 'text-muted-foreground'} 
          />
        </button>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span>{job?.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span className="capitalize">{job?.type}</span>
          </div>
          {job?.experienceLevel && (
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={16} />
              <span>{job?.experienceLevel}</span>
            </div>
          )}
        </div>

        {job?.salaryRange && (
          <div className="flex items-center space-x-1 text-sm text-foreground">
            <Icon name="DollarSign" size={16} />
            <span className="font-medium">{job?.salaryRange}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              Posted {new Date(job.postedDate)?.toLocaleDateString()}
            </span>
          </div>
          <div className={`flex items-center space-x-1 ${getDeadlineColor(job?.deadline)}`}>
            <Icon name="AlertCircle" size={16} />
            <span className="font-medium">{formatDeadline(job?.deadline)}</span>
          </div>
        </div>
      </div>
      {job?.tags && job?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-caption"
            >
              {tag}
            </span>
          ))}
          {job?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-caption">
              +{job?.tags?.length - 3} more
            </span>
          )}
        </div>
      )}
      {job?.postedBy && job?.postedBy?.type === 'alumni' && (
        <div className="flex items-center space-x-2 p-2 bg-secondary/10 rounded-md mb-4">
          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
            <Icon name="GraduationCap" size={14} className="text-secondary-foreground" />
          </div>
          <span className="text-sm text-secondary font-medium">
            Posted by {job?.postedBy?.name} (Alumni)
          </span>
        </div>
      )}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(job)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onApply(job)}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={16}
          className="flex-1"
        >
          Quick Apply
        </Button>
      </div>
    </div>
  );
};

export default JobCard;