"use client";

import { motion } from "framer-motion";
import { Code, Globe, Database, Server, Terminal, Monitor } from "lucide-react";

const SkillsSection = () => {
  const skills = [
    {
      name: "Frontend",
      icon: Globe,
      items: [
        "JavaScript",
        "HTML/CSS",
      ],
    },
    {
      name: "Backend",
      icon: Server,
      items: [
        "PHP",
        "SQL",
      ],
    },
    {
      name: "CMS",
      icon: Monitor,
      items: ["WordPress", "DIVI", "ELEMENTOR"],
    },
    {
      name: "Compétences personnelles",
      icon: Terminal,
      items: [
        "Autonomie",
        "Capacité d'adaptation",
        "Créativité",
        "Rigueur",
        "Discrétion",
        "Écoute",
        "Travail en équipe",
        "Curiosité",
      ],
    },
  ];

  return (
<section id="skills" className="py-20 px-6 bg-black">
  <div className="max-w-6xl mx-auto">
    <motion.h2 className="text-4xl font-light text-left text-white mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      Skills<span className="text-zinc-500">.</span>
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.map((skill, index) => (
        <motion.div key={index} className="p-6 bg-zinc-900 border border-zinc-800" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
          <div className="flex items-center mb-4">
            <skill.icon className="w-10 h-10 mr-4 text-zinc-500" />
            <h3 className="text-xl font-light text-white">{skill.name}</h3>
          </div>
          <ul className="text-zinc-300">
            {skill.items.map((item, i) => (
              <li key={i} className="text-sm">• {item}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
</section>
  );
};

export default SkillsSection;
