import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

const ProjectCard = ({ project, featured = false }) => {
  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };
  const visibleTechs = (project.technologies || []).slice(0, 3);
  const extra = (project.technologies || []).length - visibleTechs.length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={onMouseMove}
      className={`spotlight-card glass-card overflow-hidden group flex flex-col ${featured ? 'lg:col-span-2' : ''}`}
    >
      {project.imageUrl && (
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          <div className="absolute top-3 left-3 flex gap-2">
            {project.category && (
              <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-white capitalize">
                {project.category}
              </span>
            )}
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full bg-designColor text-[#0a0a0b] text-xs font-bold">Featured</span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-100">
                <FiArrowUpRight />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-white/15 backdrop-blur border border-white/15 text-white flex items-center justify-center hover:bg-white/25">
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      )}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="font-titleFont font-semibold text-white text-lg leading-tight group-hover:text-designColor transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-textMuted line-clamp-2 flex-1">{project.description}</p>
        {visibleTechs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {visibleTechs.map((tech, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-textColor">
                {tech}
              </span>
            ))}
            {extra > 0 && <span className="px-2.5 py-1 rounded-full bg-white/[0.04] text-xs text-textFaint">+{extra}</span>}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-designColor text-[#0a0a0b] text-sm font-semibold hover:bg-designColorHover transition-colors">
              Demo <FaExternalLinkAlt className="text-xs" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white text-sm font-medium hover:bg-white/[0.10] transition-colors">
              <FaGithub /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
