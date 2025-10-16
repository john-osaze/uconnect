import React, { useState, useEffect, useMemo } from 'react';
import ContextualHeader from '../../components/ContextualHeader';
import BottomTabNavigation from '../../components/BottomTabNavigation';
import NavigationBreadcrumb from '../../components/NavigationBreadcrumb';
import JobCard from './components/JobCard';
import JobFilters from './components/JobFilters';
import JobSearchBar from './components/JobSearchBar';
import ActiveFilters from './components/ActiveFilters';
import SavedJobsPanel from './components/SavedJobsPanel';
import JobDetailModal from './components/JobDetailModal';
import SortOptions from './components/SortOptions';
import Icon from '../../components/AppIcon';

const JobBoard = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [selectedJob, setSelectedJob] = useState(null);
	const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
	const [savedJobIds, setSavedJobIds] = useState(new Set([1, 3, 7]));
	const [sortBy, setSortBy] = useState('newest');
	const [filters, setFilters] = useState({
		jobType: 'all',
		location: 'all',
		department: 'all',
		experienceLevel: 'all',
		deadline: 'all',
		salaryRange: false,
		alumniPosted: false
	});

	// Mock job data
	const mockJobs = [
		{
			id: 1,
			title: "Software Engineer Intern",
			company: {
				name: "Google",
				logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=center",
				description: `Google is a multinational technology company that specializes in Internet-related services and products. We're committed to building products that help create opportunities for everyone, whether down the street or across the globe.\n\nOur mission is to organize the world's information and make it universally accessible and useful. We believe that the most interesting, challenging, and meaningful work happens when people with different perspectives come together.`
			},
			location: "Mountain View, CA",
			type: "internship",
			experienceLevel: "Entry Level",
			salaryRange: "$8,000 - $10,000/month",
			deadline: "2025-09-15",
			postedDate: "2025-08-20",
			tags: ["JavaScript", "React", "Python", "Machine Learning"],
			description: `Join Google's engineering team as a Software Engineer Intern and work on products that impact billions of users worldwide. You'll collaborate with experienced engineers on real projects that matter.\n\nAs an intern, you'll have the opportunity to:\n• Work on cutting-edge technology projects\n• Collaborate with world-class engineers\n• Attend tech talks and networking events\n• Receive mentorship from senior engineers\n• Contribute to open-source projects\n\nThis internship offers hands-on experience with large-scale systems, machine learning, and modern web technologies. You'll be part of a team that values innovation, collaboration, and technical excellence.`,
			requirements: [
				"Currently pursuing a Bachelor\'s or Master\'s degree in Computer Science or related field",
				"Strong programming skills in at least one language (Python, Java, C++, JavaScript)",
				"Understanding of data structures and algorithms",
				"Experience with web development frameworks (React, Angular, or Vue.js preferred)",
				"Excellent problem-solving and communication skills",
				"Ability to work collaboratively in a team environment"
			],
			postedBy: null
		},
		{
			id: 2,
			title: "Marketing Coordinator",
			company: {
				name: "Microsoft",
				logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop&crop=center",
				description: `Microsoft is a leading technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.\n\nWe empower every person and every organization on the planet to achieve more. Our culture is centered on embracing a growth mindset, a theme of inspiring excellence, and encouraging teams and leaders to bring their best each day.`
			},
			location: "Seattle, WA",
			type: "full-time",
			experienceLevel: "Mid Level",
			salaryRange: "$75,000 - $95,000/year",
			deadline: "2025-09-30",
			postedDate: "2025-08-25",
			tags: ["Digital Marketing", "Content Strategy", "Analytics", "Social Media"],
			description: `We're seeking a dynamic Marketing Coordinator to join our growing marketing team. You'll play a key role in developing and executing marketing campaigns that drive brand awareness and customer engagement.\n\nKey responsibilities include:\n• Develop and implement comprehensive marketing strategies\n• Manage social media channels and content calendar\n• Analyze marketing performance and provide insights\n• Coordinate with cross-functional teams on product launches\n• Create compelling marketing materials and presentations\n\nThis role offers excellent growth opportunities in a fast-paced, innovative environment where your ideas can make a real impact.`,
			requirements: [
				"Bachelor's degree in Marketing, Communications, or related field",
				"2-3 years of experience in digital marketing or related role",
				"Proficiency in marketing automation tools and analytics platforms",
				"Strong written and verbal communication skills",
				"Experience with social media management and content creation",
				"Analytical mindset with ability to interpret data and metrics"
			],
			postedBy: {
				type: 'alumni',
				name: 'Sarah Johnson',
				graduationYear: '2019',
				department: 'Business Administration'
			}
		},
		{
			id: 3,
			title: "UX Designer",
			company: {
				name: "Apple",
				logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=100&h=100&fit=crop&crop=center",
				description: `Apple is a multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services. We're committed to creating products that enrich people's lives and help them accomplish their dreams.\n\nAt Apple, we believe that great design is not just what it looks like and feels like — great design is how it works. We're looking for passionate individuals who share our commitment to innovation and excellence.`
			},
			location: "Cupertino, CA",
			type: "full-time",
			experienceLevel: "Senior Level",
			salaryRange: "$120,000 - $160,000/year",
			deadline: "2025-09-10",
			postedDate: "2025-08-18",
			tags: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
			description: `Join Apple's world-class design team and help create intuitive, beautiful experiences for millions of users. As a UX Designer, you'll work on products that define the future of technology.\n\nYou'll be responsible for:\n• Designing user experiences for Apple's ecosystem of products\n• Conducting user research and usability testing\n• Creating wireframes, prototypes, and high-fidelity designs\n• Collaborating with engineering and product teams\n• Advocating for user-centered design principles\n\nThis is an opportunity to work with cutting-edge technology and contribute to products that impact users worldwide.`,
			requirements: [
				"Bachelor's degree in Design, HCI, or related field", "5+ years of experience in UX/UI design", "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)", "Strong portfolio demonstrating design thinking and problem-solving", "Experience with user research methodologies", "Excellent presentation and communication skills"
			],
			postedBy: null
		},
		{
			id: 4,
			title: "Data Analyst",
			company: {
				name: "Netflix", logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop&crop=center",
				description: `Netflix is the world's leading streaming entertainment service with over 230 million paid memberships in more than 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages.\n\nWe're a company built on the foundation of continuous learning and innovation. Our culture values freedom, responsibility, and the pursuit of excellence in everything we do.`
			},
			location: "Los Gatos, CA", type: "full-time", experienceLevel: "Entry Level", salaryRange: "$85,000 - $110,000/year", deadline: "2025-09-20", postedDate: "2025-08-22",
			tags: ["SQL", "Python", "Tableau", "Statistics"],
			description: `Join Netflix's data team and help drive decision-making through insights and analytics. You'll work with massive datasets to understand user behavior and improve the Netflix experience.\n\nKey responsibilities:\n• Analyze user engagement and content performance data\n• Create dashboards and reports for stakeholders\n• Collaborate with product and engineering teams\n• Conduct A/B testing and statistical analysis\n• Present findings to leadership teams\n\nThis role offers the opportunity to work with cutting-edge data technologies and contribute to the success of the world's leading streaming platform.`,
			requirements: [
				"Bachelor's degree in Statistics, Mathematics, Computer Science, or related field",
				"Strong analytical and problem-solving skills",
				"Proficiency in SQL and Python or R",
				"Experience with data visualization tools (Tableau, Power BI)",
				"Understanding of statistical concepts and A/B testing",
				"Excellent communication skills and attention to detail"
			],
			postedBy: {
				type: 'alumni', name: 'Michael Chen', graduationYear: '2020', department: 'Computer Science'
			}
		},
		{
			id: 5,
			title: "Product Manager",
			company: {
				name: "Spotify",
				logo: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=100&h=100&fit=crop&crop=center",
				description: `Spotify is a digital music, podcast, and video streaming service that gives you access to millions of songs and other content from creators all over the world.\n\nWe're passionate about music and technology, and we're committed to creating the best possible experience for our users. Our mission is to unlock the potential of human creativity by giving a million creative artists the opportunity to live off their art.`
			},
			location: "New York, NY",
			type: "full-time",
			experienceLevel: "Mid Level",
			salaryRange: "$130,000 - $170,000/year",
			deadline: "2025-09-25",
			postedDate: "2025-08-24",
			tags: ["Product Strategy", "Agile", "User Research", "Analytics"],
			description: `Lead product development at Spotify and help shape the future of music streaming. As a Product Manager, you'll drive product strategy and work with cross-functional teams to deliver exceptional user experiences.\n\nYou'll be responsible for:\n• Defining product roadmap and strategy\n• Working closely with engineering, design, and data teams\n• Conducting user research and market analysis\n• Managing product launches and feature rollouts\n• Analyzing product performance and user feedback\n\nThis is an opportunity to impact millions of music lovers worldwide and work with some of the most talented people in the industry.`,
			requirements: [
				"Bachelor's degree in Business, Engineering, or related field", "3-5 years of product management experience", "Strong analytical and strategic thinking skills", "Experience with agile development methodologies", "Excellent communication and leadership abilities", "Passion for music and technology"
			],
			postedBy: null
		},
		{
			id: 6,
			title: "DevOps Engineer",
			company: {
				name: "Amazon", logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop&crop=center",
				description: `Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.\n\nWe are the world's most customer-centric company, and we're looking for builders who share our passion for innovation and excellence. Join us in our mission to be Earth's Most Customer-Centric Company.`
			},
			location: "Remote", type: "full-time", experienceLevel: "Senior Level", salaryRange: "$140,000 - $180,000/year", deadline: "2025-09-05", postedDate: "2025-08-19",
			tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
			description: `Join Amazon's infrastructure team and help build and maintain the systems that power one of the world's largest e-commerce platforms. As a DevOps Engineer, you'll work with cutting-edge cloud technologies.\n\nKey responsibilities:\n• Design and implement scalable infrastructure solutions\n• Automate deployment and monitoring processes\n• Ensure high availability and performance of systems\n• Collaborate with development teams on CI/CD pipelines\n• Troubleshoot and resolve production issues\n\nThis role offers the opportunity to work with AWS at scale and contribute to systems that serve millions of customers worldwide.`,
			requirements: [
				"Bachelor\'s degree in Computer Science or related field",
				"5+ years of experience in DevOps or infrastructure roles",
				"Strong experience with AWS services and cloud architecture",
				"Proficiency in containerization technologies (Docker, Kubernetes)",
				"Experience with infrastructure as code (Terraform, CloudFormation)",
				"Strong scripting skills (Python, Bash, PowerShell)"
			],
			postedBy: {
				type: 'alumni', name: 'David Rodriguez', graduationYear: '2018', department: 'Computer Engineering'
			}
		},
		{
			id: 7,
			title: "Financial Analyst",
			company: {
				name: "Goldman Sachs",
				logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
				description: `Goldman Sachs is a leading global investment banking, securities and investment management firm that provides a wide range of financial services to a substantial and diversified client base.\n\nWe are committed to fostering a culture of excellence, integrity, and innovation. Our people are our greatest asset, and we invest in their development and success.`
			},
			location: "New York, NY",
			type: "full-time",
			experienceLevel: "Entry Level",
			salaryRange: "$95,000 - $120,000/year",
			deadline: "2025-09-12",
			postedDate: "2025-08-21",
			tags: ["Financial Modeling", "Excel", "Bloomberg", "Risk Analysis"],
			description: `Start your finance career at Goldman Sachs as a Financial Analyst. You'll work on high-profile transactions and gain exposure to various aspects of investment banking.\n\nResponsibilities include:\n• Building financial models and conducting valuation analysis\n• Preparing pitch books and client presentations\n• Supporting senior bankers on M&A and capital markets transactions\n• Conducting industry and company research\n• Analyzing market trends and investment opportunities\n\nThis role provides excellent training and career development opportunities in one of the world's premier investment banks.`,
			requirements: [
				"Bachelor's degree in Finance, Economics, or related field", "Strong analytical and quantitative skills", "Proficiency in Excel and financial modeling", "Excellent written and verbal communication skills", "Ability to work in a fast-paced, demanding environment", "Strong attention to detail and accuracy"
			],
			postedBy: null
		},
		{
			id: 8,
			title: "Content Writer",
			company: {
				name: "HubSpot", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
				description: `HubSpot is a leading customer relationship management (CRM) platform that provides software and support to help businesses grow better.\n\nWe believe in helping businesses grow with a conscience and building a company that our customers, employees, and community can be proud of. Our culture is built on the foundation of being helpful, humble, and human.`
			},
			location: "Boston, MA", type: "part-time", experienceLevel: "Entry Level", salaryRange: "$25 - $35/hour", deadline: "2025-09-08", postedDate: "2025-08-23",
			tags: ["Content Writing", "SEO", "Marketing", "Copywriting"],
			description: `Join HubSpot's content team and help create engaging, educational content that helps businesses grow. As a Content Writer, you'll produce blog posts, guides, and marketing materials.\n\nYou'll be responsible for:\n• Writing blog posts and educational content\n• Optimizing content for SEO and user engagement\n• Collaborating with marketing and design teams\n• Researching industry trends and topics\n• Editing and proofreading content\n\nThis part-time role is perfect for someone looking to build their content marketing skills while working with a leading SaaS company.`,
			requirements: [
				"Bachelor's degree in English, Journalism, Marketing, or related field",
				"Strong writing and editing skills",
				"Understanding of SEO best practices",
				"Experience with content management systems",
				"Ability to write for different audiences and formats",
				"Strong research and fact-checking abilities"
			],
			postedBy: {
				type: 'alumni', name: 'Emily Watson', graduationYear: '2021', department: 'English Literature'
			}
		}
	];

	// Filter and sort jobs
	const filteredAndSortedJobs = useMemo(() => {
		let filtered = mockJobs?.filter(job => {
			// Search query filter
			if (searchQuery) {
				const query = searchQuery?.toLowerCase();
				const matchesSearch =
					job?.title?.toLowerCase()?.includes(query) ||
					job?.company?.name?.toLowerCase()?.includes(query) ||
					job?.tags?.some(tag => tag?.toLowerCase()?.includes(query)) ||
					job?.description?.toLowerCase()?.includes(query);
				if (!matchesSearch) return false;
			}

			// Job type filter
			if (filters?.jobType !== 'all' && job?.type !== filters?.jobType) return false;

			// Location filter
			if (filters?.location !== 'all') {
				if (filters?.location === 'remote' && !job?.location?.toLowerCase()?.includes('remote')) return false;
				if (filters?.location === 'on-site' && job?.location?.toLowerCase()?.includes('remote')) return false;
				if (filters?.location === 'hybrid' && !job?.location?.toLowerCase()?.includes('hybrid')) return false;
			}

			// Department filter (simplified - in real app would match job categories)
			if (filters?.department !== 'all') {
				const departmentKeywords = {
					'computer-science': ['software', 'engineer', 'developer', 'devops', 'data'],
					'business': ['marketing', 'product', 'analyst', 'manager'],
					'design': ['designer', 'ux', 'ui'],
					'finance': ['financial', 'analyst', 'finance']
				};
				const keywords = departmentKeywords?.[filters?.department] || [];
				if (!keywords?.some(keyword => job?.title?.toLowerCase()?.includes(keyword))) return false;
			}

			// Experience level filter
			if (filters?.experienceLevel !== 'all' && job?.experienceLevel?.toLowerCase()?.replace(' ', '-') !== filters?.experienceLevel) return false;

			// Deadline filter
			if (filters?.deadline !== 'all') {
				const today = new Date();
				const deadlineDate = new Date(job.deadline);
				const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
				const deadlineDays = parseInt(filters?.deadline);
				if (daysLeft > deadlineDays) return false;
			}

			// Salary range filter
			if (filters?.salaryRange && !job?.salaryRange) return false;

			// Alumni posted filter
			if (filters?.alumniPosted && (!job?.postedBy || job?.postedBy?.type !== 'alumni')) return false;

			return true;
		});

		// Sort jobs
		filtered?.sort((a, b) => {
			switch (sortBy) {
				case 'newest':
					return new Date(b.postedDate) - new Date(a.postedDate);
				case 'deadline':
					return new Date(a.deadline) - new Date(b.deadline);
				case 'company':
					return a?.company?.name?.localeCompare(b?.company?.name);
				case 'salary-high':
					const aSalary = a?.salaryRange ? parseInt(a?.salaryRange?.replace(/[^0-9]/g, '')) : 0;
					const bSalary = b?.salaryRange ? parseInt(b?.salaryRange?.replace(/[^0-9]/g, '')) : 0;
					return bSalary - aSalary;
				case 'salary-low':
					const aSalaryLow = a?.salaryRange ? parseInt(a?.salaryRange?.replace(/[^0-9]/g, '')) : 0;
					const bSalaryLow = b?.salaryRange ? parseInt(b?.salaryRange?.replace(/[^0-9]/g, '')) : 0;
					return aSalaryLow - bSalaryLow;
				case 'relevance':
				default:
					return 0;
			}
		});

		return filtered;
	}, [searchQuery, filters, sortBy]);

	const savedJobs = mockJobs?.filter(job => savedJobIds?.has(job?.id));

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const handleFiltersChange = (newFilters) => {
		setFilters(newFilters);
	};

	const handleRemoveFilter = (filterKey) => {
		const newFilters = { ...filters };
		if (filterKey === 'salaryRange' || filterKey === 'alumniPosted') {
			newFilters[filterKey] = false;
		} else {
			newFilters[filterKey] = 'all';
		}
		setFilters(newFilters);
	};

	const handleClearAllFilters = () => {
		setFilters({
			jobType: 'all',
			location: 'all',
			department: 'all',
			experienceLevel: 'all',
			deadline: 'all',
			salaryRange: false,
			alumniPosted: false
		});
	};

	const handleSaveJob = (jobId, shouldSave) => {
		setSavedJobIds(prev => {
			const newSet = new Set(prev);
			if (shouldSave) {
				newSet?.add(jobId);
			} else {
				newSet?.delete(jobId);
			}
			return newSet;
		});
	};

	const handleApplyJob = (job) => {
		// In a real app, this would redirect to application page or external link
		window.open(`https://careers.${job?.company?.name?.toLowerCase()?.replace(/\s+/g, '')}.com`, '_blank');
	};

	const handleViewJobDetails = (job) => {
		setSelectedJob(job);
		setIsJobDetailOpen(true);
	};

	const handleRemoveSavedJob = (jobId) => {
		setSavedJobIds(prev => {
			const newSet = new Set(prev);
			newSet?.delete(jobId);
			return newSet;
		});
	};

	const getActiveFiltersCount = () => {
		let count = 0;
		Object.entries(filters)?.forEach(([key, value]) => {
			if (key === 'salaryRange' || key === 'alumniPosted') {
				if (value) count++;
			} else if (value !== 'all') {
				count++;
			}
		});
		return count;
	};

	return (
		<div className="min-h-screen bg-background">
			<ContextualHeader
				userRole="student"
				notificationCount={3}
				userName="Alex Johnson"
			/>
			<main className="pt-header pb-bottom-nav md:pb-0">
				<div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
					<NavigationBreadcrumb />

					<div className="mb-8">
						<h1 className="font-heading font-bold text-3xl text-foreground mb-2">
							Job Board
						</h1>
						<p className="text-muted-foreground">
							Discover career opportunities posted by alumni and partner companies
						</p>
					</div>

					<JobSearchBar
						onSearch={handleSearch}
						onFilterToggle={() => setIsFiltersOpen(true)}
						activeFiltersCount={getActiveFiltersCount()}
					/>

					<ActiveFilters
						filters={filters}
						onRemoveFilter={handleRemoveFilter}
						onClearAll={handleClearAllFilters}
					/>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
						{/* Filters Sidebar - Desktop */}
						<div className="lg:col-span-3">
							<JobFilters
								filters={filters}
								onFiltersChange={handleFiltersChange}
								onClearFilters={handleClearAllFilters}
								isOpen={isFiltersOpen}
								onClose={() => setIsFiltersOpen(false)}
							/>
						</div>

						{/* Main Content */}
						<div className="lg:col-span-6">
							<SortOptions
								sortBy={sortBy}
								onSortChange={setSortBy}
								resultsCount={filteredAndSortedJobs?.length}
							/>

							{filteredAndSortedJobs?.length > 0 ? (
								<div className="space-y-4">
									{filteredAndSortedJobs?.map((job) => (
										<JobCard
											key={job?.id}
											job={job}
											onSave={handleSaveJob}
											onApply={handleApplyJob}
											onViewDetails={handleViewJobDetails}
											isSaved={savedJobIds?.has(job?.id)}
										/>
									))}
								</div>
							) : (
								<div className="text-center py-12">
									<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
										<Icon name="Search" size={32} className="text-muted-foreground" />
									</div>
									<h3 className="font-heading font-medium text-lg text-foreground mb-2">
										No jobs found
									</h3>
									<p className="text-muted-foreground mb-4">
										Try adjusting your search criteria or filters
									</p>
									<button
										onClick={handleClearAllFilters}
										className="text-primary hover:text-primary/80 transition-smooth"
									>
										Clear all filters
									</button>
								</div>
							)}
						</div>

						{/* Saved Jobs Panel - Desktop */}
						<div className="lg:col-span-3">
							<SavedJobsPanel
								savedJobs={savedJobs}
								onViewJob={handleViewJobDetails}
								onRemoveJob={handleRemoveSavedJob}
							/>
						</div>
					</div>
				</div>
			</main>
			<BottomTabNavigation userRole="student" />
			<JobDetailModal
				job={selectedJob}
				isOpen={isJobDetailOpen}
				onClose={() => setIsJobDetailOpen(false)}
				onApply={handleApplyJob}
				onSave={handleSaveJob}
				isSaved={selectedJob ? savedJobIds?.has(selectedJob?.id) : false}
			/>
		</div>
	);
};

export default JobBoard;