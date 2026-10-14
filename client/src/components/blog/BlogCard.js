import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FiArrowUpRight, FiCalendar } from 'react-icons/fi';
import GlassCard from '../common/GlassCard';

const BlogCard = ({ post, delay = 0 }) => {
  const formattedDate = post.createdAt
    ? format(new Date(post.createdAt), 'd MMM yyyy', { locale: fr })
    : '';
  const tags = (post.tags || []).slice(0, 3);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  };

  return (
    <GlassCard
      delay={delay}
      spotlight
      padding={false}
      onMouseMove={handleMouseMove}
      className="spotlight-card overflow-hidden group flex flex-col cursor-pointer !p-0"
    >
      {post.coverImage && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[12%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          {post.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-white capitalize">
              {post.category}
            </span>
          )}
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <FiArrowUpRight className="text-sm" />
          </div>
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-textMuted">
            <FiCalendar className="text-designColor" /> {formattedDate}
          </span>
          {!post.coverImage && post.category && (
            <span className="px-2.5 py-1 rounded-full bg-designColor/15 text-designColor text-xs font-medium capitalize">
              {post.category}
            </span>
          )}
        </div>

        <h3 className="font-titleFont font-semibold text-white text-[17px] leading-snug group-hover:text-designColor transition-colors line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-textMuted line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-textColor"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white group-hover:text-designColor transition-colors">
          Lire la suite{' '}
          <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </GlassCard>
  );
};

export default BlogCard;
