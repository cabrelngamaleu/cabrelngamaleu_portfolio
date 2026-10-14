import React from 'react';
import { FiEdit2, FiTrash2, FiStar, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProjectList = ({ projects, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-textColor/50">Chargement des projets...</div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-textColor/50">Aucun projet trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="glass-card rounded-xl overflow-hidden group hover:border-designColor/50 transition-all duration-300"
        >
          {/* Project thumbnail */}
          <div className="relative h-48 bg-bodyColor overflow-hidden">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-textColor/30">
                <FiEye size={48} />
              </div>
            )}
            {project.featured && (
              <div className="absolute top-2 right-2 bg-designColor/90 text-bodyColor px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                <FiStar size={12} />
                <span>Featured</span>
              </div>
            )}
          </div>

          {/* Project info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-textColor mb-2 truncate">{project.title}</h3>
            <p className="text-sm text-textColor/70 mb-3 line-clamp-2">{project.description}</p>

            <div className="flex items-center justify-between text-xs text-textColor/60 mb-4">
              <span className="px-2 py-1 bg-designColor/10 rounded">
                {project.category || 'Non catégorisé'}
              </span>
              <span>Ordre: {project.order || 0}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(project)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-designColor/10 hover:bg-designColor/20 text-designColor rounded-lg transition-colors"
              >
                <FiEdit2 size={16} />
                <span>Modifier</span>
              </button>
              <button
                onClick={() => onDelete(project._id)}
                className="flex items-center justify-center px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectList;
