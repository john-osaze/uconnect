import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContextualHeader from '@/components/ContextualHeader';
import BottomTabNavigation from '@/components/BottomTabNavigation';
import NavigationBreadcrumb from '@/components/NavigationBreadcrumb';

import Button from '@/components/Button';

// Import all components
import MentorshipActivityCard from './components/MentorshipActivityCard';
import QuickActionCards from './components/QuickActionCards';
import StudentRequestCard from './components/StudentRequestCard';
import JobPostingCard from './components/JobPostingCard';
import AlumniNetworkCard from './components/AlumniNetworkCard';
import EventParticipationCard from './components/EventParticipationCard';
import AchievementBadges from './components/AchievementBadges';

const AlumniDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for mentorship activity
  const mentorshipData = {
    pendingRequests: 5,
    activeRelationships: 12,
    totalMentored: 47,
    impactScore: 94
  };

  // Mock data for student requests
  const studentRequests = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      department: "Computer Science",
      year: "Junior",
      message: "Hi! I\'m interested in pursuing a career in software engineering and would love to learn from your experience at Google. Could you mentor me?",
      interests: ["Web Development", "Machine Learning", "Product Management"],
      requestDate: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      department: "Business Administration",
      year: "Senior",
      message: "I\'m planning to start my own tech company after graduation. Your entrepreneurial journey would be incredibly valuable guidance for me.",
      interests: ["Entrepreneurship", "Business Strategy", "Fintech"],
      requestDate: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      department: "Marketing",
      year: "Sophomore",
      message: "I\'m passionate about digital marketing and would appreciate mentorship on building a successful career in the industry.",
      interests: ["Digital Marketing", "Social Media", "Brand Strategy"],
      requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    }
  ];

  // Mock data for job postings
  const jobPostings = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      status: "active",
      applicationCount: 23,
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Meta",
      location: "Menlo Park, CA",
      status: "active",
      applicationCount: 18,
      expiryDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) // 8 days from now
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos, CA",
      status: "expired",
      applicationCount: 45,
      expiryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    }
  ];

  // Mock data for alumni network
  const alumniNetwork = [
    {
      id: 1,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      jobTitle: "Senior Product Manager",
      company: "Apple",
      department: "Computer Science",
      graduationYear: 2018,
      location: "Cupertino, CA",
      mutualConnections: 8,
      isOnline: true
    },
    {
      id: 2,
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      jobTitle: "Marketing Director",
      company: "Spotify",
      department: "Business Administration",
      graduationYear: 2017,
      location: "New York, NY",
      mutualConnections: 12,
      isOnline: false
    },
    {
      id: 3,
      name: "James Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      jobTitle: "Data Science Lead",
      company: "Uber",
      department: "Mathematics",
      graduationYear: 2019,
      location: "San Francisco, CA",
      mutualConnections: 5,
      isOnline: true
    }
  ];

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Alumni Homecoming",
      type: "homecoming",
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      location: "University Campus",
      attendeeCount: 245,
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&h=200&fit=crop",
      isRSVPed: false
    },
    {
      id: 2,
      title: "Tech Industry Networking Mixer",
      type: "networking",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      location: "Downtown Convention Center",
      attendeeCount: 89,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=200&fit=crop",
      isRSVPed: true
    },
    {
      id: 3,
      title: "Innovation & Entrepreneurship Symposium",
      type: "symposium",
      date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      location: "Business School Auditorium",
      attendeeCount: 156,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
      isRSVPed: false
    }
  ];

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: "Super Mentor",
      description: "Mentored 10+ students",
      type: "mentor",
      level: "gold",
      progress: 100
    },
    {
      id: 2,
      title: "Top Recruiter",
      description: "Posted 5+ job opportunities",
      type: "recruiter",
      level: "silver",
      progress: 80
    },
    {
      id: 3,
      title: "Community Builder",
      description: "Active in 3+ associations",
      type: "community",
      level: "bronze",
      progress: 60
    },
    {
      id: 4,
      title: "Event Speaker",
      description: "Spoke at 2+ events",
      type: "speaker",
      level: "bronze",
      progress: 40
    }
  ];

  const handleAcceptRequest = (studentId) => {
    console.log('Accepting mentorship request from student:', studentId);
    // Handle accept logic here
  };

  const handleDeclineRequest = (studentId) => {
    console.log('Declining mentorship request from student:', studentId);
    // Handle decline logic here
  };

  const handleEditJob = (jobId) => {
    console.log('Editing job:', jobId);
    // Handle edit job logic here
  };

  const handleViewJob = (jobId) => {
    console.log('Viewing job:', jobId);
    // Handle view job logic here
  };

  const handleConnectAlumni = (alumniId) => {
    console.log('Connecting with alumni:', alumniId);
    // Handle connect logic here
  };

  const handleMessageAlumni = (alumniId) => {
    console.log('Messaging alumni:', alumniId);
    // Handle message logic here
  };

  const handleEventRSVP = (eventId) => {
    console.log('RSVP to event:', eventId);
    // Handle RSVP logic here
  };

  const handleViewEventDetails = (eventId) => {
    console.log('Viewing event details:', eventId);
    // Handle view event details logic here
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader 
        userRole="alumni" 
        notificationCount={3} 
        userName="Dr. Alex Johnson" 
      />
      <main className="pt-header pb-bottom-nav md:pb-0">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
          <NavigationBreadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {getGreeting()}, Dr. Johnson! 👋
                </h1>
                <p className="text-muted-foreground mt-1 font-caption">
                  Ready to make an impact in students' lives today?
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {currentTime?.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground font-caption">
                    {currentTime?.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content - 6 columns */}
            <div className="lg:col-span-6 space-y-6">
              {/* Mentorship Activity */}
              <MentorshipActivityCard {...mentorshipData} />
              
              {/* Quick Actions */}
              <div>
                <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Actions</h2>
                <QuickActionCards />
              </div>
              
              {/* Recent Student Requests */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">Recent Student Requests</h2>
                  <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {studentRequests?.slice(0, 2)?.map((student) => (
                    <StudentRequestCard
                      key={student?.id}
                      student={student}
                      onAccept={handleAcceptRequest}
                      onDecline={handleDeclineRequest}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mentorship Management Panel - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Job Posting Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">Your Job Posts</h2>
                  <Link to="/jobs">
                    <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
                      New
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {jobPostings?.slice(0, 2)?.map((job) => (
                    <JobPostingCard
                      key={job?.id}
                      job={job}
                      onEdit={handleEditJob}
                      onView={handleViewJob}
                    />
                  ))}
                </div>
              </div>

              {/* Achievement Badges */}
              <AchievementBadges achievements={achievements} />
            </div>

            {/* Networking Opportunities Sidebar - 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Alumni Network Suggestions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">Connect with Alumni</h2>
                  <Button variant="ghost" size="sm" iconName="Users" iconPosition="left">
                    Browse
                  </Button>
                </div>
                <div className="space-y-4">
                  {alumniNetwork?.slice(0, 2)?.map((alumni) => (
                    <AlumniNetworkCard
                      key={alumni?.id}
                      alumni={alumni}
                      onConnect={handleConnectAlumni}
                      onMessage={handleMessageAlumni}
                    />
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-semibold text-foreground">Upcoming Events</h2>
                  <Link to="/events">
                    <Button variant="ghost" size="sm" iconName="Calendar" iconPosition="left">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {upcomingEvents?.slice(0, 1)?.map((event) => (
                    <EventParticipationCard
                      key={event?.id}
                      event={event}
                      onRSVP={handleEventRSVP}
                      onViewDetails={handleViewEventDetails}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Mentorship Activity */}
            <MentorshipActivityCard {...mentorshipData} />
            
            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Actions</h2>
              <QuickActionCards />
            </div>
            
            {/* Recent Student Requests */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-foreground">Student Requests</h2>
                <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {studentRequests?.slice(0, 2)?.map((student) => (
                  <StudentRequestCard
                    key={student?.id}
                    student={student}
                    onAccept={handleAcceptRequest}
                    onDecline={handleDeclineRequest}
                  />
                ))}
              </div>
            </div>

            {/* Job Posting Management */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-foreground">Your Job Posts</h2>
                <Link to="/jobs">
                  <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
                    New
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobPostings?.slice(0, 2)?.map((job) => (
                  <JobPostingCard
                    key={job?.id}
                    job={job}
                    onEdit={handleEditJob}
                    onView={handleViewJob}
                  />
                ))}
              </div>
            </div>

            {/* Alumni Network */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-foreground">Connect with Alumni</h2>
                <Button variant="ghost" size="sm" iconName="Users" iconPosition="left">
                  Browse
                </Button>
              </div>
              <div className="space-y-4">
                {alumniNetwork?.slice(0, 2)?.map((alumni) => (
                  <AlumniNetworkCard
                    key={alumni?.id}
                    alumni={alumni}
                    onConnect={handleConnectAlumni}
                    onMessage={handleMessageAlumni}
                  />
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-foreground">Upcoming Events</h2>
                <Link to="/events">
                  <Button variant="ghost" size="sm" iconName="Calendar" iconPosition="left">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upcomingEvents?.slice(0, 2)?.map((event) => (
                  <EventParticipationCard
                    key={event?.id}
                    event={event}
                    onRSVP={handleEventRSVP}
                    onViewDetails={handleViewEventDetails}
                  />
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <AchievementBadges achievements={achievements} />
          </div>
        </div>
      </main>
      <BottomTabNavigation userRole="alumni" />
    </div>
  );
};

export default AlumniDashboard;