import React from 'react';
import Input from '@/components/Input';
import Select from '@/components/Select';
import ProfilePhotoUpload from './ProfilePhotoUpload';

const BasicInformationTab = ({ 
  formData, 
  onFormChange, 
  userType = 'student',
  errors = {} 
}) => {
  const departmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'business-administration', label: 'Business Administration' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'biology', label: 'Biology' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english-literature', label: 'English Literature' },
    { value: 'history', label: 'History' }
  ];

  const yearOptions = userType === 'student' 
    ? [
        { value: 'freshman', label: 'Freshman (1st Year)' },
        { value: 'sophomore', label: 'Sophomore (2nd Year)' },
        { value: 'junior', label: 'Junior (3rd Year)' },
        { value: 'senior', label: 'Senior (4th Year)' },
        { value: 'graduate', label: 'Graduate Student' }
      ]
    : [
        { value: '2024', label: '2024' },
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' },
        { value: '2020', label: '2020' },
        { value: '2019', label: '2019' },
        { value: '2018', label: '2018' },
        { value: '2017', label: '2017' },
        { value: '2016', label: '2016' },
        { value: '2015', label: '2015' }
      ];

  const locationOptions = [
    { value: 'new-york-ny', label: 'New York, NY' },
    { value: 'los-angeles-ca', label: 'Los Angeles, CA' },
    { value: 'chicago-il', label: 'Chicago, IL' },
    { value: 'houston-tx', label: 'Houston, TX' },
    { value: 'phoenix-az', label: 'Phoenix, AZ' },
    { value: 'philadelphia-pa', label: 'Philadelphia, PA' },
    { value: 'san-antonio-tx', label: 'San Antonio, TX' },
    { value: 'san-diego-ca', label: 'San Diego, CA' },
    { value: 'dallas-tx', label: 'Dallas, TX' },
    { value: 'san-jose-ca', label: 'San Jose, CA' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const handlePhotoChange = (photoUrl) => {
    handleInputChange('profilePhoto', photoUrl);
  };

  return (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Profile Photo
        </h3>
        <ProfilePhotoUpload
          currentPhoto={formData?.profilePhoto}
          onPhotoChange={handlePhotoChange}
          userType={userType}
        />
      </div>
      {/* Basic Information Form */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName || ''}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@university.edu"
            value={formData?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            disabled
            description="Contact support to change your email"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Department"
            placeholder="Select your department"
            options={departmentOptions}
            value={formData?.department || ''}
            onChange={(value) => handleInputChange('department', value)}
            error={errors?.department}
            required
            searchable
          />

          <Select
            label={userType === 'student' ? 'Year of Study' : 'Graduation Year'}
            placeholder={userType === 'student' ? 'Select your year' : 'Select graduation year'}
            options={yearOptions}
            value={formData?.year || ''}
            onChange={(value) => handleInputChange('year', value)}
            error={errors?.year}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={userType === 'student' ? 'Current Role/Focus' : 'Job Title'}
            type="text"
            placeholder={userType === 'student' ? 'e.g., Computer Science Student' : 'e.g., Software Engineer'}
            value={formData?.currentRole || ''}
            onChange={(e) => handleInputChange('currentRole', e?.target?.value)}
            error={errors?.currentRole}
          />

          <Select
            label="Location"
            placeholder="Select your location"
            options={locationOptions}
            value={formData?.location || ''}
            onChange={(value) => handleInputChange('location', value)}
            error={errors?.location}
            searchable
          />
        </div>

        {userType === 'alumni' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Company"
              type="text"
              placeholder="Current company name"
              value={formData?.company || ''}
              onChange={(e) => handleInputChange('company', e?.target?.value)}
              error={errors?.company}
            />

            <Input
              label="LinkedIn Profile"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData?.linkedinUrl || ''}
              onChange={(e) => handleInputChange('linkedinUrl', e?.target?.value)}
              error={errors?.linkedinUrl}
            />
          </div>
        )}

        <Input
          label="Bio"
          type="text"
          placeholder={userType === 'student' ?'Tell us about your academic interests and career goals...' :'Share your professional background and expertise...'
          }
          value={formData?.bio || ''}
          onChange={(e) => handleInputChange('bio', e?.target?.value)}
          error={errors?.bio}
          description={`${(formData?.bio || '')?.length}/500 characters`}
        />
      </div>
    </div>
  );
};

export default BasicInformationTab;