import React, { useState } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { Checkbox } from '@/components/Checkbox';

const EventFilters = ({ filters, onFiltersChange, onClose, isOpen }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'arts', label: 'Arts & Humanities' },
    { value: 'sciences', label: 'Natural Sciences' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'main-campus', label: 'Main Campus' },
    { value: 'downtown-center', label: 'Downtown Center' },
    { value: 'virtual', label: 'Virtual/Online' },
    { value: 'off-campus', label: 'Off-Campus Venues' }
  ];

  const eventTypeOptions = [
    { value: 'career', label: 'Career Events' },
    { value: 'networking', label: 'Networking' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'social', label: 'Social Events' },
    { value: 'conference', label: 'Conferences' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateRange: { start: '', end: '' },
      department: 'all',
      location: 'all',
      eventTypes: [],
      capacity: { min: '', max: '' },
      onlyAvailable: false,
      featuredOnly: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />
      {/* Filter Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-lg z-50 md:relative md:bg-background md:border md:rounded-lg md:shadow-elevation-2 animate-slide-up md:animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border md:border-none">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Filter Events
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="md:hidden"
          />
        </div>

        {/* Filter Content */}
        <div className="p-4 max-h-96 overflow-y-auto md:max-h-none space-y-6">
          {/* Date Range */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Date Range</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                label="From"
                value={localFilters?.dateRange?.start}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...localFilters?.dateRange,
                  start: e?.target?.value
                })}
              />
              <Input
                type="date"
                label="To"
                value={localFilters?.dateRange?.end}
                onChange={(e) => handleFilterChange('dateRange', {
                  ...localFilters?.dateRange,
                  end: e?.target?.value
                })}
              />
            </div>
          </div>

          {/* Department */}
          <div className="space-y-3">
            <Select
              label="Department"
              options={departmentOptions}
              value={localFilters?.department}
              onChange={(value) => handleFilterChange('department', value)}
            />
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Select
              label="Location"
              options={locationOptions}
              value={localFilters?.location}
              onChange={(value) => handleFilterChange('location', value)}
            />
          </div>

          {/* Event Types */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Event Types</h4>
            <div className="space-y-2">
              {eventTypeOptions?.map((type) => (
                <Checkbox
                  key={type?.value}
                  label={type?.label}
                  checked={localFilters?.eventTypes?.includes(type?.value)}
                  onChange={(e) => {
                    const newTypes = e?.target?.checked
                      ? [...localFilters?.eventTypes, type?.value]
                      : localFilters?.eventTypes?.filter(t => t !== type?.value);
                    handleFilterChange('eventTypes', newTypes);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Capacity Range */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Capacity</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                label="Min"
                placeholder="0"
                value={localFilters?.capacity?.min}
                onChange={(e) => handleFilterChange('capacity', {
                  ...localFilters?.capacity,
                  min: e?.target?.value
                })}
              />
              <Input
                type="number"
                label="Max"
                placeholder="1000"
                value={localFilters?.capacity?.max}
                onChange={(e) => handleFilterChange('capacity', {
                  ...localFilters?.capacity,
                  max: e?.target?.value
                })}
              />
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Options</h4>
            <div className="space-y-2">
              <Checkbox
                label="Only show available events"
                checked={localFilters?.onlyAvailable}
                onChange={(e) => handleFilterChange('onlyAvailable', e?.target?.checked)}
              />
              <Checkbox
                label="Featured events only"
                checked={localFilters?.featuredOnly}
                onChange={(e) => handleFilterChange('featuredOnly', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1"
            >
              Clear All
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
      </div>
    </>
  );
};

export default EventFilters;