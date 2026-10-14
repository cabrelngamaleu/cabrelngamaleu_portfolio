import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/Dashboard/Login';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Overview from './pages/Dashboard/Overview';
import ProjectsManagement from './pages/Dashboard/ProjectsManagement';
import BlogManagement from './pages/Dashboard/BlogManagement';
import MessagesInbox from './pages/Dashboard/MessagesInbox';
import Analytics from './pages/Dashboard/Analytics';
import Profile from './pages/Dashboard/Profile';
import Settings from './pages/Dashboard/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollProgress from './components/common/ScrollProgress';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full min-h-screen font-bodyfont text-textColor bg-bodyColor relative overflow-x-hidden">
        {/* Premium mesh background — subtle, not overwhelming */}
        <div className="fixed inset-0 -z-10 mesh-bg" />
        <div className="fixed inset-0 -z-10 grid-overlay opacity-40" />
        <div className="fixed inset-0 -z-10 noise" />
        <ScrollProgress />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="messages" element={<MessagesInbox />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
