import React from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];
    
    if (filters?.jobType && filters?.jobType !== 'all') {
      active?.push({
        key: 'jobType',
        label: 'Job Type',
        value: filters?.jobType?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())
      });
    }
    
    if (filters?.location && filters?.location !== 'all') {
      active?.push({
        key: 'location',
        label: 'Location',
        value: filters?.location?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())
      });
    }
    
    if (filters?.department && filters?.department !== 'all') {
      active?.push({
        key: 'department',
        label: 'Department',
        value: filters?.department?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())
      });
    }
    
    if (filters?.experienceLevel && filters?.experienceLevel !== 'all') {
      active?.push({
        key: 'experienceLevel',
        label: 'Experience',
        value: filters?.experienceLevel?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())
      });
    }
    
    if (filters?.deadline && filters?.deadline !== 'all') {
      const deadlineLabels = {
        '7': 'Within 7 days',
        '14': 'Within 2 weeks',
        '30': 'Within 1 month'
      };
      active?.push({
        key: 'deadline',
        label: 'Deadline',
        value: deadlineLabels?.[filters?.deadline] || filters?.deadline
      });
    }
    
    if (filters?.salaryRange) {
      active?.push({
        key: 'salaryRange',
        label: 'Salary Range',
        value: 'Show salary'
      });
    }
    
    if (filters?.alumniPosted) {
      active?.push({
        key: 'alumniPosted',
        label: 'Alumni Posted',
        value: 'Alumni jobs'
      });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground font-caption">Active filters:</span>
      {activeFilters?.map((filter) => (
        <div
          key={filter?.key}
          className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
        >
          <span className="font-medium">{filter?.value}</span>
          <button
            onClick={() => onRemoveFilter(filter?.key)}
            className="hover:bg-primary/20 rounded-full p-0.5 transition-smooth"
            aria-label={`Remove ${filter?.label} filter`}
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      {activeFilters?.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="X"
          iconPosition="left"
          iconSize={14}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;