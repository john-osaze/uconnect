import React from 'react';
import Select from '@/components/Select';
import Input from '@/components/Input';
import Icon from '@/components/AppIcon';

const AssociationFilters = ({ 
  filters, 
  onFiltersChange, 
  searchQuery, 
  onSearchChange,
  totalCount = 0,
  filteredCount = 0 
}) => {
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'law', label: 'Law' },
    { value: 'arts', label: 'Arts & Humanities' },
    { value: 'sciences', label: 'Natural Sciences' },
    { value: 'education', label: 'Education' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'economics', label: 'Economics' }
  ];

  const activityLevelOptions = [
    { value: 'all', label: 'All Activity Levels' },
    { value: 'high', label: 'High Activity' },
    { value: 'medium', label: 'Medium Activity' },
    { value: 'low', label: 'Low Activity' }
  ];

  const membershipStatusOptions = [
    { value: 'all', label: 'All Associations' },
    { value: 'joined', label: 'Joined Only' },
    { value: 'available', label: 'Available to Join' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'members', label: 'Most Members' },
    { value: 'activity', label: 'Most Active' },
    { value: 'recent', label: 'Recently Updated' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      department: 'all',
      activityLevel: 'all',
      membershipStatus: 'all',
      sortBy: 'name'
    });
    onSearchChange('');
  };

  const hasActiveFilters = 
    filters?.department !== 'all' || 
    filters?.activityLevel !== 'all' || 
    filters?.membershipStatus !== 'all' || 
    searchQuery?.length > 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search associations, departments, or activities..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />
        
        <Select
          label="Activity Level"
          options={activityLevelOptions}
          value={filters?.activityLevel}
          onChange={(value) => handleFilterChange('activityLevel', value)}
        />
        
        <Select
          label="Membership"
          options={membershipStatusOptions}
          value={filters?.membershipStatus}
          onChange={(value) => handleFilterChange('membershipStatus', value)}
        />
        
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
      </div>
      {/* Results Summary and Clear Filters */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground font-caption">
          {filteredCount === totalCount ? (
            `Showing all ${totalCount} associations`
          ) : (
            `Showing ${filteredCount} of ${totalCount} associations`
          )}
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-smooth"
          >
            <Icon name="X" size={14} />
            <span>Clear filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AssociationFilters;