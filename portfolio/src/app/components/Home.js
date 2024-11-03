// Home.js

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircle, Music } from 'lucide-react';
import Song from './Song';

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequencyData, setFrequencyData] = useState(new Array(64).fill(5));
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const audioRef = useRef(null); // Définition unique ici
  const audioContextRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;
    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

    const source = audioContextRef.current.createMediaElementSource(audioRef.current);
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);

    audioRef.current.volume = 0.5;

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const updateFrequencyData = () => {
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const amplifiedData = Array.from(dataArrayRef.current).map(value => Math.min(value * 2, 400));
    setFrequencyData(amplifiedData);

    animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
  };

  const toggleMusicPlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationFrameRef.current);
    } else {
      audioRef.current.play();
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black">
      <audio ref={audioRef} src="/bax.mp3" preload="auto" /> {/* Assurez-vous que le chemin est correct */}

      {/* Visualiseur de rythme */}
      <div className="absolute bottom-0 left-0 right-0 z-0 flex items-end justify-center h-48">
        {frequencyData.map((value, index) => {
          const isLeftSide = index < frequencyData.length / 2;
          const mirroredIndex = isLeftSide
            ? frequencyData.length / 2 - index - 1
            : index - frequencyData.length / 2;

          return (
            <motion.div
              key={index}
              className="shadow-lg"
              style={{
                background: 'linear-gradient(to top, #39FF14, #00FFFF, #4B0082)',
                width: `${(100 / frequencyData.length) - 0.2}%`,
                height: `${frequencyData[mirroredIndex]}px`,
                margin: '0 0.1%',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.05s ease-out',
              }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-center space-y-6 z-10"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-light tracking-tighter text-white relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tom<span className="text-zinc-500"> Girard</span>
        </motion.h1>

        <div className="text-zinc-500 text-sm tracking-widest font-light uppercase mt-2">
          Full-Stack Developer / CMS
        </div>

        <motion.p
          className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
        </motion.p>

        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex gap-6">
            <motion.a
              href="#contact"
              className="px-8 py-3 bg-white text-black font-light transition hover:bg-zinc-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contactez-moi
            </motion.a>

            <motion.a
              href="#projects"
              className="px-8 py-3 border border-zinc-700 text-zinc-300 font-light hover:border-white transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir les projets
            </motion.a>
          </div>

          <motion.button
            onClick={toggleMusicPlay}
            className="flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 font-light hover:text-white hover:border-white transition mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Music className="w-5 h-5" />
            <span>{isPlaying ? 'Pause Musique' : 'Jouer la Musique'}</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDownCircle className="w-6 h-6 text-zinc-500 hover:text-white transition-colors cursor-pointer" />
        </motion.div>
      </motion.div>

      {/* Menu de contrôle de la musique */}
      <Song isPlaying={isPlaying} toggleMusicPlay={toggleMusicPlay} audioRef={audioRef} />
    </section>
  );
};

export default Home;
