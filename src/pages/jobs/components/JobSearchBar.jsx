import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Input from '@/components/Input';
import Button from '@/components/Button';

const JobSearchBar = ({ onSearch, onFilterToggle, activeFiltersCount = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e?.target?.value);
    // Trigger search on every keystroke for real-time results
    onSearch(e?.target?.value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search jobs, companies, or keywords..."
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onFilterToggle}
            iconName="Filter"
            iconPosition="left"
            iconSize={18}
            className="relative"
          >
            <span className="hidden sm:inline">Filters</span>
            <span className="sm:hidden">Filter</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          
          <Button
            type="submit"
            variant="default"
            iconName="Search"
            iconSize={18}
            className="px-4"
          >
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobSearchBar;