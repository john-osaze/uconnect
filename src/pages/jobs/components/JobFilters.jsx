import React, { useState } from 'react';

import Button from '@/components/Button';
import Select from '@/components/Select';
import { Checkbox } from '@/components/Checkbox';

const JobFilters = ({ filters, onFiltersChange, onClearFilters, isOpen, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const jobTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'remote', label: 'Remote' },
    { value: 'on-site', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'finance', label: 'Finance' }
  ];

  const experienceLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead/Manager' }
  ];

  const deadlineOptions = [
    { value: 'all', label: 'Any Deadline' },
    { value: '7', label: 'Within 7 days' },
    { value: '14', label: 'Within 2 weeks' },
    { value: '30', label: 'Within 1 month' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      jobType: 'all',
      location: 'all',
      department: 'all',
      experienceLevel: 'all',
      deadline: 'all',
      salaryRange: false,
      alumniPosted: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          iconName="X"
          iconSize={16}
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <Select
          label="Job Type"
          options={jobTypeOptions}
          value={localFilters?.jobType}
          onChange={(value) => handleFilterChange('jobType', value)}
        />

        <Select
          label="Work Location"
          options={locationOptions}
          value={localFilters?.location}
          onChange={(value) => handleFilterChange('location', value)}
        />

        <Select
          label="Department"
          options={departmentOptions}
          value={localFilters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />

        <Select
          label="Experience Level"
          options={experienceLevelOptions}
          value={localFilters?.experienceLevel}
          onChange={(value) => handleFilterChange('experienceLevel', value)}
        />

        <Select
          label="Application Deadline"
          options={deadlineOptions}
          value={localFilters?.deadline}
          onChange={(value) => handleFilterChange('deadline', value)}
        />

        <div className="space-y-3 pt-2">
          <Checkbox
            label="Show salary range"
            description="Only show jobs with disclosed salary"
            checked={localFilters?.salaryRange}
            onChange={(e) => handleFilterChange('salaryRange', e?.target?.checked)}
          />

          <Checkbox
            label="Alumni posted jobs"
            description="Jobs posted by university alumni"
            checked={localFilters?.alumniPosted}
            onChange={(e) => handleFilterChange('alumniPosted', e?.target?.checked)}
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={handleApplyFilters}
          className="flex-1"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  // Mobile overlay
  if (isOpen) {
    return (
      <>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
        <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-xl p-6 z-50 max-h-[80vh] overflow-y-auto md:hidden">
          <FilterContent />
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="hidden md:block bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
      <FilterContent />
    </div>
  );
};

export default JobFilters;