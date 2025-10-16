import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from './AppIcon';


const ContextualHeader = ({ userRole = 'student', notificationCount = 0, userName = 'John Doe' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationOpen(false);
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false);
  };

  const handleOutsideClick = () => {
    setIsDropdownOpen(false);
    setIsNotificationOpen(false);
  };

  const getPageTitle = () => {
    const path = location?.pathname;
    switch (path) {
      case '/student-dashboard':
        return 'Student Dashboard';
      case '/alumni-dashboard':
        return 'Alumni Dashboard';
      case '/profile':
        return 'Profile Management';
      case '/jobs':
        return 'Job Board';
      case '/events':
        return 'Events';
      case '/associations':
        return 'Departmental Associations';
      default:
        return 'UConnect';
    }
  };

  return (
    <>
      {/* Overlay for mobile dropdown */}
      {(isDropdownOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-dropdown md:hidden"
          onClick={handleOutsideClick}
        />
      )}
      <header className="sticky top-0 left-0 right-0 bg-card border-b border-border z-header">
        <div className="flex items-center justify-between h-header px-4 md:px-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to={userRole === 'student' ? '/student-dashboard' : '/alumni-dashboard'} className="flex items-center space-x-3">
                <div className="logo">
                  <img src="images/logo-black.png" alt="Logo" width={125} height={50} />
                </div>
            </Link>
          </div>

          {/* Page Title - Hidden on mobile */}
          <div className="hidden md:block">
            <h2 className="font-heading font-medium text-foreground">{getPageTitle()}</h2>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationToggle}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-smooth  rounded-md"
                aria-label="Notifications"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 z-dropdown animate-fade-in">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-heading font-medium text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notificationCount > 0 ? (
                      <div className="p-2">
                        <div className="p-3 hover:bg-muted rounded-md transition-smooth">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm text-foreground font-medium">New mentorship request</p>
                              <p className="text-xs text-muted-foreground mt-1">Sarah Johnson wants to connect with you</p>
                              <p className="text-xs text-muted-foreground font-caption mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted rounded-md transition-smooth">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm text-foreground font-medium">Event reminder</p>
                              <p className="text-xs text-muted-foreground mt-1">Career Fair starts in 1 hour</p>
                              <p className="text-xs text-muted-foreground font-caption mt-1">1 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm">No new notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-smooth">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-muted transition-smooth"
                aria-label="User menu"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">
                    {userName?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground font-caption capitalize">{userRole}</p>
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </button>

              {/* User Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-popover border-border rounded-lg shadow-elevation-2 z-dropdown animate-fade-in">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium text-foreground">{userName}</p>
                    <p className="text-sm text-muted-foreground font-caption capitalize">{userRole}</p>
                  </div>
                  <div className="p-1">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Icon name="User" size={16} />
                      <span>Profile Settings</span>
                    </Link>
                    <button className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth w-full text-left">
                      <Icon name="Settings" size={16} />
                      <span>Account Settings</span>
                    </button>
                    <button className="flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth w-full text-left">
                      <Icon name="HelpCircle" size={16} />
                      <span>Help & Support</span>
                    </button>
                  </div>
                  <div className="p-1 border-t border-border">
                    <button className="flex items-center space-x-3 px-3 py-2 text-sm text-destructive hover:bg-muted rounded-md transition-smooth w-full text-left"
                    onClick={() => navigate('/')}>
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default ContextualHeader;