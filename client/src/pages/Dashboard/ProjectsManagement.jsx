import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import api from '../../services/api';
import ProjectList from '../../components/dashboard/ProjectList';
import ProjectForm from '../../components/dashboard/ProjectForm';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchProjects = async () => {
    try {
      setError('');
      const response = await api.get('/projects');
      // Sort by order field
      const sorted = response.data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setProjects(sorted);
    } catch (err) {
      console.error('Erreur lors du chargement des projets:', err);
      setError('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }

    try {
      await api.delete(`/projects/${projectId}`);
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression du projet');
    }
  };

  const handleFormSuccess = () => {
    fetchProjects();
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p._id === active.id);
      const newIndex = projects.findIndex((p) => p._id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      setProjects(newProjects);

      // Update order on backend
      try {
        const updates = newProjects.map((project, index) => ({
          id: project._id,
          order: index,
        }));

        // Update each project's order
        await Promise.all(
          updates.map((update) =>
            api.put(`/projects/${update.id}`, { order: update.order })
          )
        );
      } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'ordre:', err);
        // Revert on error
        fetchProjects();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text-green mb-2">
            Gestion des Projets
          </h1>
          <p className="text-textColor/70">
            Gérez vos projets et leur ordre d'affichage
          </p>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center space-x-2 px-4 py-2 bg-designColor hover:bg-designColor/90 text-bodyColor rounded-lg font-semibold transition-colors"
        >
          <FiPlus size={20} />
          <span>Nouveau projet</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Drag & Drop hint */}
      {!loading && projects.length > 0 && (
        <div className="bg-designColor/10 border border-designColor/20 text-textColor px-4 py-3 rounded-lg text-sm">
          💡 Astuce : Glissez-déposez les projets pour réorganiser leur ordre d'affichage
        </div>
      )}

      {/* Projects list with drag & drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projects.map((p) => p._id)}
          strategy={rectSortingStrategy}
        >
          <ProjectList
            projects={projects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            loading={loading}
          />
        </SortableContext>
      </DndContext>

      {/* Project form modal */}
      {showForm && (
        <ProjectForm
          project={selectedProject}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default ProjectsManagement;
