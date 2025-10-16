import React from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';

const MentorshipActivityCard = ({ 
  pendingRequests = 0, 
  activeRelationships = 0, 
  totalMentored = 0,
  impactScore = 0 
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">Mentorship Activity</h3>
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={20} className="text-primary" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent mb-1">{pendingRequests}</div>
          <div className="text-xs text-muted-foreground font-caption">Pending Requests</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary mb-1">{activeRelationships}</div>
          <div className="text-xs text-muted-foreground font-caption">Active Mentoring</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">{totalMentored}</div>
          <div className="text-xs text-muted-foreground font-caption">Total Mentored</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">{impactScore}</div>
          <div className="text-xs text-muted-foreground font-caption">Impact Score</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/mentors')}>
          View All Mentorships
        </Button>
      </div>
    </div>
  );
};

export default MentorshipActivityCard;