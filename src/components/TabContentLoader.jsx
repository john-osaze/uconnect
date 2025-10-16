import React, { Suspense } from 'react';
import Icon from './AppIcon';

const TabContentLoader = ({ 
  children, 
  isLoading = false, 
  error = null, 
  loadingMessage = "Loading content...",
  errorMessage = "Something went wrong. Please try again.",
  onRetry = null 
}) => {
  
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded-md w-48"></div>
        <div className="h-10 bg-muted rounded-md w-32"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
        <Icon name="AlertCircle" size={32} className="text-error" />
      </div>
      <h3 className="font-heading font-medium text-lg text-foreground mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {errorMessage}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth focus-ring"
        >
          <Icon name="RefreshCw" size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
      <p className="text-muted-foreground font-caption">{loadingMessage}</p>
    </div>
  );

  if (error) {
    return <ErrorState />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="animate-fade-in">
        {children}
      </div>
    </Suspense>
  );
};

export default TabContentLoader;