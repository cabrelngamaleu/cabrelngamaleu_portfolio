import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiFolder,
  FiFileText,
  FiMail,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiLogOut,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const navItems = [
    { name: "Vue d'ensemble", path: '/dashboard', icon: FiHome, exact: true },
    { name: 'Projets', path: '/dashboard/projects', icon: FiFolder },
    { name: 'Blog', path: '/dashboard/blog', icon: FiFileText },
    { name: 'Messages', path: '/dashboard/messages', icon: FiMail },
    { name: 'Analytics', path: '/dashboard/analytics', icon: FiBarChart2 },
    { name: 'Profil', path: '/dashboard/profile', icon: FiUser },
    { name: 'Paramètres', path: '/dashboard/settings', icon: FiSettings },
  ];

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      logout();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'tween', duration: 0.3 }}
        className={`
          fixed top-0 left-0 h-full w-64 bg-bodyColor border-r border-designColor/20 
          z-50 lg:translate-x-0 lg:static flex flex-col
        `}
      >
        {/* Logo and close button */}
        <div className="flex items-center justify-between p-6 border-b border-designColor/20">
          <h2 className="text-xl font-bold gradient-text-green">CN Admin</h2>
          <button
            onClick={onClose}
            className="lg:hidden text-textColor hover:text-designColor transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-designColor/10 text-designColor'
                    : 'text-textColor/70 hover:text-textColor hover:bg-designColor/5'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-designColor/20">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
