import React, { useState, useRef } from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const ProfilePhotoUpload = ({ currentPhoto, onPhotoChange, userType = 'student' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentPhoto);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }

      if (!file?.type?.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const newUrl = e?.target?.result;
        setPreviewUrl(newUrl);
        onPhotoChange(newUrl);
        setIsUploading(false);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    onPhotoChange(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-muted border-4 border-card shadow-elevation-2">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile photo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <Icon name="User" size={48} className="text-primary/60" />
            </div>
          )}
        </div>
        
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <button
          onClick={triggerFileInput}
          className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-elevation-2 hover:bg-primary/90 transition-smooth focus-ring"
          aria-label="Upload photo"
        >
          <Icon name="Camera" size={16} />
        </button>
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={triggerFileInput}
            iconName="Upload"
            iconPosition="left"
            disabled={isUploading}
          >
            {previewUrl ? 'Change Photo' : 'Upload Photo'}
          </Button>
          
          {previewUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemovePhoto}
              iconName="Trash2"
              iconPosition="left"
            >
              Remove
            </Button>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground font-caption">
          JPG, PNG or GIF. Max size 5MB.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Select profile photo"
      />
    </div>
  );
};

export default ProfilePhotoUpload;