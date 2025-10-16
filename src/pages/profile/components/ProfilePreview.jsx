import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';

const ProfilePreview = ({ formData, userType = 'student' }) => {
  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced': return 'bg-green-100 text-green-800 border-green-200';
      case 'expert': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getProfileCompleteness = () => {
    const requiredFields = ['fullName', 'email', 'department', 'year'];
    const optionalFields = ['profilePhoto', 'bio', 'currentRole', 'location'];
    const skillsFields = formData?.skills?.length > 0 ? 1 : 0;
    const interestsFields = formData?.interests?.length > 0 ? 1 : 0;
    
    const requiredComplete = requiredFields?.filter(field => formData?.[field])?.length;
    const optionalComplete = optionalFields?.filter(field => formData?.[field])?.length;
    const totalComplete = requiredComplete + optionalComplete + skillsFields + interestsFields;
    const totalFields = requiredFields?.length + optionalFields?.length + 2; // +2 for skills and interests
    
    return Math.round((totalComplete / totalFields) * 100);
  };

  const completeness = getProfileCompleteness();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-medium text-foreground">
            Profile Preview
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground font-caption">
              {completeness}%
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          How your profile appears to other users
        </p>
      </div>
      {/* Profile Content */}
      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
            {formData?.profilePhoto ? (
              <Image
                src={formData?.profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <Icon name="User" size={24} className="text-primary/60" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-medium text-foreground truncate">
              {formData?.fullName || 'Your Name'}
            </h4>
            <p className="text-sm text-secondary">
              {formData?.currentRole || (userType === 'student' ? 'Student' : 'Alumni')}
            </p>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
              {formData?.department && (
                <span className="flex items-center space-x-1">
                  <Icon name="GraduationCap" size={12} />
                  <span>{formData?.department?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}</span>
                </span>
              )}
              {formData?.location && (
                <span className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span>{formData?.location?.split('-')?.[0]}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {formData?.bio && (
          <div className="text-sm text-muted-foreground">
            <p className="line-clamp-3">{formData?.bio}</p>
          </div>
        )}

        {/* Skills Preview */}
        {formData?.skills && formData?.skills?.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Skills</h5>
            <div className="flex flex-wrap gap-1">
              {formData?.skills?.slice(0, 4)?.map((skill) => (
                <span
                  key={skill?.id}
                  className={`px-2 py-1 text-xs rounded-full border ${getSkillLevelColor(skill?.level)}`}
                >
                  {skill?.name}
                </span>
              ))}
              {formData?.skills?.length > 4 && (
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                  +{formData?.skills?.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Interests Preview */}
        {formData?.interests && formData?.interests?.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Interests</h5>
            <div className="flex flex-wrap gap-1">
              {formData?.interests?.slice(0, 3)?.map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-secondary/10 text-secondary border border-secondary/20 rounded-full"
                >
                  {interest}
                </span>
              ))}
              {formData?.interests?.length > 3 && (
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                  +{formData?.interests?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Experience Preview (Alumni only) */}
        {userType === 'alumni' && formData?.experiences && formData?.experiences?.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Experience</h5>
            <div className="space-y-2">
              {formData?.experiences?.slice(0, 2)?.map((exp) => (
                <div key={exp?.id} className="flex items-start space-x-2">
                  {exp?.companyLogo && (
                    <div className="w-6 h-6 bg-muted rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={exp?.companyLogo}
                        alt={exp?.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {exp?.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {exp?.company} • {formatDate(exp?.startDate)} - {exp?.current ? 'Present' : formatDate(exp?.endDate)}
                    </p>
                  </div>
                </div>
              ))}
              {formData?.experiences?.length > 2 && (
                <p className="text-xs text-muted-foreground">
                  +{formData?.experiences?.length - 2} more positions
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons Preview */}
        <div className="flex space-x-2 pt-2">
          <button className="flex-1 px-3 py-2 bg-primary text-primary-foreground text-xs rounded-md">
            {userType === 'student' ? 'Request Mentorship' : 'Offer Mentorship'}
          </button>
          <button className="px-3 py-2 bg-muted text-muted-foreground text-xs rounded-md">
            <Icon name="MessageCircle" size={14} />
          </button>
          <button className="px-3 py-2 bg-muted text-muted-foreground text-xs rounded-md">
            <Icon name="UserPlus" size={14} />
          </button>
        </div>
      </div>
      {/* Completeness Tips */}
      {completeness < 100 && (
        <div className="p-4 bg-muted/50 border-t border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground mb-1">
                Improve your profile
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {!formData?.profilePhoto && <li>• Add a profile photo</li>}
                {!formData?.bio && <li>• Write a compelling bio</li>}
                {(!formData?.skills || formData?.skills?.length === 0) && <li>• Add your skills</li>}
                {(!formData?.interests || formData?.interests?.length === 0) && <li>• Share your interests</li>}
                {userType === 'alumni' && (!formData?.experiences || formData?.experiences?.length === 0) && <li>• Add work experience</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePreview;