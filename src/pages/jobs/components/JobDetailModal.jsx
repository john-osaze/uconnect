import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '@/components/AppImage';
import Button from '@/components/Button';

const JobDetailModal = ({ job, isOpen, onClose, onApply, onSave, isSaved = false }) => {
    if (!isOpen || !job) return null;

    const formatDeadline = (deadline) => {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

        if (daysLeft < 0) return 'Application deadline has passed';
        if (daysLeft === 0) return 'Application deadline is today';
        if (daysLeft === 1) return 'Application deadline is tomorrow';
        return `Application deadline in ${daysLeft} days`;
    };

    const getDeadlineColor = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

        if (daysLeft <= 3) return 'text-error';
        if (daysLeft <= 7) return 'text-warning';
        return 'text-success';
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={onClose}
            />
            {/* Modal */}
            <div className="max-w-4xl h-[80vh] justify-self-center fixed inset-4 md:inset-8 lg:inset-16 bg-card rounded-lg z-50 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            <Image
                                src={job?.company?.logo}
                                alt={`${job?.company?.name} logo`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-heading font-bold text-xl text-foreground">
                                {job?.title}
                            </h2>
                            <p className="text-muted-foreground font-caption text-lg">
                                {job?.company?.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-md transition-smooth"
                        aria-label="Close modal"
                    >
                        <Icon name="X" size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Job Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-center space-x-2">
                                <Icon name="MapPin" size={20} className="text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-medium text-foreground">{job?.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon name="Clock" size={20} className="text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Job Type</p>
                                    <p className="font-medium text-foreground capitalize">{job?.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Experience</p>
                                    <p className="font-medium text-foreground">{job?.experienceLevel}</p>
                                </div>
                            </div>
                            {job?.salaryRange && (
                                <div className="flex items-center space-x-2">
                                    <Icon name="DollarSign" size={20} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Salary</p>
                                        <p className="font-medium text-foreground">{job?.salaryRange}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Deadline Alert */}
                        <div className={`p-4 rounded-lg border ${getDeadlineColor(job?.deadline) === 'text-error' ? 'bg-error/10 border-error/20' : getDeadlineColor(job?.deadline) === 'text-warning' ? 'bg-warning/10 border-warning/20' : 'bg-success/10 border-success/20'}`}>
                            <div className="flex items-center space-x-2">
                                <Icon name="AlertCircle" size={20} className={getDeadlineColor(job?.deadline)} />
                                <p className={`font-medium ${getDeadlineColor(job?.deadline)}`}>
                                    {formatDeadline(job?.deadline)}
                                </p>
                            </div>
                        </div>

                        {/* Alumni Connection */}
                        {job?.postedBy && job?.postedBy?.type === 'alumni' && (
                            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                                        <Icon name="GraduationCap" size={20} className="text-secondary-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Posted by Alumni</p>
                                        <p className="text-sm text-muted-foreground">
                                            {job?.postedBy?.name} • {job?.postedBy?.graduationYear} • {job?.postedBy?.department}
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        iconName="MessageCircle"
                                        iconPosition="left"
                                        iconSize={16}
                                    >
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Job Description */}
                        <div>
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                                Job Description
                            </h3>
                            <div className="prose prose-sm max-w-none text-foreground">
                                <p className="whitespace-pre-line">{job?.description}</p>
                            </div>
                        </div>

                        {/* Requirements */}
                        {job?.requirements && (
                            <div>
                                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                                    Requirements
                                </h3>
                                <ul className="space-y-2">
                                    {job?.requirements?.map((requirement, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                                            <span className="text-foreground">{requirement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Skills */}
                        {job?.tags && job?.tags?.length > 0 && (
                            <div>
                                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                                    Required Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {job?.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Company Info */}
                        <div>
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
                                About {job?.company?.name}
                            </h3>
                            <p className="text-foreground leading-relaxed">
                                {job?.company?.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-border p-6">
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                        <Button
                            variant="outline"
                            onClick={() => onSave(job?.id, !isSaved)}
                            iconName={isSaved ? 'Bookmark' : 'BookmarkPlus'}
                            iconPosition="left"
                            iconSize={18}
                            className="flex-1 sm:flex-initial"
                        >
                            {isSaved ? 'Saved' : 'Save Job'}
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => onApply(job)}
                            iconName="ExternalLink"
                            iconPosition="right"
                            iconSize={18}
                            className="flex-1"
                        >
                            Apply Now
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetailModal;