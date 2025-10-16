import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const NavigationBreadcrumb = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  const getDefaultBreadcrumbs = () => {
    const path = location?.pathname;
    const segments = path?.split('/')?.filter(Boolean);
    
    const breadcrumbMap = {
      'student-dashboard': { label: 'Dashboard', path: '/student-dashboard' },
      'alumni-dashboard': { label: 'Dashboard', path: '/alumni-dashboard' },
      'profile-management': { label: 'Profile', path: '/profile' },
      'job-board': { label: 'Jobs', path: '/jobs' },
      'events-listing': { label: 'Events', path: '/events' },
      'departmental-associations': { label: 'Communities', path: '/associations' }
    };

    const breadcrumbs = [
      { label: 'Home', path: '/', isHome: true }
    ];

    segments?.forEach((segment, index) => {
      const segmentPath = '/' + segments?.slice(0, index + 1)?.join('/');
      const breadcrumbInfo = breadcrumbMap?.[segment];
      
      if (breadcrumbInfo) {
        breadcrumbs?.push({
          label: breadcrumbInfo?.label,
          path: segmentPath,
          isActive: index === segments?.length - 1
        });
      } else {
        // Handle dynamic segments or unknown paths
        const formattedLabel = segment?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
        
        breadcrumbs?.push({
          label: formattedLabel,
          path: segmentPath,
          isActive: index === segments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = customBreadcrumbs || getDefaultBreadcrumbs();

  // Don't show breadcrumbs for root paths or single-level navigation
  if (breadcrumbs?.length <= 2) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-1" 
              />
            )}
            
            {crumb?.isActive ? (
              <span className="text-foreground font-medium font-caption">
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="text-muted-foreground hover:text-foreground transition-smooth font-caption"
              >
                {crumb?.isHome ? (
                  <div className="flex items-center space-x-1">
                    <Icon name="Home" size={14} />
                    <span className="hidden sm:inline">{crumb?.label}</span>
                  </div>
                ) : (
                  crumb?.label
                )}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumb;