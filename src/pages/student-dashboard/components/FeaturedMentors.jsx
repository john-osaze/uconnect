import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const FeaturedMentors = () => {
  const navigate = useNavigate();
  const featuredMentors = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      graduationYear: "2018",
      department: "Computer Science",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      expertise: ["React", "Machine Learning", "Career Growth"],
      menteeCount: 12,
      rating: 4.9,
      isAvailable: true
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      graduationYear: "2016",
      department: "Business Administration",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      expertise: ["Product Strategy", "Leadership", "Tech Industry"],
      menteeCount: 8,
      rating: 4.8,
      isAvailable: true
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "UX Design Lead",
      company: "Adobe",
      location: "San Francisco, CA",
      graduationYear: "2019",
      department: "Design",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      expertise: ["UX Design", "Design Systems", "User Research"],
      menteeCount: 15,
      rating: 4.9,
      isAvailable: false
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Featured Mentors
        </h2>
        <Link 
          to="/mentors"
          className="text-sm text-primary hover:text-primary/80 transition-colors font-caption"
        >
          View all mentors
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredMentors?.map((mentor) => (
          <div
            key={mentor?.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200"
          >
            <div className="flex items-start space-x-3 mb-4">
              <div className="relative">
                <Image
                  src={mentor?.avatar}
                  alt={mentor?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {mentor?.isAvailable && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {mentor?.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {mentor?.role}
                </p>
                <p className="text-xs text-muted-foreground font-caption">
                  {mentor?.company} • Class of {mentor?.graduationYear}
                </p>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-xs text-muted-foreground font-caption">
                  {mentor?.rating}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {mentor?.expertise?.slice(0, 3)?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground font-caption">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{mentor?.menteeCount} mentees</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span>{mentor?.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={mentor?.isAvailable ? "default" : "outline"}
                size="sm"
                disabled={!mentor?.isAvailable}
                className="flex-1"
                iconName="UserPlus"
                iconPosition="left"
                iconSize={14}
              >
                {mentor?.isAvailable ? "Request Mentorship" : "Unavailable"}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageCircle"
                iconSize={14}
                onClick={() => navigate('/chat')}
              >
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMentors;