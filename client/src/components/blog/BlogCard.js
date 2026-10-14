import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BlogCard = ({ post }) => {
  const formattedDate = format(new Date(post.createdAt), 'd MMM yyyy', { locale: fr });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bodyColor/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="text-designColor">{formattedDate}</span>
          {post.category && (
            <>
              <span className="text-textColor/50">•</span>
              <span className="text-textColor/70">{post.category}</span>
            </>
          )}
        </div>

        <h3 className="text-xl font-titleFont font-bold text-textColor mb-3 group-hover:text-designColor transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-textColor/80 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-designColor/20 text-designColor rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          <span className="text-designColor text-sm font-medium group-hover:underline">
            Lire la suite →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
