import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu, FiChevronRight, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Generate breadcrumb from path
  const getBreadcrumb = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);

    const breadcrumbMap = {
      dashboard: "Vue d'ensemble",
      projects: 'Projets',
      blog: 'Blog',
      messages: 'Messages',
      analytics: 'Analytics',
      profile: 'Profil',
      settings: 'Paramètres',
    };

    const breadcrumbs = segments.map((segment) => ({
      name: breadcrumbMap[segment] || segment,
      isLast: segment === segments[segments.length - 1],
    }));

    return breadcrumbs.length > 0 ? breadcrumbs : [{ name: 'Dashboard', isLast: true }];
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  return (
    <header className="bg-bodyColor border-b border-designColor/20 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side: Menu button and breadcrumb */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-textColor hover:text-designColor transition-colors"
          >
            <FiMenu size={24} />
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm">
            {getBreadcrumb().map((crumb, index) => (
              <React.Fragment key={index}>
                <span
                  className={crumb.isLast ? 'text-designColor font-medium' : 'text-textColor/70'}
                >
                  {crumb.name}
                </span>
                {!crumb.isLast && <FiChevronRight className="text-textColor/50" size={16} />}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Right side: User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-designColor/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-designColor/20 flex items-center justify-center">
              <FiUser className="text-designColor" size={18} />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-textColor">{user?.username || 'Admin'}</p>
              <p className="text-xs text-textColor/60">{user?.role || 'Administrateur'}</p>
            </div>
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-bodyColor border border-designColor/20 rounded-lg shadow-lg z-20">
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <FiLogOut size={16} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
