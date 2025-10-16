import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const AssociationUpdates = () => {
  const associationUpdates = [
    {
      id: 1,
      associationName: "Computer Science Association",
      associationLogo: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=100&h=100&fit=crop",
      updateType: "Event",
      title: "Hackathon 2025 Registration Open",
      content: "Join us for the biggest coding competition of the year! Registration is now open for all CS students. Prizes worth $10,000 to be won.",
      timestamp: "2025-08-27T14:30:00Z",
      likes: 42,
      comments: 8,
      isLiked: false,
      isMember: true,
      tags: ["Hackathon", "Competition", "Coding"]
    },
    {
      id: 2,
      associationName: "Business Student Association",
      associationLogo: "https://images.pexels.com/photos/1181401/pexels-photo-1181401.jpeg?w=100&h=100&fit=crop",
      updateType: "Announcement",
      title: "Guest Speaker: Fortune 500 CEO",
      content: "We're excited to announce that Sarah Johnson, CEO of TechCorp, will be speaking about leadership and entrepreneurship next Friday.",
      timestamp: "2025-08-26T16:45:00Z",
      likes: 67,
      comments: 15,
      isLiked: true,
      isMember: true,
      tags: ["Leadership", "CEO", "Networking"]
    },
    {
      id: 3,
      associationName: "Engineering Society",
      associationLogo: "https://images.pexels.com/photos/1181405/pexels-photo-1181405.jpeg?w=100&h=100&fit=crop",
      updateType: "Workshop",
      title: "3D Printing Workshop This Weekend",
      content: "Learn the basics of 3D printing and design. All materials provided. Limited spots available - first come, first served!",
      timestamp: "2025-08-25T10:20:00Z",
      likes: 28,
      comments: 5,
      isLiked: false,
      isMember: false,
      tags: ["3D Printing", "Workshop", "Hands-on"]
    }
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now - date;
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getUpdateTypeColor = (type) => {
    switch (type) {
      case 'Event': return 'bg-primary/10 text-primary';
      case 'Announcement': return 'bg-secondary/10 text-secondary';
      case 'Workshop': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Association Updates
        </h2>
        <Link 
          to="/associations"
          className="text-sm text-primary hover:text-primary/80 transition-colors font-caption"
        >
          View all associations
        </Link>
      </div>
      <div className="space-y-4">
        {associationUpdates?.map((update) => (
          <div
            key={update?.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={update?.associationLogo}
                  alt={`${update?.associationName} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-foreground text-sm">
                    {update?.associationName}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-caption ${getUpdateTypeColor(update?.updateType)}`}>
                    {update?.updateType}
                  </span>
                  {!update?.isMember && (
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full font-caption">
                      Not a member
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-caption">
                  {formatTimestamp(update?.timestamp)}
                </p>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="font-medium text-foreground mb-2">
                {update?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {update?.content}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {update?.tags?.map((tag, index) => (
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
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Icon 
                    name="Heart" 
                    size={16} 
                    className={update?.isLiked ? "text-error fill-current" : ""} 
                  />
                  <span className="text-sm font-caption">{update?.likes}</span>
                </button>
                
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm font-caption">{update?.comments}</span>
                </button>
                
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Share" size={16} />
                  <span className="text-sm font-caption">Share</span>
                </button>
              </div>
              
              {!update?.isMember && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                >
                  Join
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssociationUpdates;