'use client';

import React from 'react';
import { motion } from "framer-motion";
import Image from "next/image";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Vénissieux - Maintenance et Amélioration du Site",
      description: "J'ai contribué à la maintenance et à l'amélioration du site de la ville de Vénissieux ainsi que de sa section dédiée à la culture. Utilisant WordPress et le constructeur Divi, j'ai optimisé la structure du site, amélioré l'accessibilité des informations et mis en œuvre des éléments graphiques attractifs pour renforcer l'engagement des visiteurs.",
      tags: ["WordPress", "Divi", "Maintenance", "Accessibilité"],
      image: "/Veni.jpg",
      links: [
        { title: "Site principal", url: "https://venissieux.fr/" },
        { title: "Section Culture", url: "https://culture.venissieux.fr/" }
      ],
    },
    {
      title: "Maintenance Multi-Sites et Améliorations",
      description: "J'ai apporté mon aide pour la maintenance et l'amélioration de plusieurs sites web, notamment Mermoz Academy, la ville de Saint-Priest, et Cover Avocats. Mon travail a impliqué des mises à jour régulières, l'optimisation de la performance, et des améliorations de design avec WordPress et Divi pour garantir une meilleure expérience utilisateur.",
      tags: ["WordPress", "Divi", "Maintenance", "Optimisation"],
      image: "/wp.png",
      links: [
        { title: "Mermoz Academy", url: "https://mermoz-academy.com/" },
        { title: "Ville de Saint-Priest", url: "https://ville-saint-priest.fr/" },
        { title: "Cover Avocats", url: "https://coveravocats.fr/" }
      ],
    },
    {
      title: "ASTREC Application E-commerce",
      description: "Sur ce projet e-commerce, j'ai conçu le design et géré l'affichage des produits pour une expérience utilisateur fluide et intuitive. J'ai également contribué aux différents aspects du développement et assuré un suivi des fonctionnalités pour un bon fonctionnement global de la plateforme. Ce projet intègre Stripe pour un paiement sécurisé et une gestion complète des commandes.",
      tags: ["Symfony", "React", "MySQL", "Stripe"],
      image: "/img/ecommerce-project.png",
      github: "https://github.com/ZenkyR/ASTREC",
      highlights: [
        "Authentication sécurisée",
        "Intégration paiement Stripe",
        "Gestion des commandes et des produits"
      ]
    },
    {
      title: "Virtualine - Moteur de Jeu 2D",
      description: "Pour ce moteur de jeu 2D, j'ai eu l'idée initiale et présenté le concept. J'ai conçu et implémenté les animations, et j'ai également participé au développement de la mécanique de jeu, notamment en gérant les systèmes de points de vie et de dégâts. Ce projet explore les capacités de Flutter en matière de jeux avec une interface intuitive et des fonctionnalités avancées.",
      tags: ["Flutter", "Dart", "Moteur de jeu", "2D"],
      image: "/img/virtualine.png",
      github: "https://github.com/ZenkyR/Virtualine",
      highlights: [
        "Interface graphique intuitive pour la création de jeux 2D",
        "Système complet de rendu, d'animation et de son",
        "Gestion avancée des collisions, cartes, et ennemis"
      ]
    }
  ];

  const maxHighlights = Math.max(...projects.map(project => project.highlights?.length || 0));

  return (
    <section className="min-h-screen bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="mb-20 text-left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-light tracking-tight text-white">Projects<span className="text-zinc-500">.</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.article key={index} className="bg-zinc-900 p-6 border border-zinc-800" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" width={600} height={400} />
              </div>
              <h3 className="text-2xl font-light mt-4 mb-2 text-white">{project.title}</h3>
              <p className="text-zinc-300 mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-zinc-800 px-2 py-1 border border-zinc-700 text-zinc-300 text-xs">{tag}</span>
                ))}
              </div>
              <div className="flex gap-4 flex-wrap">
                {project.links?.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-500 transition">
                    {link.title}
                  </a>
                ))}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition">
                    Voir sur GitHub
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
