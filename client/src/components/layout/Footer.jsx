import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { socialLinks } from '../../data/socialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bodyColor border-t border-zinc-800 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-textColor hover:text-designColor transition-all duration-300 text-2xl hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-textColor hover:text-designColor transition-all duration-300 text-2xl hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-textColor hover:text-designColor transition-all duration-300 text-2xl hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-textColor text-sm">
              © {currentYear} Cabrel Ngamaleu. Tous droits réservés.
            </p>
            <p className="text-textColor/70 text-sm mt-2">
              Conçu avec <span className="text-designColor">❤️</span> par Cabrel Ngamaleu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
