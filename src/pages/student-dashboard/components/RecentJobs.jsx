import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const RecentJobs = () => {
  const recentJobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Spotify",
      location: "New York, NY",
      type: "Internship",
      salary: "$25/hour",
      deadline: "2025-09-15",
      postedDate: "2025-08-25",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
      tags: ["React", "JavaScript", "UI/UX"],
      isRemote: false,
      applicants: 45,
      isNew: true
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "Netflix",
      location: "Los Gatos, CA",
      type: "Internship",
      salary: "$30/hour",
      deadline: "2025-09-20",
      postedDate: "2025-08-24",
      logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop",
      tags: ["Python", "Machine Learning", "Analytics"],
      isRemote: true,
      applicants: 67,
      isNew: true
    },
    {
      id: 3,
      title: "Marketing Associate",
      company: "Airbnb",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$65,000/year",
      deadline: "2025-09-10",
      postedDate: "2025-08-23",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      tags: ["Digital Marketing", "Content", "Analytics"],
      isRemote: false,
      applicants: 23,
      isNew: false
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Stripe",
      location: "Remote",
      type: "Full-time",
      salary: "$120,000/year",
      deadline: "2025-09-25",
      postedDate: "2025-08-26",
      logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop",
      tags: ["Node.js", "API", "Fintech"],
      isRemote: true,
      applicants: 89,
      isNew: true
    }
  ];

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "Expired";
    if (diffDays === 1) return "1 day left";
    if (diffDays <= 7) return `${diffDays} days left`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Recent Job Opportunities
        </h2>
        <Link 
          to="/jobs"
          className="text-sm text-primary hover:text-primary/80 transition-colors font-caption"
        >
          View all jobs
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recentJobs?.map((job) => (
          <div
            key={job?.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={job?.logo}
                    alt={`${job?.company} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">
                      {job?.title}
                    </h3>
                    {job?.isNew && (
                      <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full font-caption">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job?.company}
                  </p>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground font-caption">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{job?.location}</span>
                    </div>
                    {job?.isRemote && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Wifi" size={12} />
                        <span>Remote</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-sm font-medium text-foreground">
                  {job?.salary}
                </span>
                <p className="text-xs text-muted-foreground font-caption">
                  {job?.type}
                </p>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex flex-wrap gap-1 mb-2">
                {job?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground font-caption">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{job?.applicants} applicants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span className={formatDeadline(job?.deadline)?.includes('day') ? 'text-warning' : ''}>
                    {formatDeadline(job?.deadline)}
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
                onClick={() => window.open(`https://careers.microsoft.com/`, '_blank')}
              >
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;