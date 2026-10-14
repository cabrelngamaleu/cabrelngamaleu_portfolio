import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import SectionTitle from '../common/SectionTitle';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import LoadingSpinner from '../common/LoadingSpinner';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Tous');

  const categories = ['Tous', 'Web', 'Mobile', 'Design', 'Autre'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const filterProjects = useCallback(() => {
    if (activeCategory === 'Tous') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeCategory));
    }
  }, [projects, activeCategory]);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      const data = response.data;

      // Sort by featured first, then by order
      const sortedProjects = data.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.order || 0) - (b.order || 0);
      });

      setProjects(sortedProjects);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des projets:', err);
      setError('Impossible de charger les projets. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (category) => {
    setActiveCategory(category);
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Mes Projets" subtitle="Découvrez mes réalisations récentes" />
          <LoadingSpinner size="lg" className="my-20" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Mes Projets" subtitle="Découvrez mes réalisations récentes" />
          <div className="text-center py-20">
            <p className="text-textColor/80 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Portfolio" title="Projets sélectionnés" subtitle="Une sélection de produits livrés — du MVP au scale. Cliquez pour explorer." />

        <ProjectFilter categories={categories} activeCategory={activeCategory} onFilterChange={handleFilterChange} />

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-textMuted text-lg">Aucun projet dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project._id} project={project} featured={idx === 0 && project.featured && filteredProjects.length >= 5} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
