import React from 'react';
import Icon from '@/components/AppIcon';

const WelcomeHeader = ({ userName = "Alex Johnson", profileCompletion = 75, activeMentorships = 2 }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-gradient-to-r from-[#7c3aed] to-[#FF512F] rounded-lg p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-heading font-semibold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-white/90 mb-4">
            Ready to connect with mentors and explore new opportunities?
          </p>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Profile</p>
                <p className="text-xs text-white/70">{profileCompletion}% complete</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Users" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-white/90">Mentorships</p>
                <p className="text-xs text-white/70">{activeMentorships} active</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
            <Icon name="GraduationCap" size={32} className="text-white" />
          </div>
        </div>
      </div>
      
      {profileCompletion < 100 && (
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/90">Complete your profile</span>
            <span className="text-sm text-white/70">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeHeader;