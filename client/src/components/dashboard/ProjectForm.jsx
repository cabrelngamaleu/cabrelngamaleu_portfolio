import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiX, FiUpload, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

const ProjectForm = ({ project, onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: project || {
      title: '',
      description: '',
      longDescription: '',
      technologies: '',
      category: 'Web',
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      order: 0,
    },
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(project?.imageUrl || '');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const watchImageUrl = watch('imageUrl');

  useEffect(() => {
    if (watchImageUrl && !imageFile) {
      setImagePreview(watchImageUrl);
    }
  }, [watchImageUrl, imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5 Mo');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setValue('imageUrl', '');
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      let imageUrl = data.imageUrl;

      // Upload image if a new file is selected
      if (imageFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrl = uploadRes.data.url;
        setUploading(false);
      }

      // Prepare project data
      const projectData = {
        ...data,
        technologies: typeof data.technologies === 'string' 
          ? data.technologies.split(',').map(t => t.trim()).filter(Boolean)
          : data.technologies,
        imageUrl,
        order: parseInt(data.order) || 0,
      };

      // Create or update project
      if (project) {
        await api.put(`/projects/${project._id}`, projectData);
      } else {
        await api.post('/projects', projectData);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde du projet');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-bodyColor border border-designColor/20 rounded-xl w-full max-w-3xl my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-designColor/20">
            <h2 className="text-2xl font-bold gradient-text-green">
              {project ? 'Modifier le projet' : 'Nouveau projet'}
            </h2>
            <button
              onClick={onClose}
              className="text-textColor/70 hover:text-textColor transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                Titre *
              </label>
              <input
                {...register('title', { required: 'Le titre est requis' })}
                className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                placeholder="Nom du projet"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                Description courte *
              </label>
              <textarea
                {...register('description', { required: 'La description est requise' })}
                rows={2}
                className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50 resize-none"
                placeholder="Brève description du projet"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Long Description */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                Description détaillée
              </label>
              <textarea
                {...register('longDescription')}
                rows={4}
                className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50 resize-none"
                placeholder="Description complète du projet"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                Technologies (séparées par des virgules)
              </label>
              <input
                {...register('technologies')}
                className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">
                  Catégorie
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                >
                  <option value="Web">Web</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Design">Design</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  {...register('order')}
                  className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                Image du projet
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-designColor/20"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-designColor/20 rounded-lg cursor-pointer hover:border-designColor/50 transition-colors">
                  <FiUpload size={32} className="text-textColor/50 mb-2" />
                  <span className="text-textColor/70">Cliquez pour uploader une image</span>
                  <span className="text-textColor/50 text-sm mt-1">PNG, JPG (max 5 Mo)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* URLs */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                URL du site live
              </label>
              <input
                {...register('liveUrl')}
                type="url"
                className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                URL GitHub
              </label>
              <input
                {...register('githubUrl')}
                type="url"
                className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                placeholder="https://github.com/username/repo"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="w-4 h-4 rounded border-designColor/20 text-designColor focus:ring-designColor"
              />
              <label htmlFor="featured" className="text-sm text-textColor">
                Projet en vedette
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-designColor/20">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-textColor/70 hover:text-textColor transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className="px-6 py-2 bg-designColor hover:bg-designColor/90 text-bodyColor rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Upload en cours...' : loading ? 'Sauvegarde...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectForm;
