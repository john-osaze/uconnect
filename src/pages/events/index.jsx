import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContextualHeader from '../../components/ContextualHeader';
import BottomTabNavigation from '../../components/BottomTabNavigation';
import NavigationBreadcrumb from '../../components/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/Button';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';
import EventCalendar from './components/EventCalendar';
import EventSearch from './components/EventSearch';
import CategoryTabs from './components/CategoryTabs';
import ViewToggle from './components/ViewToggle';

const EventsListing = () => {
	const [currentView, setCurrentView] = useState('list');
	const [activeCategory, setActiveCategory] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Mock events data
	const mockEvents = [
		{
			id: 1,
			title: "Tech Career Fair 2024",
			description: "Connect with leading technology companies and explore exciting career opportunities in software development, data science, and cybersecurity.",
			date: "2024-09-15",
			startTime: "09:00",
			endTime: "17:00",
			location: "Main Campus - Student Center",
			type: "Career",
			organizer: "Career Services",
			image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
			attendeeCount: 245,
			capacity: 500,
			isRSVPed: false,
			featured: true
		},
		{
			id: 2,
			title: "Alumni Networking Mixer",
			description: "Join fellow alumni for an evening of networking, reconnecting, and sharing professional experiences over cocktails and appetizers.",
			date: "2024-09-20",
			startTime: "18:00",
			endTime: "21:00",
			location: "Downtown Alumni Center",
			type: "Alumni-only",
			organizer: "Alumni Association",
			image: "https://images.pexels.com/photos/1181302/pexels-photo-1181302.jpeg?auto=compress&cs=tinysrgb&w=800",
			attendeeCount: 89,
			capacity: 150,
			isRSVPed: true,
			featured: false
		},
		{
			id: 3,
			title: "Computer Science Research Symposium",
			description: "Explore cutting-edge research in artificial intelligence, machine learning, and quantum computing presented by faculty and graduate students.",
			date: "2024-09-25",
			startTime: "10:00",
			endTime: "16:00",
			location: "Engineering Building - Auditorium A",
			type: "Departmental",
			organizer: "CS Department",
			image: "https://images.pexels.com/photos/1181320/pexels-photo-1181320.jpeg?auto=compress&cs=tinysrgb&w=800",
			attendeeCount: 156,
			capacity: 200,
			isRSVPed: false,
			featured: true
		},
		{
			id: 4,
			title: "Homecoming Weekend Celebration",
			description: "Celebrate university traditions with a weekend full of activities including the parade, football game, and alumni gatherings.",
			date: "2024-10-05",
			startTime: "08:00",
			endTime: "23:00",
			location: "Campus Wide",
			type: "Social",
			organizer: "Student Activities",
			image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
			attendeeCount: 1250,
			capacity: 2000,
			isRSVPed: true,
			featured: true
		},
		{
			id: 5,
			title: "Entrepreneurship Workshop Series",
			description: "Learn from successful entrepreneurs about starting your own business, securing funding, and scaling your startup.",
			date: "2024-10-12",
			startTime: "14:00",
			endTime: "18:00",
			location: "Business School - Room 301",
			type: "Career",
			organizer: "Entrepreneurship Center",
			image: "https://images.pexels.com/photos/1290261/pexels-photo-1290261.jpeg?auto=compress&cs=tinysrgb&w=800",
			attendeeCount: 78,
			capacity: 100,
			isRSVPed: false,
			featured: false
		},
		{
			id: 6,
			title: "Medical Alumni Reunion",
			description: "Reconnect with classmates and celebrate achievements in the medical field. Includes dinner, awards ceremony, and networking.",
			date: "2024-10-18",
			startTime: "17:00",
			endTime: "22:00",
			location: "Medical Center - Conference Hall",
			type: "Alumni-only",
			organizer: "Medical Alumni Association",
			image: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=800",
			attendeeCount: 134,
			capacity: 180,
			isRSVPed: false,
			featured: false
		}
	];

	const [filters, setFilters] = useState({
		dateRange: { start: '', end: '' },
		department: 'all',
		location: 'all',
		eventTypes: [],
		capacity: { min: '', max: '' },
		onlyAvailable: false,
		featuredOnly: false
	});

	// Calculate event counts by category
	const eventCounts = {
		all: mockEvents?.length,
		career: mockEvents?.filter(e => e?.type === 'Career')?.length,
		alumniOnly: mockEvents?.filter(e => e?.type === 'Alumni-only')?.length,
		departmental: mockEvents?.filter(e => e?.type === 'Departmental')?.length,
		social: mockEvents?.filter(e => e?.type === 'Social')?.length
	};

	// Filter events based on active filters
	useEffect(() => {
		let filtered = [...mockEvents];

		// Filter by category
		if (activeCategory !== 'all') {
			const categoryMap = {
				'career': 'Career',
				'alumni-only': 'Alumni-only',
				'departmental': 'Departmental',
				'social': 'Social'
			};
			filtered = filtered?.filter(event => event?.type === categoryMap?.[activeCategory]);
		}

		// Filter by search query
		if (searchQuery) {
			filtered = filtered?.filter(event =>
				event?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
				event?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
				event?.organizer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
			);
		}

		// Apply additional filters
		if (filters?.featuredOnly) {
			filtered = filtered?.filter(event => event?.featured);
		}

		if (filters?.onlyAvailable) {
			filtered = filtered?.filter(event => event?.attendeeCount < event?.capacity);
		}

		// Filter by date range
		if (filters?.dateRange?.start) {
			filtered = filtered?.filter(event => event?.date >= filters?.dateRange?.start);
		}
		if (filters?.dateRange?.end) {
			filtered = filtered?.filter(event => event?.date <= filters?.dateRange?.end);
		}

		// Filter by selected date (for calendar view)
		if (selectedDate) {
			const selectedDateString = selectedDate?.toISOString()?.split('T')?.[0];
			filtered = filtered?.filter(event => event?.date === selectedDateString);
		}

		setFilteredEvents(filtered);
	}, [activeCategory, searchQuery, filters, selectedDate]);

	const handleRSVP = async (eventId) => {
		setIsLoading(true);
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Update event RSVP status
		const updatedEvents = mockEvents?.map(event => {
			if (event?.id === eventId) {
				return {
					...event,
					isRSVPed: !event?.isRSVPed,
					attendeeCount: event?.isRSVPed ? event?.attendeeCount - 1 : event?.attendeeCount + 1
				};
			}
			return event;
		});

		setIsLoading(false);
	};

	const handleAddToCalendar = (event) => {
		// Create calendar event URL (Google Calendar example)
		const startDate = new Date(`${event.date}T${event.startTime}`);
		const endDate = new Date(`${event.date}T${event.endTime}`);

		const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event?.title)}&dates=${startDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z/${endDate?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0]}Z&details=${encodeURIComponent(event?.description)}&location=${encodeURIComponent(event?.location)}`;

		window.open(calendarUrl, '_blank');
	};

	const handleShare = (event) => {
		if (navigator.share) {
			navigator.share({
				title: event?.title,
				text: event?.description,
				url: window.location?.href
			});
		} else {
			// Fallback to copying URL
			navigator.clipboard?.writeText(window.location?.href);
			// You could show a toast notification here
		}
	};

	const handleEventClick = (event) => {
		// Navigate to event details or open modal
		console.log('Event clicked:', event);
	};

	return (
		<>
			<Helmet>
				<title>Events - UConnect</title>
				<meta name="description" content="Discover university events, career fairs, alumni gatherings, and networking opportunities. Connect with your academic community." />
			</Helmet>
			<div className="min-h-screen bg-background">
				<ContextualHeader
					userRole="student"
					notificationCount={3}
					userName="Alex Johnson"
				/>

				<main className="pt-header pb-bottom-nav md:pb-0">
					<div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
						<NavigationBreadcrumb />

						{/* Page Header */}
						<div className="mb-6">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								<div>
									<h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
										University Events
									</h1>
									<p className="text-muted-foreground mt-1">
										Discover networking opportunities, career events, and alumni gatherings
									</p>
								</div>
								<div className="flex items-center space-x-3">
									<ViewToggle
										currentView={currentView}
										onViewChange={setCurrentView}
									/>
									<Button
										variant="outline"
										onClick={() => setIsFiltersOpen(true)}
										iconName="Filter"
										iconPosition="left"
										className="md:hidden"
									>
										Filters
									</Button>
								</div>
							</div>
						</div>

						{/* Search Bar */}
						<div className="mb-6">
							<EventSearch
								onSearch={setSearchQuery}
								onClear={() => setSearchQuery('')}
								initialQuery={searchQuery}
							/>
						</div>

						{/* Category Tabs */}
						<CategoryTabs
							activeCategory={activeCategory}
							onCategoryChange={setActiveCategory}
							eventCounts={eventCounts}
						/>

						{/* Main Content */}
						<div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mt-6">
							{/* Desktop Filters Sidebar */}
							<div className="hidden lg:block lg:col-span-2">
								<div className="sticky top-24">
									<EventFilters
										filters={filters}
										onFiltersChange={setFilters}
										onClose={() => { }}
										isOpen={true}
									/>
								</div>
							</div>

							{/* Events Content */}
							<div className="lg:col-span-4">
								{currentView === 'list' ? (
									<div className="space-y-6">
										{/* Results Summary */}
										<div className="flex items-center justify-between">
											<p className="text-sm text-muted-foreground">
												Showing {filteredEvents?.length} of {mockEvents?.length} events
											</p>
											{searchQuery && (
												<Button
													variant="ghost"
													size="sm"
													onClick={() => setSearchQuery('')}
													iconName="X"
													iconPosition="left"
												>
													Clear search
												</Button>
											)}
										</div>

										{/* Events Grid */}
										{filteredEvents?.length > 0 ? (
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												{filteredEvents?.map((event) => (
													<EventCard
														key={event?.id}
														event={event}
														onRSVP={handleRSVP}
														onAddToCalendar={handleAddToCalendar}
														onShare={handleShare}
													/>
												))}
											</div>
										) : (
											<div className="text-center py-12">
												<Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
												<h3 className="font-heading font-medium text-lg text-foreground mb-2">
													No events found
												</h3>
												<p className="text-muted-foreground mb-4">
													Try adjusting your search or filter criteria
												</p>
												<Button
													variant="outline"
													onClick={() => {
														setSearchQuery('');
														setActiveCategory('all');
														setFilters({
															dateRange: { start: '', end: '' },
															department: 'all',
															location: 'all',
															eventTypes: [],
															capacity: { min: '', max: '' },
															onlyAvailable: false,
															featuredOnly: false
														});
													}}
												>
													Clear all filters
												</Button>
											</div>
										)}
									</div>
								) : (
									<div className="space-y-6">
										<EventCalendar
											events={filteredEvents}
											onEventClick={handleEventClick}
											selectedDate={selectedDate}
											onDateSelect={setSelectedDate}
										/>

										{/* Selected Date Events */}
										{selectedDate && (
											<div className="space-y-4">
												<div className="flex items-center justify-between">
													<h3 className="font-heading font-semibold text-lg text-foreground">
														Events on {selectedDate?.toLocaleDateString('en-US', {
															weekday: 'long',
															year: 'numeric',
															month: 'long',
															day: 'numeric'
														})}
													</h3>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => setSelectedDate(null)}
														iconName="X"
													>
														Clear
													</Button>
												</div>

												{filteredEvents?.length > 0 ? (
													<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
														{filteredEvents?.map((event) => (
															<EventCard
																key={event?.id}
																event={event}
																onRSVP={handleRSVP}
																onAddToCalendar={handleAddToCalendar}
																onShare={handleShare}
															/>
														))}
													</div>
												) : (
													<p className="text-muted-foreground text-center py-8">
														No events scheduled for this date
													</p>
												)}
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</main>

				{/* Mobile Filters */}
				<EventFilters
					filters={filters}
					onFiltersChange={setFilters}
					onClose={() => setIsFiltersOpen(false)}
					isOpen={isFiltersOpen}
				/>

				<BottomTabNavigation userRole="student" />
			</div>
		</>
	);
};

export default EventsListing;