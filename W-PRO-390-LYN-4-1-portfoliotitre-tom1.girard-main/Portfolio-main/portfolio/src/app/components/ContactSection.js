'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'Message envoyé avec succès !' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Une erreur est survenue' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Erreur lors de l\'envoi du message' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
<section className="min-h-screen bg-black py-24 px-6">
  <div className="max-w-3xl mx-auto text-left">
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
      <h2 className="text-5xl font-light tracking-tight text-white">Contact<span className="text-zinc-500">.</span></h2>
    </motion.div>
    <motion.form className="bg-zinc-900 p-8 border border-zinc-800" onSubmit={handleSubmit} variants={fadeInUp} {...fadeInUp}>
      <div className="space-y-6">
        <div>
          <label className="block text-zinc-400 mb-2">Nom</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white" placeholder="Votre nom" required />
        </div>
        <div>
          <label className="block text-zinc-400 mb-2">Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white" placeholder="votre.email@example.com" required />
        </div>
        <div>
          <label className="block text-zinc-400 mb-2">Message</label>
          <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white" placeholder="Votre message ici..." required></textarea>
        </div>
        <button type="submit" className="w-full py-3 bg-white text-black text-center transition-colors duration-300">
          {isLoading ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </div>
    </motion.form>
  </div>
</section>
  );
};

export default ContactSection;
