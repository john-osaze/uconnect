import React from 'react';
import Select from '@/components/Select';

const SortOptions = ({ sortBy, onSortChange, resultsCount = 0 }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'deadline', label: 'Deadline Approaching' },
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'company', label: 'Company A-Z' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground font-caption">
          {resultsCount > 0 ? (
            <>Showing <span className="font-medium text-foreground">{resultsCount}</span> job{resultsCount !== 1 ? 's' : ''}</>
          ) : (
            'No jobs found'
          )}
        </span>
      </div>
      
      <div className="flex items-center space-x-3">
        <span className="text-sm text-muted-foreground font-caption whitespace-nowrap">
          Sort by:
        </span>
        <div className="min-w-[180px]">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Select sort option"
          />
        </div>
      </div>
    </div>
  );
};

export default SortOptions;