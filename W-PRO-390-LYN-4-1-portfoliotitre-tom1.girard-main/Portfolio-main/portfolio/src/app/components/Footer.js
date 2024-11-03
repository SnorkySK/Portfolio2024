'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    {
      href: "https://github.com/SnorkySK",
      label: "GitHub"
    },
    {
      href: "https://www.linkedin.com/in/tom1-girard",
      label: "LinkedIn"
    },
    {
      href: "mailto:girard.tom9@gmail.com",
      label: "Email"
    }
  ];

  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      color: "#fff",
      y: -3,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <footer className="relative py-12 px-6 bg-black border-t border-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-sm font-light tracking-wide"
            >
              © 2024 Tom Girard
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-600 text-xs font-light"
            >
              All rights reserved
            </motion.p>
          </div>

          <motion.div 
            className="flex items-center gap-8"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-zinc-500 text-sm font-light transition-colors hover:text-white"
                variants={linkVariants}
                whileHover="hover"
                aria-label={link.label}
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
