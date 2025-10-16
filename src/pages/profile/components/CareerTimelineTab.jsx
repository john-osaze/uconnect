import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Input from '@/components/Input';
import Button from '@/components/Button';

import Image from '@/components/AppImage';

const CareerTimelineTab = ({ 
  formData, 
  onFormChange, 
  errors = {} 
}) => {
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [],
    companyLogo: ''
  });

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const handleAddExperience = () => {
    if (newExperience?.title && newExperience?.company) {
      const experience = {
        ...newExperience,
        id: editingId || Date.now(),
        achievements: newExperience?.achievements?.filter(a => a?.trim())
      };

      let updatedExperiences;
      if (editingId) {
        updatedExperiences = formData?.experiences?.map(exp => 
          exp?.id === editingId ? experience : exp
        ) || [experience];
      } else {
        updatedExperiences = [...(formData?.experiences || []), experience];
      }

      onFormChange({
        ...formData,
        experiences: updatedExperiences
      });

      resetForm();
    }
  };

  const resetForm = () => {
    setNewExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
      companyLogo: ''
    });
    setIsAddingExperience(false);
    setEditingId(null);
  };

  const handleEditExperience = (experience) => {
    setNewExperience(experience);
    setEditingId(experience?.id);
    setIsAddingExperience(true);
  };

  const handleDeleteExperience = (experienceId) => {
    let updatedExperiences = formData?.experiences?.filter(exp => exp?.id !== experienceId) || [];
    onFormChange({
      ...formData,
      experiences: updatedExperiences
    });
  };

  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...newExperience?.achievements];
    updatedAchievements[index] = value;
    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements
    });
  };

  const addAchievement = () => {
    setNewExperience({
      ...newExperience,
      achievements: [...newExperience?.achievements, '']
    });
  };

  const removeAchievement = (index) => {
    const updatedAchievements = newExperience?.achievements?.filter((_, i) => i !== index);
    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const sortedExperiences = formData?.experiences?.sort((a, b) => {
    if (a?.current && !b?.current) return -1;
    if (!a?.current && b?.current) return 1;
    return new Date(b.startDate) - new Date(a.startDate);
  }) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground">
            Career Timeline
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Showcase your professional journey and achievements
          </p>
        </div>
        <Button
          onClick={() => setIsAddingExperience(true)}
          iconName="Plus"
          iconPosition="left"
          disabled={isAddingExperience}
        >
          Add Experience
        </Button>
      </div>
      {/* Add/Edit Experience Form */}
      {isAddingExperience && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-medium text-foreground">
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetForm}
              iconName="X"
            >
              Cancel
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Job Title"
              type="text"
              placeholder="e.g., Software Engineer"
              value={newExperience?.title}
              onChange={(e) => setNewExperience({
                ...newExperience,
                title: e?.target?.value
              })}
              required
            />

            <Input
              label="Company"
              type="text"
              placeholder="e.g., Google, Microsoft"
              value={newExperience?.company}
              onChange={(e) => setNewExperience({
                ...newExperience,
                company: e?.target?.value
              })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Location"
              type="text"
              placeholder="e.g., San Francisco, CA"
              value={newExperience?.location}
              onChange={(e) => setNewExperience({
                ...newExperience,
                location: e?.target?.value
              })}
            />

            <Input
              label="Company Logo URL"
              type="url"
              placeholder="https://company.com/logo.png"
              value={newExperience?.companyLogo}
              onChange={(e) => setNewExperience({
                ...newExperience,
                companyLogo: e?.target?.value
              })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Start Date"
              type="date"
              value={newExperience?.startDate}
              onChange={(e) => setNewExperience({
                ...newExperience,
                startDate: e?.target?.value
              })}
              required
            />

            <Input
              label="End Date"
              type="date"
              value={newExperience?.endDate}
              onChange={(e) => setNewExperience({
                ...newExperience,
                endDate: e?.target?.value
              })}
              disabled={newExperience?.current}
            />

            <div className="flex items-center space-x-2 pt-8">
              <input
                type="checkbox"
                id="current-role"
                checked={newExperience?.current}
                onChange={(e) => setNewExperience({
                  ...newExperience,
                  current: e?.target?.checked,
                  endDate: e?.target?.checked ? '' : newExperience?.endDate
                })}
                className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="current-role" className="text-sm text-foreground">
                Current Role
              </label>
            </div>
          </div>

          <Input
            label="Description"
            type="text"
            placeholder="Describe your role and responsibilities..."
            value={newExperience?.description}
            onChange={(e) => setNewExperience({
              ...newExperience,
              description: e?.target?.value
            })}
            description={`${newExperience?.description?.length}/500 characters`}
          />

          {/* Achievements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Key Achievements
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={addAchievement}
                iconName="Plus"
                iconPosition="left"
              >
                Add Achievement
              </Button>
            </div>

            {newExperience?.achievements?.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Describe a key achievement or accomplishment..."
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e?.target?.value)}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAchievement(index)}
                  iconName="Trash2"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddExperience}
              disabled={!newExperience?.title || !newExperience?.company}
            >
              {editingId ? 'Update Experience' : 'Add Experience'}
            </Button>
          </div>
        </div>
      )}
      {/* Experience Timeline */}
      <div className="space-y-4">
        {sortedExperiences?.map((experience, index) => (
          <div key={experience?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                {experience?.companyLogo && (
                  <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={experience?.companyLogo}
                      alt={`${experience?.company} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-heading font-medium text-lg text-foreground">
                    {experience?.title}
                  </h4>
                  <p className="text-secondary font-medium">
                    {experience?.company}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    {experience?.location && (
                      <span className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{experience?.location}</span>
                      </span>
                    )}
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>
                        {formatDate(experience?.startDate)} - {
                          experience?.current ? 'Present' : formatDate(experience?.endDate)
                        }
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditExperience(experience)}
                  iconName="Edit"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteExperience(experience?.id)}
                  iconName="Trash2"
                />
              </div>
            </div>

            {experience?.description && (
              <p className="text-muted-foreground mb-4">
                {experience?.description}
              </p>
            )}

            {experience?.achievements && experience?.achievements?.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium text-foreground text-sm">Key Achievements:</h5>
                <ul className="space-y-1">
                  {experience?.achievements?.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {sortedExperiences?.length === 0 && !isAddingExperience && (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
            <h4 className="font-heading font-medium text-foreground mb-2">
              No work experience added yet
            </h4>
            <p className="text-muted-foreground mb-6">
              Share your professional journey to help students learn from your experience
            </p>
            <Button
              onClick={() => setIsAddingExperience(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Add Your First Experience
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerTimelineTab;