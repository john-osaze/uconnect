import React, { useState, useEffect } from 'react';
import Icon from '@/components/AppIcon';
import Input from '@/components/Input';
import Button from '@/components/Button';

const EventSearch = ({ onSearch, onClear, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchSuggestions = [
    'Career Fair',
    'Networking Event',
    'Alumni Meetup',
    'Tech Workshop',
    'Business Seminar',
    'Homecoming',
    'Graduation Ceremony',
    'Research Symposium',
    'Job Interview Workshop',
    'Industry Panel'
  ];

  useEffect(() => {
    if (query?.length > 0) {
      const filtered = searchSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onClear();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
    if (e?.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search events, speakers, or topics..."
            value={query}
            onChange={(e) => setQuery(e?.target?.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => query?.length > 0 && setShowSuggestions(true)}
            className="pr-10"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {query ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                iconName="X"
                className="h-6 w-6 p-0"
              />
            ) : (
              <Icon name="Search" size={16} className="text-muted-foreground" />
            )}
          </div>
        </div>
        
        <Button
          variant="default"
          onClick={() => handleSearch()}
          iconName="Search"
          iconPosition="left"
          className="hidden sm:flex"
        >
          Search
        </Button>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevation-2 z-50 animate-fade-in">
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
              Suggestions
            </div>
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth flex items-center space-x-2"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default EventSearch;