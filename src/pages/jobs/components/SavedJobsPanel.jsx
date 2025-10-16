import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/Button';
import Image from '../../../components/AppImage';

const SavedJobsPanel = ({ savedJobs, onViewJob, onRemoveJob }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Today';
    if (daysLeft === 1) return 'Tomorrow';
    if (daysLeft <= 7) return `${daysLeft} days`;
    return deadlineDate?.toLocaleDateString();
  };

  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 3) return 'text-error';
    if (daysLeft <= 7) return 'text-warning';
    return 'text-muted-foreground';
  };

  if (savedJobs?.length === 0) {
    return (
      <div className="hidden lg:block bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bookmark" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading font-medium text-foreground mb-2">No Saved Jobs</h3>
          <p className="text-muted-foreground text-sm">
            Save jobs you're interested in to view them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block bg-card border border-border rounded-lg p-4 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          Saved Jobs ({savedJobs?.length})
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconSize={16}
        />
      </div>
      <div className={`space-y-3 ${!isExpanded && savedJobs?.length > 3 ? 'max-h-96 overflow-hidden' : ''}`}>
        {(isExpanded ? savedJobs : savedJobs?.slice(0, 3))?.map((job) => (
          <div
            key={job?.id}
            className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-smooth cursor-pointer"
            onClick={() => onViewJob(job)}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image 
                  src={job?.company?.logo} 
                  alt={`${job?.company?.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm leading-tight truncate">
                  {job?.title}
                </h4>
                <p className="text-muted-foreground text-xs font-caption truncate">
                  {job?.company?.name}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">
                      {job?.location}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-1 ${getDeadlineColor(job?.deadline)}`}>
                    <Icon name="Clock" size={12} />
                    <span className="text-xs font-medium">
                      {formatDeadline(job?.deadline)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  onRemoveJob(job?.id);
                }}
                className="p-1 hover:bg-muted rounded-md transition-smooth"
                aria-label="Remove from saved"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {!isExpanded && savedJobs?.length > 3 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="w-full mt-3"
        >
          View {savedJobs?.length - 3} more saved jobs
        </Button>
      )}
    </div>
  );
};

export default SavedJobsPanel;