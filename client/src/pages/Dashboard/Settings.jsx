import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text-green mb-2">
          Paramètres
        </h1>
        <p className="text-textColor/70">
          Personnalisez votre expérience du tableau de bord
        </p>
      </div>

      {/* Theme settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-xl font-semibold text-textColor mb-4">
          Apparence
        </h3>

        <div className="flex items-center justify-between py-4 border-b border-designColor/20">
          <div className="flex items-center space-x-3">
            {theme === 'dark' ? (
              <FiMoon className="text-designColor" size={24} />
            ) : (
              <FiSun className="text-designColor" size={24} />
            )}
            <div>
              <p className="text-textColor font-medium">Thème</p>
              <p className="text-textColor/60 text-sm">
                {theme === 'dark' ? 'Mode sombre' : 'Mode clair'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              theme === 'dark' ? 'bg-designColor' : 'bg-gray-400'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <p className="text-textColor/60 text-sm mt-4">
          Le thème sélectionné sera sauvegardé et appliqué lors de vos prochaines visites.
        </p>
      </motion.div>

      {/* General settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-xl font-semibold text-textColor mb-4">
          Paramètres généraux
        </h3>

        <div className="space-y-4 text-textColor/70">
          <div className="flex items-center justify-between py-4 border-b border-designColor/20">
            <div>
              <p className="text-textColor font-medium">Notifications</p>
              <p className="text-textColor/60 text-sm">
                Recevoir des notifications pour les nouveaux messages
              </p>
            </div>
            <div className="text-textColor/50 text-sm">
              À venir
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-designColor/20">
            <div>
              <p className="text-textColor font-medium">Langue</p>
              <p className="text-textColor/60 text-sm">
                Langue de l'interface
              </p>
            </div>
            <div className="text-textColor/50 text-sm">
              Français
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-textColor font-medium">Sauvegarde automatique</p>
              <p className="text-textColor/60 text-sm">
                Sauvegarder automatiquement les brouillons
              </p>
            </div>
            <div className="text-textColor/50 text-sm">
              À venir
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
