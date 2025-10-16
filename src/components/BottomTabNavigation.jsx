import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const BottomTabNavigation = ({ userRole = 'student' }) => {
  const location = useLocation();

  const getNavigationTabs = () => {
    const baseTabs = [
      {
        id: 'home',
        label: 'Home',
        icon: 'Home',
        path: userRole === 'student' ? '/student-dashboard' : '/alumni-dashboard',
        activePaths: ['/student-dashboard', '/alumni-dashboard']
      },
      {
        id: 'discover',
        label: 'Discover',
        icon: 'Briefcase',
        path: '/jobs',
        activePaths: ['/jobs', '/events']
      },
      {
        id: 'communities',
        label: 'Communities',
        icon: 'Users',
        path: '/associations',
        activePaths: ['/associations']
      },
      {
        id: 'mentors',
        label: 'Mentors',
        icon: 'GraduationCap',
        path: '/mentors',
        activePaths: ['/mentors']
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: 'User',
        path: '/profile',
        activePaths: ['/profile']
      }
    ];

    return baseTabs;
  };

  const isTabActive = (tab) => {
    return tab?.activePaths?.includes(location?.pathname);
  };

  const tabs = getNavigationTabs();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-gray-300 border-solid z-bottom-nav md:fixed md:bottom-0 md:border-t md:border-b md:bg-background">
      <div className="flex items-center justify-around h-bottom-nav md:justify-center md:space-x-8 md:h-16">
        {tabs?.map((tab) => {
          const isActive = isTabActive(tab);
          
          return (
            <Link
              key={tab?.id}
              to={tab?.path}
              className={`flex flex-col items-center justify-center space-y-1 px-2 py-2 min-w-0 flex-1 md:flex-initial md:flex-row md:space-y-0 md:space-x-2 md:px-4 md:py-2 rounded-lg transition-smooth group ${
                isActive
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={tab?.label}
            >
              <div className={`relative ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                <Icon name={tab?.icon} size={20} />
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full md:hidden"></div>
                )}
              </div>
              <span className={`text-xs font-medium truncate md:text-sm ${
                isActive
                  ? 'text-primary' :'text-muted-foreground group-hover:text-foreground'
              }`}>
                {tab?.label}
              </span>
              {isActive && (
                <div className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;