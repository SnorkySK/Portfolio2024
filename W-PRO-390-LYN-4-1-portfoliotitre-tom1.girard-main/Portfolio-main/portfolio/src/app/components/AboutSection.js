'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';

const AboutSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  return (
    <section className="min-h-screen bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Information Block - Left Column */}
        <motion.div className="lg:col-span-7 space-y-12 text-left" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-light tracking-tight text-white">
            À propos<span className="text-zinc-500">.</span>
          </h2>
          <div className="space-y-6">
            <h3 className="text-3xl font-light text-white">Tom Girard</h3>
            <p className="text-zinc-400 text-lg font-light leading-relaxed">
              Développeur passionné par la création d&apos;expériences numériques modernes, je me spécialise dans l&apos;intégration web et la conception de sites WordPress performants et optimisés. Fort d&apos;une expérience variée allant de la maintenance de sites pour des institutions locales à la création de solutions e-commerce complètes, j&apos;allie créativité et rigueur technique pour donner vie à des projets divers. Mon approche repose sur une recherche constante d&apos;innovation et une adaptation aux besoins des utilisateurs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 bg-zinc-900 border border-zinc-800 p-6">
            <motion.div variants={fadeInUp} {...fadeInUp} className="text-zinc-300 flex items-center gap-4">
              <MapPin className="w-5 h-5 text-zinc-500" />
              <span>Basé à Lyon, France</span>
            </motion.div>
            <motion.div variants={fadeInUp} {...fadeInUp} className="text-zinc-300 flex items-center gap-4">
              <Briefcase className="w-5 h-5 text-zinc-500" />
              <span>Développeur Full-Stack / CMS</span>
            </motion.div>
            <motion.div variants={fadeInUp} {...fadeInUp} className="text-zinc-300 flex items-center gap-4">
              <Calendar className="w-5 h-5 text-zinc-500" />
              <span>2 ans d&apos;expérience</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Profile Block - Right Column */}
        <motion.div className="lg:col-span-5 bg-zinc-900 p-12 border border-zinc-800 text-center" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
          <div className="flex flex-col items-center justify-center h-full">
            <Image 
              src="/pfp.webp" 
              alt="Tom Girard" 
              className="rounded-full object-cover" 
              width={150} 
              height={150} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
