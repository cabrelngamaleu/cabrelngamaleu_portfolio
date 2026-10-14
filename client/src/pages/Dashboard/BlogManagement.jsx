import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import api from '../../services/api';
import BlogList from '../../components/dashboard/BlogList';
import BlogForm from '../../components/dashboard/BlogForm';

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      setError('');
      const response = await api.get('/blog');
      // Sort by date descending
      const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sorted);
    } catch (err) {
      console.error('Erreur lors du chargement des articles:', err);
      setError('Erreur lors du chargement des articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = () => {
    setSelectedPost(null);
    setShowForm(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowForm(true);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return;
    }

    try {
      await api.delete(`/blog/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert("Erreur lors de la suppression de l'article");
    }
  };

  const handleFormSuccess = () => {
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text-green mb-2">Gestion du Blog</h1>
          <p className="text-textColor/70">Gérez vos articles de blog et brouillons</p>
        </div>
        <button
          onClick={handleAddPost}
          className="flex items-center space-x-2 px-4 py-2 bg-designColor hover:bg-designColor/90 text-bodyColor rounded-lg font-semibold transition-colors"
        >
          <FiPlus size={20} />
          <span>Nouvel article</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Blog list */}
      <BlogList
        posts={posts}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
        loading={loading}
      />

      {/* Blog form modal */}
      {showForm && (
        <BlogForm
          post={selectedPost}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default BlogManagement;
