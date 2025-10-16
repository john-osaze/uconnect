import React from 'react';
import Icon from '@/components/AppIcon';
import { Checkbox } from '@/components/Checkbox';

const PrivacySettingsTab = ({ 
  formData, 
  onFormChange, 
  userType = 'student' 
}) => {
  const handlePrivacyChange = (setting, value) => {
    onFormChange({
      ...formData,
      privacySettings: {
        ...formData?.privacySettings,
        [setting]: value
      }
    });
  };

  const privacySettings = formData?.privacySettings || {};

  const privacyOptions = [
    {
      id: 'profileVisibility',
      title: 'Profile Visibility',
      description: 'Who can view your complete profile',
      options: [
        { value: 'public', label: 'Everyone', description: 'Your profile is visible to all users' },
        { value: 'university', label: 'University Community Only', description: 'Only students and alumni from your university' },
        { value: 'department', label: 'Department Only', description: 'Only members of your department' },
        { value: 'private', label: 'Private', description: 'Only you can see your profile' }
      ],
      current: privacySettings?.profileVisibility || 'university'
    },
    {
      id: 'contactInfo',
      title: 'Contact Information',
      description: 'Who can see your email and phone number',
      options: [
        { value: 'public', label: 'Everyone', description: 'All users can see your contact details' },
        { value: 'connections', label: 'Connections Only', description: 'Only people you\'ve connected with' },
        { value: 'mentees', label: 'Mentees/Mentors Only', description: 'Only your mentoring relationships' },
        { value: 'private', label: 'Private', description: 'Keep contact information hidden' }
      ],
      current: privacySettings?.contactInfo || 'connections'
    },
    {
      id: 'careerInfo',
      title: 'Career Information',
      description: userType === 'student' ? 'Who can see your academic details and career goals' : 'Who can see your work experience and achievements',
      options: [
        { value: 'public', label: 'Everyone', description: 'All users can see your career information' },
        { value: 'university', label: 'University Community', description: 'Only students and alumni from your university' },
        { value: 'connections', label: 'Connections Only', description: 'Only people you\'ve connected with' },
        { value: 'private', label: 'Private', description: 'Keep career information hidden' }
      ],
      current: privacySettings?.careerInfo || 'university'
    }
  ];

  const notificationSettings = [
    {
      id: 'mentorshipRequests',
      label: 'Mentorship Requests',
      description: userType === 'student' ? 'Get notified when mentors respond to your requests' : 'Get notified when students request mentorship',
      enabled: privacySettings?.mentorshipRequests !== false
    },
    {
      id: 'connectionRequests',
      label: 'Connection Requests',
      description: 'Get notified when someone wants to connect with you',
      enabled: privacySettings?.connectionRequests !== false
    },
    {
      id: 'eventInvitations',
      label: 'Event Invitations',
      description: 'Get notified about relevant events and activities',
      enabled: privacySettings?.eventInvitations !== false
    },
    {
      id: 'jobOpportunities',
      label: 'Job Opportunities',
      description: 'Get notified about job postings that match your interests',
      enabled: privacySettings?.jobOpportunities !== false
    },
    {
      id: 'weeklyDigest',
      label: 'Weekly Digest',
      description: 'Receive a weekly summary of platform activity',
      enabled: privacySettings?.weeklyDigest !== false
    },
    {
      id: 'marketingEmails',
      label: 'Marketing Communications',
      description: 'Receive updates about new features and platform news',
      enabled: privacySettings?.marketingEmails !== false
    }
  ];

  const searchSettings = [
    {
      id: 'searchableByName',
      label: 'Searchable by Name',
      description: 'Allow others to find you by searching your name',
      enabled: privacySettings?.searchableByName !== false
    },
    {
      id: 'searchableBySkills',
      label: 'Searchable by Skills',
      description: 'Allow others to find you by searching your skills and expertise',
      enabled: privacySettings?.searchableBySkills !== false
    },
    {
      id: 'searchableByCompany',
      label: userType === 'student' ? 'Searchable by Department' : 'Searchable by Company',
      description: userType === 'student' ? 'Allow others to find you by your department' : 'Allow others to find you by your current or past companies',
      enabled: privacySettings?.searchableByCompany !== false
    },
    {
      id: 'appearInSuggestions',
      label: 'Appear in Suggestions',
      description: 'Allow the platform to suggest your profile to relevant users',
      enabled: privacySettings?.appearInSuggestions !== false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Visibility Settings */}
      <div className="space-y-6">
        {privacyOptions?.map((section) => (
          <div key={section?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="mb-4">
              <h3 className="font-heading font-medium text-lg text-foreground">
                {section?.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {section?.description}
              </p>
            </div>

            <div className="space-y-3">
              {section?.options?.map((option) => (
                <label
                  key={option?.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-smooth ${
                    section?.current === option?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted'
                  }`}
                >
                  <input
                    type="radio"
                    name={section?.id}
                    value={option?.value}
                    checked={section?.current === option?.value}
                    onChange={(e) => handlePrivacyChange(section?.id, e?.target?.value)}
                    className="mt-1 w-4 h-4 text-primary bg-input border-border focus:ring-primary focus:ring-2"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      {option?.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {option?.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Notification Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <h3 className="font-heading font-medium text-lg text-foreground">
            Notification Preferences
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Choose what notifications you want to receive
          </p>
        </div>

        <div className="space-y-4">
          {notificationSettings?.map((setting) => (
            <div key={setting?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth">
              <Checkbox
                checked={setting?.enabled}
                onChange={(e) => handlePrivacyChange(setting?.id, e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">
                  {setting?.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {setting?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Search & Discovery Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <h3 className="font-heading font-medium text-lg text-foreground">
            Search & Discovery
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Control how others can find and discover your profile
          </p>
        </div>

        <div className="space-y-4">
          {searchSettings?.map((setting) => (
            <div key={setting?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth">
              <Checkbox
                checked={setting?.enabled}
                onChange={(e) => handlePrivacyChange(setting?.id, e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">
                  {setting?.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {setting?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Data & Account Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <h3 className="font-heading font-medium text-lg text-foreground">
            Data & Account
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account data and privacy
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <div className="font-medium text-foreground">
                Download Your Data
              </div>
              <div className="text-sm text-muted-foreground">
                Get a copy of all your profile information and activity
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-smooth">
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <div className="font-medium text-foreground">
                Deactivate Account
              </div>
              <div className="text-sm text-muted-foreground">
                Temporarily hide your profile from other users
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-warning/10 text-warning border border-warning/20 rounded-md hover:bg-warning/20 transition-smooth">
              Deactivate
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
            <div>
              <div className="font-medium text-destructive">
                Delete Account
              </div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-smooth">
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Your Privacy Matters</p>
            <p>
              We're committed to protecting your privacy. Your data is encrypted and secure. 
              You can change these settings at any time. For more information, read our{' '}
              <button className="text-primary hover:underline">Privacy Policy</button> and{' '}
              <button className="text-primary hover:underline">Terms of Service</button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsTab;