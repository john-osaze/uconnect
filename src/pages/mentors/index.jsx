import React, { useState, useEffect } from 'react';
import "../../styles/custom.css";
import JobSearchBar from '@/pages/jobs/components/JobSearchBar';
import ContextualHeader from '@/components/ContextualHeader';
import BottomTabNavigation from '@/components/BottomTabNavigation';

const MentorDiscovery = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [message, setMessage] = useState('');

    const mentors = [
        {
            id: 1,
            name: "Sarah Doe",
            title: "Software Engineer at TechCorp",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIZM7YcP1VJ-wg-gpzTnJtwN2JYtWbPR0vuGkEehUMs1rh_2aYOHUK6pE5AcFgZ7WG2e7xR2RqCRZkwwnFWsYZ3tUWAG0UYBMXaiTzvCoVRAj7oCwDDFrLK7dtiEaL6tDKZBZ_AYz3KkBhfw0cDkdG2zuD1nP18gMLWkwa6Bh8xZffy9vep042KdE0Vv_IDql2g-0Dq8ZnBUUiM5KAnAkaUaLBeoboekcKKCkB4XtTNifbyBcdam-ksXxYFH3lshFhK9QIlGnx6nXm",
            skills: [
                { name: "Frontend", color: "bg-blue-100 text-blue-800" },
                { name: "Career Advice", color: "bg-green-100 text-green-800" },
                { name: "React", color: "bg-yellow-100 text-yellow-800" }
            ]
        },
        {
            id: 2,
            name: "John Smith",
            title: "Product Manager at Innovate Inc.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ozebJJ88TWdO0Gzkn4pDdYNfrTAZ0k2wscwPRQTdp2lvXhAT-OBEgo5OTgwJkiYCeJlfeNgCvBUMdR_4iEYjTnSdVNEPVh5eeEL3nWnoWNZUfEhI5gziUz0doLtypCqsYksCgMF1twvWlEOoLx23F-yps9UwN0rlgsjvNTYmSnd2GvPLXFgY_AfkjFWRvXFChmQlTodgcB5OZLxkUDxoDU_IrQyW0qW_zWHvXnfhQ-sdqANmXxWflmJXt0tGRsIF6ibgP4AOvC1E",
            skills: [
                { name: "Product", color: "bg-indigo-100 text-indigo-800" },
                { name: "Strategy", color: "bg-pink-100 text-pink-800" },
                { name: "Leadership", color: "bg-purple-100 text-purple-800" }
            ]
        },
        {
            id: 3,
            name: "Emily White",
            title: "UX Designer at Creative Solutions",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsvCJmKTchLCgRw7nE7oCGPX4N-8ewHkTT5kTY7ak7E6PgMu9JsLUQJUNz3TAnmV5JgqxLnatcT49HCRjLwwsbt6cLWZHKVrs79Tt5fEmir9UXvOx7K-wPHuOfFPEPDqB3OuOUgl3my3wW-Sx8mD7OTefkYn7AxmIvW95SzUNUFwbBmFpKwnVbMHconxxtdBgtAJ-DA1PHphKR5BYxksMBuG0gSDocmb1mIjJ7TOgsWKyThiHlohoDp66RZNMqvWZmKFc9LviOvPUJ",
            skills: [
                { name: "UX/UI", color: "bg-red-100 text-red-800" },
                { name: "Figma", color: "bg-gray-200 text-gray-800" },
                { name: "Design Thinking", color: "bg-orange-100 text-orange-800" }
            ]
        },
        {
            id: 4,
            name: "Michael Brown",
            title: "Data Scientist at Data Insights",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDspOYpPyl9lVFMjb1E64WLZnNPxPXV9qTPmMtKUIga9fBkttjfw9ZQzPTATCr2lIZ04HOrmRUCdgOKcRy_NkkWkx6qviyZbSazwBkcn0ZKxZYQK0DdTvMLfxh2xOibvzRrReO8lB3VAGoBGpiiGNuxkWyMPzWx8nHBsb-aP9GC__gYEHgIhvPL20L5GrvE2gKO2E-PRcpoehPGxTiVT5XQvXEbHA5fEJT6-4u4le_YY5Acz59vPpZHG6qHqREIr_Z3W5y6f7FFiRXU",
            skills: [
                { name: "Data Science", color: "bg-teal-100 text-teal-800" },
                { name: "Python", color: "bg-cyan-100 text-cyan-800" },
                { name: "ML", color: "bg-lime-100 text-lime-800" }
            ]
        },
        {
            id: 5,
            name: "Jessica Green",
            title: "Marketing Manager at MarketLead",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJVciDKfDYnoNqsCehU7a-6iGIEeRtuYV2TkyghpVyBWER9xrIB1JPFHIYNmFbRlSDTazWWMapKM9j7KxGmT6vk7A8wgkSH4YdZoATXYDKtJiBbsQTnheRZTXywPzwAZVCDqZoig6Uf65GYBeWhWTT2lFqXrRH33frXYw0cwCIISZCr-RHOF-_aO5SmOaxSqsOAgx9hKDiTdtlvXS3cRrtBZ-as6QHunwCif0sH6Twv6UxccZoMwve7qcoenJcPVePwyCigNDa3pNa",
            skills: [
                { name: "Marketing", color: "bg-rose-100 text-rose-800" },
                { name: "SEO", color: "bg-fuchsia-100 text-fuchsia-800" },
                { name: "Branding", color: "bg-violet-100 text-violet-800" }
            ]
        },
        {
            id: 6,
            name: "David Lee",
            title: "Cybersecurity Analyst",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW3AAjnFPC1KQ_FCTB6ycpX645fo7O4JHJcEzRu-8TKvCaEelw3FBZ_bTmn4QlCv8avajN7CVQfKE0wPoxrhHexbo5wnoY7EkFxq8ArBxXcKVXHsu0VZpPTHmzEfHCiRxRqKjmJiRMg6xdyx804lbtNHyIavlJwFB4FWybmSozlVO5LMNY9ojN8zDgkOtB9N_ur0xpxpqnhu0HfTwq7OpGp_eFmLSd3YYSuXDr9XB8JLTaSU34EDz4U1KN-diXxWR4HpqSRT0wxlVt",
            skills: [
                { name: "Cybersecurity", color: "bg-sky-100 text-sky-800" },
                { name: "Networking", color: "bg-emerald-100 text-emerald-800" }
            ]
        }
    ];

    const [filters, setFilters] = useState({
        jobType: 'all',
        location: 'all',
        department: 'all',
        experienceLevel: 'all',
        deadline: 'all',
        salaryRange: false,
        alumniPosted: false
    });

    const handleProfileClick = () => {
        console.log("My Profile clicked");
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

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setModalOpen(false);
            }
        };

        if (modalOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [modalOpen]);

    const handleRequestMentorship = (mentor) => {
        setSelectedMentor(mentor);
        setMessage(`Hi ${mentor.name.split(' ')[0]}, I'm interested in your expertise in...`);
        setModalOpen(true);
    };

    const handleSubmit = () => {
        if (!message.trim()) return;

        console.log('Sending mentorship request:', {
            mentor: selectedMentor,
            message: message
        });
        setModalOpen(false);
        setMessage('');
    };

    return (
        <div className="font-inter">
            {/* Header */}
            <ContextualHeader
                userRole="student"
                notificationCount={3}
                userName="Alex Johnson"
            />

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Mentor</h2>
                    <p className="text-lg text-gray-600">Connect with experienced alumni who can guide you.</p>
                </div>

                <JobSearchBar
                    onSearch={handleSearch}
                    onFilterToggle={() => setIsFiltersOpen(true)}
                    activeFiltersCount={getActiveFiltersCount()}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {mentors.map((mentor) => (
                        <div
                            key={mentor.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <img
                                        alt={`Profile picture of ${mentor.name}`}
                                        className="h-16 w-16 rounded-full object-cover"
                                        src={mentor.image}
                                    />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                                        <p className="text-sm text-gray-600">{mentor.title}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    {mentor.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className={`inline-block ${skill.color} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full mb-1`}
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleRequestMentorship(mentor)}
                                    className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                                >
                                    <span className="material-icons mr-2 text-sm">person_add</span>
                                    Request Mentorship
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 animate-fadeIn"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 sm:p-8 transform transition-all duration-300 animate-scaleIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Request Mentorship</h2>
                                <p className="text-gray-600 mt-1">Send a message to start the conversation.</p>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                    htmlFor="message"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 focus:outline-none focus:ring-2"
                                    id="message"
                                    name="message"
                                    placeholder="Hi [Mentor's Name], I'm interested in your expertise in..."
                                    rows="6"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-2 sm:space-y-0">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="w-full sm:w-auto justify-center flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full sm:w-auto flex items-center justify-center rounded-lg border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                                >
                                    Send Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BottomTabNavigation userRole="student" />
        </div>
    );
};

export default MentorDiscovery;