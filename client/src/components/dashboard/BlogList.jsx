import React from 'react';
import { FiEdit2, FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

const BlogList = ({ posts, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse text-textColor/50">Chargement des articles...</div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-textColor/50">Aucun article trouvé</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-designColor/10 border-b border-designColor/20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-textColor uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-textColor uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-designColor/10">
            {posts.map((post, index) => (
              <motion.tr
                key={post._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-designColor/5 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-textColor">{post.title}</div>
                      <div className="text-xs text-textColor/60">{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      post.published
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}
                  >
                    {post.published ? (
                      <>
                        <FiCheckCircle size={12} />
                        <span>Publié</span>
                      </>
                    ) : (
                      <>
                        <FiCircle size={12} />
                        <span>Brouillon</span>
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textColor/70">
                  {post.createdAt
                    ? format(new Date(post.createdAt), 'dd MMM yyyy', { locale: fr })
                    : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-designColor/10 text-designColor text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-textColor/50 text-xs">Aucun tag</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => onEdit(post)}
                    className="text-designColor hover:text-designColor/80 mr-3 transition-colors"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(post._id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
