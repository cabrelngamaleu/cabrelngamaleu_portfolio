import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import SectionTitle from '../common/SectionTitle';
import BlogCard from './BlogCard';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../common/AnimatedButton';
import GlassCard from '../common/GlassCard';

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
      setPosts(publishedPosts.slice(0, 3));
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
      <section id="blog" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 mesh-bg opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="Blog"
            title="Partages & retours d'expérience"
            subtitle="Derniers articles, notes de build et réflexions produit."
          />
          <LoadingSpinner size="lg" className="my-20" />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 mesh-bg opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Blog"
          title="Partages & retours d'expérience"
          subtitle="Derniers articles, notes de build et réflexions produit — courts, concrets, actionnables."
        />

        {error ? (
          <GlassCard className="text-center py-12">
            <p className="text-textMuted text-lg">{error}</p>
          </GlassCard>
        ) : posts.length === 0 ? (
          <GlassCard className="text-center py-12">
            <p className="text-textMuted text-lg">Aucun article pour le moment.</p>
            <p className="text-textFaint text-sm mt-2">
              Les prochains posts arrivent bientôt — stay tuned.
            </p>
          </GlassCard>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-10 auto-rows-fr">
              {posts.map((post, i) => (
                <BlogCard key={post._id} post={post} delay={i * 0.06} />
              ))}
            </div>

            {posts.length >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <AnimatedButton variant="outline" className="rounded-full px-7 btn-shimmer">
                  Voir tous les articles
                </AnimatedButton>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
