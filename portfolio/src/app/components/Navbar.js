'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleDownloadCV = () => {
    const cvPath = '/CV.pdf';
    window.open(cvPath, '_blank');
  };

  const menuItems = [
    { href: '#about', label: 'À propos' },
    { href: '#projects', label: 'Projets' },
    { href: '#skills', label: 'Compétences' },
    { href: '#contact', label: 'Contact' },
  ];

  const fadeInUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
        className="fixed w-full px-8 py-6 bg-black/90 backdrop-blur-sm border-b border-zinc-800 z-50"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="font-light tracking-widest"
          >
            <a href="#home" className="text-white hover:text-zinc-300 transition-colors duration-300">
              <span className="text-2xl">TG</span>
              <span className="text-xs ml-2 text-zinc-500">PORTFOLIO</span>
            </a>
          </motion.div>

          <div className="hidden md:flex items-center gap-12">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial="hidden"
                animate="visible"
                variants={fadeInUpVariants}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-sm text-zinc-300 hover:text-white tracking-wider transition-colors duration-300"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={handleDownloadCV}
              className="group flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 shadow-lg text-white font-medium rounded-full transition-all duration-300"
            >
              <Download size={18} className="text-white" />
              <span className="text-sm">Télécharger CV</span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden text-zinc-300 hover:text-white transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute inset-x-0 top-full mt-2 mx-4"
            >
              <div className="p-6 bg-zinc-900/95 backdrop-blur-sm border border-zinc-800">
                <div className="flex flex-col space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="text-sm text-zinc-300 hover:text-white tracking-wider transition-colors duration-300"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                  <motion.button
                    onClick={handleDownloadCV}
                    className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 shadow-lg text-white font-medium rounded-full transition-all duration-300"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2, delay: menuItems.length * 0.1 }}
                  >
                    <Download size={18} className="text-white" />
                    <span className="text-sm">Télécharger CV</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
