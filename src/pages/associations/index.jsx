import React, { useState, useEffect } from 'react';
import ContextualHeader from '@/components/ContextualHeader';
import BottomTabNavigation from '@/components/BottomTabNavigation';
import NavigationBreadcrumb from '@/components/NavigationBreadcrumb';
import AssociationCard from './components/AssociationCard';
import AssociationFilters from './components/AssociationFilters';
import JoinedAssociationsSidebar from './components/JoinedAssociationsSidebar';
import AssociationDetailModal from './components/AssociationDetailModal';
import Icon from '@/components/AppIcon';

const DepartmentalAssociations = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        department: 'all',
        activityLevel: 'all',
        membershipStatus: 'all',
        sortBy: 'name'
    });
    const [selectedAssociation, setSelectedAssociation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [joinedAssociationIds, setJoinedAssociationIds] = useState([1, 3, 5]); // Mock joined associations

    // Mock data for associations
    const mockAssociations = [
        {
            id: 1,
            name: "Computer Science Association",
            department: "Computer Science",
           logo: "https://images.pexels.com/photos/5668771/pexels-photo-5668771.jpeg?w=100&h=100&fit=crop&crop=center",
            description: "Connect with fellow CS students and alumni. Participate in coding competitions, tech talks, and networking events with industry professionals.",
            memberCount: 1247,
            recentActivity: "New internship opportunities posted by Microsoft alumni",
            lastActivityTime: new Date(Date.now() - 3600000), // 1 hour ago
            upcomingEvents: 3,
            activityLevel: "high",
            alumniRatio: 35,
            unreadNotifications: 5
        },
        {
            id: 2,
            name: "Engineering Student Society",
            department: "Engineering",
           logo: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?w=100&h=100&fit=crop&crop=center",
            description: "The premier organization for engineering students across all disciplines. Join us for professional development, project collaborations, and career guidance.",
            memberCount: 892,
            recentActivity: "Career fair registration now open - 50+ companies attending",
            lastActivityTime: new Date(Date.now() - 7200000), // 2 hours ago
            upcomingEvents: 2,
            activityLevel: "high",
            alumniRatio: 42
        },
        {
            id: 3,
            name: "Business Administration Club",
            department: "Business Administration",
             logo: "https://images.pexels.com/photos/5668773/pexels-photo-5668773.jpeg?w=100&h=100&fit=crop&crop=center",
            description: "Develop your business acumen through case competitions, guest speaker series, and networking with successful alumni entrepreneurs and executives.",
            memberCount: 654,
            recentActivity: "Alumni panel discussion on startup funding strategies",
            lastActivityTime: new Date(Date.now() - 14400000), // 4 hours ago
            upcomingEvents: 1,
            activityLevel: "medium",
            alumniRatio: 28,
            unreadNotifications: 2
        },
        {
            id: 4,
            name: "Medical Student Association",
            department: "Medicine",
             logo: "https://images.pexels.com/photos/5668774/pexels-photo-5668774.jpeg?w=100&h=100&fit=crop&crop=center",
            description: "Supporting future healthcare professionals through mentorship programs, research opportunities, and clinical experience sharing.",
            memberCount: 423,
            recentActivity: "Residency application workshop scheduled for next week",
            lastActivityTime: new Date(Date.now() - 21600000), // 6 hours ago
            upcomingEvents: 4,
            activityLevel: "high",
            alumniRatio: 55
        },
        {
            id: 5,
            name: "Law Society",
            department: "Law",
            logo: "https://images.pexels.com/photos/5668775/pexels-photo-5668775.jpeg?w=100&h=100&fit=crop&crop=center",
            description: "Connecting law students with practicing attorneys and judges. Participate in moot court competitions, legal clinics, and bar exam preparation.",
            memberCount: 312,
            recentActivity: "Supreme Court visit organized for constitutional law students",
            lastActivityTime: new Date(Date.now() - 28800000), // 8 hours ago
            upcomingEvents: 2,
            activityLevel: "medium",
            alumniRatio: 48,
            unreadNotifications: 1
        },
        {
            id: 6,
            name: "Arts & Humanities Society",
            department: "Arts & Humanities",
             logo: "https://images.pexels.com/photos/5668776/pexels-photo-5668776.jpeg?w=100&h=100&fit=crop&crop=center",
            description: "Celebrating creativity and critical thinking across literature, philosophy, history, and fine arts. Join our community of scholars and artists.",
            memberCount: 287,
            recentActivity: "Student art exhibition opening next Friday",
            lastActivityTime: new Date(Date.now() - 43200000), // 12 hours ago
            upcomingEvents: 1,
            activityLevel: "low",
            alumniRatio: 22
        },
        {
            id: 7,
            name: "Natural Sciences Coalition",
            department: "Natural Sciences",
            logo: "https://images.pexels.com/photos/5668777/pexels-photo-5668777.jpeg?w=100&h=100&fit=crop&crop=center",
            description: "Advancing scientific research and education across biology, chemistry, physics, and environmental sciences through collaborative projects.",
            memberCount: 445,
            recentActivity: "Research symposium abstracts due this Friday",
            lastActivityTime: new Date(Date.now() - 86400000), // 1 day ago
            upcomingEvents: 3,
            activityLevel: "medium",
            alumniRatio: 38
        },
        {
            id: 8,
            name: "Education Future Leaders",
            department: "Education",
            logo: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?w=100&h=100&fit=crop&crop=center",
            description: "Preparing tomorrow's educators through teaching workshops, classroom observation programs, and mentorship with experienced teachers.",
            memberCount: 198,
            recentActivity: "Teaching certification workshop registration open",
            lastActivityTime: new Date(Date.now() - 172800000), // 2 days ago
            upcomingEvents: 2,
            activityLevel: "low",
            alumniRatio: 45
        }
    ];

    // Filter and sort associations
    const filteredAssociations = mockAssociations?.filter(association => {
        const matchesSearch =
            association?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
            association?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
            association?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

        const matchesDepartment =
            filters?.department === 'all' || association?.department?.toLowerCase()?.replace(/\s+/g, '-') === filters?.department;

        const matchesActivity =
            filters?.activityLevel === 'all' ||
            association?.activityLevel === filters?.activityLevel;

        const matchesMembership =
            filters?.membershipStatus === 'all' ||
            (filters?.membershipStatus === 'joined' && joinedAssociationIds?.includes(association?.id)) ||
            (filters?.membershipStatus === 'available' && !joinedAssociationIds?.includes(association?.id));

        return matchesSearch && matchesDepartment && matchesActivity && matchesMembership;
    })?.sort((a, b) => {
        switch (filters?.sortBy) {
            case 'members':
                return b?.memberCount - a?.memberCount;
            case 'activity':
                const activityOrder = { high: 3, medium: 2, low: 1 };
                return activityOrder?.[b?.activityLevel] - activityOrder?.[a?.activityLevel];
            case 'recent':
                return new Date(b.lastActivityTime) - new Date(a.lastActivityTime);
            case 'name':
            default:
                return a?.name?.localeCompare(b?.name);
        }
    });

    // Get joined associations
    const joinedAssociations = mockAssociations?.filter(assoc =>
        joinedAssociationIds?.includes(assoc?.id)
    );

    const handleJoinAssociation = (association, notificationPreferences = {}) => {
        setJoinedAssociationIds(prev => [...prev, association?.id]);
        setIsModalOpen(false);
        // Here you would typically make an API call to join the association
        console.log('Joining association:', association?.name, 'with preferences:', notificationPreferences);
    };

    const handleViewAssociation = (association) => {
        setSelectedAssociation(association);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAssociation(null);
    };

    const isAssociationJoined = (associationId) => {
        return joinedAssociationIds?.includes(associationId);
    };

    return (
        <div className="min-h-screen bg-background">
            <ContextualHeader
                userRole="student"
                notificationCount={3}
                userName="Alex Thompson"
            />
            <main className="pt-header pb-bottom-nav md:pb-0">
                <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
                    <NavigationBreadcrumb />

                    {/* Page Header */}
                    <div className="mb-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <Icon name="Users" size={24} className="text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="font-heading font-bold text-2xl text-foreground">
                                    Departmental Associations
                                </h1>
                                <p className="text-muted-foreground">
                                    Connect with your academic community and build professional networks
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <AssociationFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        totalCount={mockAssociations?.length}
                        filteredCount={filteredAssociations?.length}
                    />

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl justify-self-center">
                        {/* Associations List */}
                        <div className="lg:col-span-8">
                            {filteredAssociations?.length > 0 ? (
                                <>
                                    {/* Joined Associations Priority Section */}
                                    {joinedAssociations?.length > 0 && filters?.membershipStatus === 'all' && (
                                        <div className="mb-8">
                                            <div className="flex items-center space-x-2 mb-4">
                                                <Icon name="Star" size={20} className="text-accent" />
                                                <h2 className="font-heading font-semibold text-lg text-foreground">
                                                    Your Associations
                                                </h2>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                {joinedAssociations?.slice(0, 4)?.map((association) => (
                                                    <AssociationCard
                                                        key={association?.id}
                                                        association={association}
                                                        onJoin={handleJoinAssociation}
                                                        onView={handleViewAssociation}
                                                        isJoined={true}
                                                    />
                                                ))}
                                            </div>
                                            <div className="border-t border-border pt-6">
                                                <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
                                                    Discover More Associations
                                                </h2>
                                            </div>
                                        </div>
                                    )}

                                    {/* All Associations Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {filteredAssociations?.filter(assoc => filters?.membershipStatus === 'all' ? !joinedAssociationIds?.includes(assoc?.id) : true)?.map((association) => (
                                            <AssociationCard
                                                key={association?.id}
                                                association={association}
                                                onJoin={handleJoinAssociation}
                                                onView={handleViewAssociation}
                                                isJoined={isAssociationJoined(association?.id)}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon name="Search" size={32} className="text-muted-foreground" />
                                    </div>
                                    <h3 className="font-heading font-medium text-lg text-foreground mb-2">
                                        No associations found
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        Try adjusting your search criteria or filters to find relevant associations.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setFilters({
                                                department: 'all',
                                                activityLevel: 'all',
                                                membershipStatus: 'all',
                                                sortBy: 'name'
                                            });
                                        }}
                                        className="text-primary hover:text-primary/80 transition-smooth"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sidebar - Desktop Only */}
                        <div className="hidden lg:block lg:col-span-4">
                            <div className="sticky top-header-offset">
                                <JoinedAssociationsSidebar
                                    joinedAssociations={joinedAssociations}
                                    onViewAssociation={handleViewAssociation}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <BottomTabNavigation userRole="student" />
            {/* Association Detail Modal */}
            <AssociationDetailModal
                association={selectedAssociation}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onJoin={handleJoinAssociation}
                isJoined={selectedAssociation ? isAssociationJoined(selectedAssociation?.id) : false}
            />
        </div>
    );
};

export default DepartmentalAssociations;