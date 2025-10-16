import React, { useState, useEffect } from 'react';
import ContextualHeader from '@/components/ContextualHeader';
import BottomTabNavigation from '@/components/BottomTabNavigation';
import NavigationBreadcrumb from '@/components/NavigationBreadcrumb';
import WelcomeHeader from './components/WelcomeHeader';
import QuickActions from './components/QuickActions';
import FeaturedMentors from './components/FeaturedMentors';
import RecentJobs from './components/RecentJobs';
import UpcomingEvents from './components/UpcomingEvents';
import AssociationUpdates from './components/AssociationUpdates';
import Icon from '@/components/AppIcon';

const StudentDashboard = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    // Mock user data
    const userData = {
        name: "Alex Johnson",
        email: "alex.johnson@university.edu",
        department: "Computer Science",
        year: "Junior",
        profileCompletion: 75,
        activeMentorships: 2,
        notificationCount: 3
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLastRefresh(new Date());
        setIsRefreshing(false);
    };

    // Pull-to-refresh functionality
    useEffect(() => {
        let startY = 0;
        let currentY = 0;
        let pullDistance = 0;
        const threshold = 100;

        const handleTouchStart = (e) => {
            if (window.scrollY === 0) {
                startY = e?.touches?.[0]?.clientY;
            }
        };

        const handleTouchMove = (e) => {
            if (window.scrollY === 0 && startY > 0) {
                currentY = e?.touches?.[0]?.clientY;
                pullDistance = currentY - startY;

                if (pullDistance > 0 && pullDistance < threshold * 2) {
                    e?.preventDefault();
                }
            }
        };

        const handleTouchEnd = () => {
            if (pullDistance > threshold && !isRefreshing) {
                handleRefresh();
            }
            startY = 0;
            currentY = 0;
            pullDistance = 0;
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isRefreshing]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <ContextualHeader
                userRole="student"
                userName={userData?.name}
                notificationCount={userData?.notificationCount}
            />
            {/* Main Content */}
            <main className="pt-header pb-bottom-nav md:pb-0">
                <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Breadcrumb Navigation */}
                    <NavigationBreadcrumb />

                    {/* Pull to Refresh Indicator */}
                    {isRefreshing && (
                        <div className="flex items-center justify-center py-4 mb-4">
                            <div className="flex items-center space-x-2 text-primary">
                                <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <span className="text-sm font-caption">Refreshing...</span>
                            </div>
                        </div>
                    )}

                    {/* Desktop Layout */}
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-8">
                            {/* Welcome Header */}
                            <WelcomeHeader
                                userName={userData?.name}
                                profileCompletion={userData?.profileCompletion}
                                activeMentorships={userData?.activeMentorships}
                            />

                            {/* Quick Actions */}
                            <QuickActions />

                            {/* Featured Mentors */}
                            <FeaturedMentors />

                            {/* Recent Jobs */}
                            <RecentJobs />

                            {/* Association Updates - Mobile Only */}
                            <div className="lg:hidden">
                                <AssociationUpdates />
                            </div>
                        </div>

                        {/* Sidebar - Desktop Only */}
                        <div className="hidden lg:block lg:col-span-4 space-y-6">
                            {/* Quick Stats */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h3 className="font-heading font-semibold text-foreground mb-4">
                                    Your Progress
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Icon name="User" size={16} className="text-primary" />
                                            <span className="text-sm text-muted-foreground">Profile</span>
                                        </div>
                                        <span className="text-sm font-medium text-foreground">
                                            {userData?.profileCompletion}%
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Icon name="Users" size={16} className="text-warning" />
                                            <span className="text-sm text-muted-foreground">Mentorships</span>
                                        </div>
                                        <span className="text-sm font-medium text-foreground">
                                            {userData?.activeMentorships} active
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Icon name="Calendar" size={16} className="text-destructive" />
                                            <span className="text-sm text-muted-foreground">Events</span>
                                        </div>
                                        <span className="text-sm font-medium text-foreground">
                                            3 upcoming
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Icon name="Briefcase" size={16} className="text-success" />
                                            <span className="text-sm text-muted-foreground">Jobs</span>
                                        </div>
                                        <span className="text-sm font-medium text-foreground">
                                            2 processing
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Events Sidebar */}
                            <div className="bg-card border border-border rounded-lg p-4">
                                <h3 className="font-heading font-semibold text-foreground mb-4">
                                    This Week's Events
                                </h3>
                                <UpcomingEvents />
                            </div>

                            {/* Association Updates Sidebar */}
                            <div className="bg-card border border-border rounded-lg p-4">
                                <h3 className="font-heading font-semibold text-foreground mb-4">
                                    Community Updates
                                </h3>
                                <AssociationUpdates />
                            </div>      
                        </div>
                    </div>

                    {/* Mobile Events Section */}
                    <div className="lg:hidden">
                        <UpcomingEvents />
                    </div>

                    {/* Last Updated Info */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-muted-foreground font-caption">
                            Last updated: {lastRefresh?.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>
            </main>
            {/* Bottom Navigation */}
            <BottomTabNavigation userRole="student" />
        </div>
    );
};

export default StudentDashboard;