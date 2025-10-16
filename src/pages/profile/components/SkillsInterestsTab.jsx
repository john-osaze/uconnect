import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';

const SkillsInterestsTab = ({ 
  formData, 
  onFormChange, 
  userType = 'student',
  errors = {} 
}) => {
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const skillSuggestions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL', 'MongoDB',
    'Machine Learning', 'Data Analysis', 'Project Management', 'Leadership',
    'Communication', 'Problem Solving', 'Team Collaboration', 'Research',
    'Marketing', 'Design', 'Finance', 'Strategy', 'Operations', 'Sales'
  ];

  const interestSuggestions = [
    'Artificial Intelligence', 'Web Development', 'Mobile Development', 'Data Science',
    'Cybersecurity', 'Cloud Computing', 'Blockchain', 'IoT', 'Robotics',
    'Entrepreneurship', 'Startups', 'Consulting', 'Finance', 'Marketing',
    'Product Management', 'UX/UI Design', 'Research', 'Academia'
  ];

  const skillLevelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const handleAddSkill = () => {
    if (newSkill?.trim() && !formData?.skills?.some(skill => skill?.name?.toLowerCase() === newSkill?.toLowerCase())) {
      const updatedSkills = [
        ...(formData?.skills || []),
        { 
          id: Date.now(), 
          name: newSkill?.trim(), 
          level: 'intermediate' 
        }
      ];
      onFormChange({
        ...formData,
        skills: updatedSkills
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillId) => {
    const updatedSkills = formData?.skills?.filter(skill => skill?.id !== skillId) || [];
    onFormChange({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleSkillLevelChange = (skillId, level) => {
    const updatedSkills = formData?.skills?.map(skill => 
      skill?.id === skillId ? { ...skill, level } : skill
    ) || [];
    onFormChange({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleAddInterest = () => {
    if (newInterest?.trim() && !formData?.interests?.includes(newInterest?.trim())) {
      const updatedInterests = [
        ...(formData?.interests || []),
        newInterest?.trim()
      ];
      onFormChange({
        ...formData,
        interests: updatedInterests
      });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    const updatedInterests = formData?.interests?.filter(item => item !== interest) || [];
    onFormChange({
      ...formData,
      interests: updatedInterests
    });
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (type === 'skill') {
      setNewSkill(suggestion);
    } else {
      setNewInterest(suggestion);
    }
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced': return 'bg-green-100 text-green-800 border-green-200';
      case 'expert': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Skills Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-medium text-lg text-foreground">
            Skills & Expertise
          </h3>
          <span className="text-sm text-muted-foreground font-caption">
            {formData?.skills?.length || 0} skills added
          </span>
        </div>

        {/* Add New Skill */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Add a skill (e.g., JavaScript, Leadership)"
                value={newSkill}
                onChange={(e) => setNewSkill(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleAddSkill()}
              />
            </div>
            <Button
              onClick={handleAddSkill}
              disabled={!newSkill?.trim()}
              iconName="Plus"
              iconPosition="left"
            >
              Add Skill
            </Button>
          </div>

          {/* Skill Suggestions */}
          <div className="flex flex-wrap gap-2">
            {skillSuggestions?.filter(suggestion => 
                !formData?.skills?.some(skill => 
                  skill?.name?.toLowerCase() === suggestion?.toLowerCase()
                )
              )?.slice(0, 8)?.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion, 'skill')}
                  className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
                >
                  {suggestion}
                </button>
              ))}
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-3">
          {formData?.skills?.map((skill) => (
            <div key={skill?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 flex-1">
                <span className="font-medium text-foreground">{skill?.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full border ${getSkillLevelColor(skill?.level)}`}>
                  {skill?.level}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  options={skillLevelOptions}
                  value={skill?.level}
                  onChange={(value) => handleSkillLevelChange(skill?.id, value)}
                  className="w-32"
                />
                <button
                  onClick={() => handleRemoveSkill(skill?.id)}
                  className="p-1 text-muted-foreground hover:text-destructive transition-smooth"
                  aria-label="Remove skill"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          ))}
          
          {(!formData?.skills || formData?.skills?.length === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Plus" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No skills added yet. Add your first skill above!</p>
            </div>
          )}
        </div>
      </div>
      {/* Interests Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-medium text-lg text-foreground">
            Interests & Career Goals
          </h3>
          <span className="text-sm text-muted-foreground font-caption">
            {formData?.interests?.length || 0} interests added
          </span>
        </div>

        {/* Add New Interest */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Add an interest (e.g., Machine Learning, Startups)"
                value={newInterest}
                onChange={(e) => setNewInterest(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleAddInterest()}
              />
            </div>
            <Button
              onClick={handleAddInterest}
              disabled={!newInterest?.trim()}
              iconName="Plus"
              iconPosition="left"
            >
              Add Interest
            </Button>
          </div>

          {/* Interest Suggestions */}
          <div className="flex flex-wrap gap-2">
            {interestSuggestions?.filter(suggestion => !formData?.interests?.includes(suggestion))?.slice(0, 8)?.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion, 'interest')}
                  className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-secondary hover:text-secondary-foreground transition-smooth"
                >
                  {suggestion}
                </button>
              ))}
          </div>
        </div>

        {/* Interests List */}
        <div className="flex flex-wrap gap-2">
          {formData?.interests?.map((interest, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-3 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full"
            >
              <span className="text-sm">{interest}</span>
              <button
                onClick={() => handleRemoveInterest(interest)}
                className="text-secondary hover:text-secondary/70 transition-smooth"
                aria-label="Remove interest"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
          
          {(!formData?.interests || formData?.interests?.length === 0) && (
            <div className="w-full text-center py-8 text-muted-foreground">
              <Icon name="Heart" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No interests added yet. Share what you're passionate about!</p>
            </div>
          )}
        </div>
      </div>
      {/* Additional Information for Students */}
      {userType === 'student' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h3 className="font-heading font-medium text-lg text-foreground">
            Academic & Career Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Academic Focus"
              type="text"
              placeholder="e.g., Software Engineering, Data Science"
              value={formData?.academicFocus || ''}
              onChange={(e) => onFormChange({
                ...formData,
                academicFocus: e?.target?.value
              })}
              error={errors?.academicFocus}
            />

            <Input
              label="Career Goals"
              type="text"
              placeholder="e.g., Software Developer, Product Manager"
              value={formData?.careerGoals || ''}
              onChange={(e) => onFormChange({
                ...formData,
                careerGoals: e?.target?.value
              })}
              error={errors?.careerGoals}
            />
          </div>

          <Input
            label="Mentorship Preferences"
            type="text"
            placeholder="What kind of mentorship are you looking for?"
            value={formData?.mentorshipPreferences || ''}
            onChange={(e) => onFormChange({
              ...formData,
              mentorshipPreferences: e?.target?.value
            })}
            error={errors?.mentorshipPreferences}
            description="Describe the type of guidance and support you're seeking"
          />
        </div>
      )}
    </div>
  );
};

export default SkillsInterestsTab;