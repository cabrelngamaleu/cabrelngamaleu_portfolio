import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { socialLinks } from '../../data/socialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0b]/50 backdrop-blur py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-titleFont font-bold text-lg">
              <span className="text-designColor">Cabrel</span>{' '}
              <span className="text-white">Ngamaleu</span>
            </div>
            <p className="text-sm text-textMuted mt-1">Full-Stack Developer • Yaoundé • Remote</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-textColor hover:text-white hover:bg-white/[0.10] transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-textColor hover:text-white hover:bg-white/[0.10] transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-textColor hover:text-white hover:bg-white/[0.10] transition-colors"
            >
              <FaTwitter />
            </a>
          </div>
          <div className="text-center md:text-right text-sm">
            <p className="text-textMuted">© {currentYear} Cabrel Ngamaleu. Tous droits réservés.</p>
            <p className="text-textFaint mt-1">
              Crafté avec <span className="text-designColor">♥</span> — performance & détails.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
