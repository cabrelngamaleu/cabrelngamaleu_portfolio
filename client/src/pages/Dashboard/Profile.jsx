import React from 'react';
import { FiUser, FiMail, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import ChangePasswordForm from '../../components/dashboard/ChangePasswordForm';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text-green mb-2">
          Mon Profil
        </h1>
        <p className="text-textColor/70">
          Gérez vos informations personnelles et votre sécurité
        </p>
      </div>

      {/* User info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-xl"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-designColor/20 flex items-center justify-center">
            <FiUser className="text-designColor" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-textColor">
              {user?.username || 'Admin'}
            </h2>
            <p className="text-textColor/70">{user?.role || 'Administrateur'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-textColor/70">
            <FiUser size={20} className="text-designColor" />
            <div>
              <p className="text-sm text-textColor/60">Nom d'utilisateur</p>
              <p className="text-textColor">{user?.username || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-textColor/70">
            <FiMail size={20} className="text-designColor" />
            <div>
              <p className="text-sm text-textColor/60">Email</p>
              <p className="text-textColor">{user?.email || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-textColor/70">
            <FiShield size={20} className="text-designColor" />
            <div>
              <p className="text-sm text-textColor/60">Rôle</p>
              <p className="text-textColor">{user?.role || 'admin'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Change password form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ChangePasswordForm />
      </motion.div>
    </div>
  );
};

export default Profile;
