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
import RoundOne from './components/roundDesigns/RoundOne';
import RoundTwo from './components/roundDesigns/RoundTwo';
import RoundThree from './components/roundDesigns/RoundThree';
import RoundFour from './components/roundDesigns/RoundFour';
import RoundFive from './components/roundDesigns/RoundFive';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen font-bodyfont text-textColor bg-bodyColor relative">
        <Routes>
          {/* Public portfolio route */}
          <Route
            path="/"
            element={
              <>
                <Portfolio />
                {/* Decorative background elements */}
                <div className="w-full h-full absolute top-0 left-0 z-0 pointer-events-none">
                  <RoundOne />
                  <RoundTwo />
                  <RoundThree />
                  <RoundFour />
                  <RoundFive />
                </div>
              </>
            }
          />

          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Protected dashboard routes */}
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
