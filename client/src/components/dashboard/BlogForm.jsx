import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiX, FiUpload, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import api from '../../services/api';
import 'react-markdown-editor-lite/lib/index.css';

// Dynamic import for the Markdown editor (client-side only)
const MdEditor = React.lazy(() => import('react-markdown-editor-lite'));

const BlogForm = ({ post, onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: post || {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      coverImage: '',
      tags: '',
      category: '',
      published: false,
    },
  });

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(post?.coverImage || '');
  const [markdownContent, setMarkdownContent] = useState(post?.content || '');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const watchTitle = watch('title');
  const watchCoverImage = watch('coverImage');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !post) {
      const slug = watchTitle
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [watchTitle, setValue, post]);

  useEffect(() => {
    if (watchCoverImage && !coverFile) {
      setCoverPreview(watchCoverImage);
    }
  }, [watchCoverImage, coverFile]);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5 Mo');
        return;
      }
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview('');
    setValue('coverImage', '');
  };

  const handleEditorChange = ({ text }) => {
    setMarkdownContent(text);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      let coverImageUrl = data.coverImage;

      // Upload cover image if a new file is selected
      if (coverFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', coverFile);

        const uploadRes = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        coverImageUrl = uploadRes.data.url;
        setUploading(false);
      }

      // Prepare blog post data
      const postData = {
        ...data,
        content: markdownContent,
        tags: typeof data.tags === 'string' 
          ? data.tags.split(',').map(t => t.trim()).filter(Boolean)
          : data.tags,
        coverImage: coverImageUrl,
      };

      // Create or update post
      if (post) {
        await api.put(`/blog/${post._id}`, postData);
      } else {
        await api.post('/blog', postData);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde de l\'article');
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
          className="bg-bodyColor border border-designColor/20 rounded-xl w-full max-w-6xl my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-designColor/20">
            <h2 className="text-2xl font-bold gradient-text-green">
              {post ? 'Modifier l\'article' : 'Nouvel article'}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">
                  Titre *
                </label>
                <input
                  {...register('title', { required: 'Le titre est requis' })}
                  className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                  placeholder="Titre de l'article"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">
                  Slug *
                </label>
                <input
                  {...register('slug', { required: 'Le slug est requis' })}
                  className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                  placeholder="slug-de-article"
                />
                {errors.slug && (
                  <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                Extrait
              </label>
              <textarea
                {...register('excerpt')}
                rows={2}
                className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50 resize-none"
                placeholder="Bref résumé de l'article"
              />
            </div>

            {/* Markdown Editor and Preview */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                Contenu (Markdown) *
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Editor */}
                <div>
                  <React.Suspense fallback={<div>Chargement de l'éditeur...</div>}>
                    <MdEditor
                      value={markdownContent}
                      style={{ height: '400px' }}
                      renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                      onChange={handleEditorChange}
                      config={{
                        view: {
                          menu: true,
                          md: true,
                          html: false,
                        },
                      }}
                    />
                  </React.Suspense>
                </div>

                {/* Live Preview */}
                <div className="border border-designColor/20 rounded-lg p-4 overflow-y-auto max-h-[400px] prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-textColor mb-2">
                Image de couverture
              </label>
              
              {coverPreview ? (
                <div className="relative">
                  <img
                    src={coverPreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-designColor/20"
                  />
                  <button
                    type="button"
                    onClick={removeCover}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-designColor/20 rounded-lg cursor-pointer hover:border-designColor/50 transition-colors">
                  <FiUpload size={24} className="text-textColor/50 mb-2" />
                  <span className="text-textColor/70 text-sm">Cliquez pour uploader une image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">
                  Tags (séparés par des virgules)
                </label>
                <input
                  {...register('tags')}
                  className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                  placeholder="React, JavaScript, Tutorial"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-textColor mb-2">
                  Catégorie
                </label>
                <input
                  {...register('category')}
                  className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
                  placeholder="Développement, Design..."
                />
              </div>
            </div>

            {/* Published */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                {...register('published')}
                className="w-4 h-4 rounded border-designColor/20 text-designColor focus:ring-designColor"
              />
              <label htmlFor="published" className="text-sm text-textColor">
                Publier cet article
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

export default BlogForm;
