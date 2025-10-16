import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import EventsListing from './pages/events';
import JobBoard from './pages/jobs';
import MentorDiscovery from './pages/mentors';
import AlumniDashboard from './pages/alumni-dashboard';
import ProfileManagement from './pages/profile';
import StudentDashboard from './pages/student-dashboard';
import DepartmentalAssociations from './pages/associations';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mentors" element={<MentorDiscovery />} />
        <Route path="/events" element={<EventsListing />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/associations" element={<DepartmentalAssociations />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
