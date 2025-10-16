import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '@/components/AppIcon';
import Button from '@/components/Button';
import ContextualHeader from '@/components/ContextualHeader';
import BottomTabNavigation from '@/components/BottomTabNavigation';
import NavigationBreadcrumb from '@/components/NavigationBreadcrumb';
import TabContentLoader from '@/components/TabContentLoader';

// Import all components
import BasicInformationTab from './components/BasicInformationTab';
import SkillsInterestsTab from './components/SkillsInterestsTab';
import CareerTimelineTab from './components/CareerTimelineTab';
import PrivacySettingsTab from './components/PrivacySettingsTab';
import ProfilePreview from './components/ProfilePreview';

const ProfileManagement = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [errors, setErrors] = useState({});

  // Mock user data - in real app this would come from API/context
  const [userType] = useState('student'); // or 'alumni'
  const [formData, setFormData] = useState({
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    department: 'computer-science',
    year: userType === 'student' ? 'junior' : '2022',
    currentRole: userType === 'student' ? 'Computer Science Student' : 'Software Engineer',
    location: 'san-francisco-ca',
    company: userType === 'alumni' ? 'Google' : '',
    linkedinUrl: userType === 'alumni' ? 'https://linkedin.com/in/alexjohnson' : '',
    bio: `Passionate ${userType === 'student' ? 'computer science student' : 'software engineer'} with a focus on full-stack development and machine learning. Looking to ${userType === 'student' ? 'connect with industry professionals and gain mentorship' : 'mentor the next generation of developers'}.`,
    skills: [
      { id: 1, name: 'JavaScript', level: 'advanced' },
      { id: 2, name: 'React', level: 'advanced' },
      { id: 3, name: 'Python', level: 'intermediate' },
      { id: 4, name: 'Machine Learning', level: 'beginner' }
    ],
    interests: ['Web Development', 'Artificial Intelligence', 'Startups', 'Open Source'],
    academicFocus: userType === 'student' ? 'Full-Stack Development' : '',
    careerGoals: userType === 'student' ? 'Software Engineer at a tech startup' : '',
    mentorshipPreferences: userType === 'student' ? 'Looking for guidance in career development and technical skills' : '',
    experiences: userType === 'alumni' ? [
      {
        id: 1,
        title: 'Software Engineer',
        company: 'Google',
        location: 'Mountain View, CA',
        startDate: '2022-06-01',
        endDate: '',
        current: true,
        description: 'Developing scalable web applications using React and Node.js. Leading a team of 3 junior developers.',
        achievements: [
          'Improved application performance by 40%',
          'Led migration to microservices architecture',
          'Mentored 5+ junior developers'
        ],
        companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=50&h=50&fit=crop'
      }
    ] : [],
    privacySettings: {
      profileVisibility: 'university',
      contactInfo: 'connections',
      careerInfo: 'university',
      mentorshipRequests: true,
      connectionRequests: true,
      eventInvitations: true,
      jobOpportunities: true,
      weeklyDigest: true,
      marketingEmails: false,
      searchableByName: true,
      searchableBySkills: true,
      searchableByCompany: true,
      appearInSuggestions: true
    }
  });

  const tabs = [
    {
      id: 'basic',
      label: 'Basic Info',
      icon: 'User',
      component: BasicInformationTab
    },
    {
      id: 'skills',
      label: 'Skills & Interests',
      icon: 'Star',
      component: SkillsInterestsTab
    },
    ...(userType === 'alumni' ? [{
      id: 'timeline',
      label: 'Career Timeline',
      icon: 'Briefcase',
      component: CareerTimelineTab
    }] : []),
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Shield',
      component: PrivacySettingsTab
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 3000); // Auto-save after 3 seconds of inactivity

      return () => clearTimeout(autoSaveTimer);
    }
  }, [formData, hasUnsavedChanges]);

  const handleFormChange = (newData) => {
    setFormData(newData);
    setHasUnsavedChanges(true);
    setErrors({}); // Clear errors when user makes changes
  };

  const handleAutoSave = async () => {
    if (!hasUnsavedChanges) return;

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrors({});

    try {
      // Validate required fields
      const newErrors = {};
      if (!formData?.fullName) newErrors.fullName = 'Full name is required';
      if (!formData?.email) newErrors.email = 'Email is required';
      if (!formData?.department) newErrors.department = 'Department is required';
      if (!formData?.year) newErrors.year = 'Year is required';

      if (Object.keys(newErrors)?.length > 0) {
        setErrors(newErrors);
        setIsSaving(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      // Show success message (in real app, use toast notification)
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Do you want to save before switching tabs?');
      if (confirmLeave) {
        handleSave()?.then(() => setActiveTab(tabId));
        return;
      }
    }
    setActiveTab(tabId);
  };

  const getCurrentTabComponent = () => {
    const currentTab = tabs?.find(tab => tab?.id === activeTab);
    if (!currentTab) return null;

    const Component = currentTab?.component;
    return (
      <Component
        formData={formData}
        onFormChange={handleFormChange}
        userType={userType}
        errors={errors}
      />
    );
  };

  const formatLastSaved = () => {
    if (!lastSaved) return 'Never saved';
    const now = new Date();
    const diffInMinutes = Math.floor((now - lastSaved) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Saved just now';
    if (diffInMinutes < 60) return `Saved ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Saved ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    return lastSaved?.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader 
        userRole={userType}
        notificationCount={3}
        userName={formData?.fullName}
      />
      <div className="pt-header pb-bottom-nav md:pb-0">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
          <NavigationBreadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Profile Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your profile information and privacy settings
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="text-sm text-muted-foreground font-caption">
                  {isSaving ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <span>{formatLastSaved()}</span>
                  )}
                </div>
                
                <Button
                  onClick={handleSave}
                  loading={isSaving}
                  disabled={!hasUnsavedChanges}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
              </div>
            </div>
            
            {hasUnsavedChanges && (
              <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="text-sm text-warning">
                    You have unsaved changes. They will be auto-saved in a few seconds.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Form Content */}
            <div className="lg:col-span-8">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="flex overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <TabContentLoader
                isLoading={isLoading}
                error={null}
                loadingMessage="Loading profile data..."
              >
                {getCurrentTabComponent()}
              </TabContentLoader>
            </div>

            {/* Right Column - Profile Preview (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24">
                <ProfilePreview 
                  formData={formData}
                  userType={userType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomTabNavigation userRole={userType} />
    </div>
  );
};

export default ProfileManagement;