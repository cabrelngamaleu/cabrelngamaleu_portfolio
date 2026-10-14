import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import SectionTitle from '../common/SectionTitle';
import BlogCard from './BlogCard';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../common/AnimatedButton';

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/blog');
      const publishedPosts = response.data.filter((post) => post.published);
      setPosts(publishedPosts.slice(0, 3)); // Show only 3 posts
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des articles:', err);
      setError('Impossible de charger les articles.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-bodyColor/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Mon Blog" subtitle="Derniers articles et réflexions" />
          <LoadingSpinner size="lg" className="my-20" />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-bodyColor/50">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Mon Blog" subtitle="Derniers articles et réflexions" />

        {error ? (
          <div className="text-center py-20">
            <p className="text-textColor/80 text-lg">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-textColor/80 text-lg">Aucun article pour le moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>

            {posts.length >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <AnimatedButton variant="outline">Voir tous les articles</AnimatedButton>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
