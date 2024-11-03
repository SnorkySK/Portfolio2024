'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ChevronLeft, ChevronRight, Volume2, SkipForward, SkipBack, Zap } from 'lucide-react';

const playlists = {
  playlist1: ['/playlist1/song1.mp3', '/playlist1/song2.mp3'],
  playlist2: ['/playlist2/song1.mp3', '/playlist2/song2.mp3'],
};

const Song = ({ isPlaying, toggleMusicPlay, audioRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [targetPosition, setTargetPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isDancing, setIsDancing] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState('playlist1');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Définir skipForward et skipBack avant handleMediaKeyPress
  const skipForward = useCallback(() => {
    if (currentSongIndex < playlists[currentPlaylist].length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  }, [currentSongIndex, currentPlaylist]);

  const skipBack = useCallback(() => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  }, [currentSongIndex]);

  // Synchroniser l'état du menu avec isPlaying uniquement
  useEffect(() => {
    if (isPlaying) {
      setIsMenuOpen(true);
      audioRef.current?.play();
    } else {
      setIsMenuOpen(false);
      setIsDancing(false); // Arrêter la danse si la musique est arrêtée
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const deltaY = window.scrollY - lastScrollY;
      const deltaTime = now - lastTime;
      const speed = Math.abs(deltaY / deltaTime);
      setScrollSpeed(speed);
      setTargetPosition(window.scrollY + window.innerHeight / 2);
      lastScrollY = window.scrollY;
      lastTime = now;
    };

    const animate = () => {
      setCurrentPosition((prevPosition) => {
        const lerpFactor = Math.min(0.1 + scrollSpeed * 0.5, 1);
        const newPosition = prevPosition + (targetPosition - prevPosition) * lerpFactor;
        return Math.abs(newPosition - targetPosition) < 0.5 ? targetPosition : newPosition;
      });
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetPosition, scrollSpeed]);

  useEffect(() => {
    const handleAudioEnd = () => {
      if (currentSongIndex < playlists[currentPlaylist].length - 1) {
        setCurrentSongIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsDancing(false);
        setIsMenuOpen(false);
      }
    };

    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.src = playlists[currentPlaylist][currentSongIndex];
      currentAudio.play();
      currentAudio.addEventListener('ended', handleAudioEnd);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('ended', handleAudioEnd);
      }
    };
  }, [audioRef, currentPlaylist, currentSongIndex]);

  const handleMediaKeyPress = useCallback(
    (e) => {
      switch (e.code) {
        case 'MediaPlayPause':
          toggleMusicPlay();
          break;
        case 'MediaTrackNext':
          skipForward();
          break;
        case 'MediaTrackPrevious':
          skipBack();
          break;
        default:
          break;
      }
    },
    [toggleMusicPlay, skipBack, skipForward] // Ajoutez `skipBack` et `skipForward` ici
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener('keydown', handleMediaKeyPress);
    return () => window.removeEventListener('keydown', handleMediaKeyPress);
  }, [handleMediaKeyPress]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleDance = () => {
    if (isPlaying) {
      setIsDancing(!isDancing);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const switchPlaylist = (playlist) => {
    setCurrentPlaylist(playlist);
    setCurrentSongIndex(0);
    setIsDancing(false);

    if (audioRef.current) {
      audioRef.current.src = playlists[playlist][0];
      audioRef.current.play();
      if (!isPlaying) toggleMusicPlay();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            id="music-menu"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            style={{ top: `${currentPosition}px`, right: 0 }}
            className="fixed transform -translate-y-1/2 p-4 rounded-l-lg z-50 transition-all duration-300 shadow-lg bg-zinc-900"
          >
            <button
              onClick={toggleMenu}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-zinc-700 p-1 rounded-full text-white shadow-md"
            >
              {isMenuOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {isMenuOpen && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Music className="w-5 h-5 text-white" />
                  <span className="text-sm font-light">Musique en cours</span>
                </div>

                <button
                  onClick={toggleMusicPlay}
                  className="w-full py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-sm font-medium rounded-lg shadow text-white transition"
                >
                  {isPlaying ? 'Arrêter la musique' : 'Jouer la musique'}
                </button>

                {/* Playlist selection buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => switchPlaylist('playlist1')}
                    className={`w-1/2 py-2 px-2 mr-1 text-sm font-medium rounded-lg shadow transition ${
                      currentPlaylist === 'playlist1' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    Playlist 1
                  </button>
                  <button
                    onClick={() => switchPlaylist('playlist2')}
                    className={`w-1/2 py-2 px-2 ml-1 text-sm font-medium rounded-lg shadow transition ${
                      currentPlaylist === 'playlist2' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    Playlist 2
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-zinc-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full cursor-pointer accent-white"
                  />
                </div>

                <div className="flex justify-between text-white">
                  <button
                    onClick={skipBack}
                    className="flex items-center justify-center w-full py-2 px-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-medium rounded-lg shadow transition"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    onClick={skipForward}
                    className="flex items-center justify-center w-full py-2 px-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-medium rounded-lg shadow transition"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={toggleDance}
                  className="w-full py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-sm font-medium rounded-lg shadow text-white transition"
                >
                  <Zap className="w-4 h-4 inline mr-2" />
                  {isDancing ? 'Arrêter de Danser' : 'Danser'}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dance GIFs */}
      {isDancing && (
        <>
          <motion.img
            src="/Pdance.gif"
            alt="Dance Left"
            className="fixed left-1/4 top-1/2 transform -translate-y-1/2 w-40 h-auto z-40"
            style={{ top: `${currentPosition}px` }}
          />
          <motion.img
            src="/Pdance.gif"
            alt="Dance Right"
            className="fixed right-1/4 top-1/2 transform -translate-y-1/2 w-40 h-auto z-40"
            style={{ top: `${currentPosition}px` }}
          />
          <motion.img
            src="/Sdance.gif"
            alt="Dance Center"
            className="fixed left-1/2 transform -translate-x-1/2 -translate-y-[400%] w-60 h-auto z-40"
            style={{ top: `${currentPosition}px` }}
          />
        </>
      )}
    </>
  );
};

export default Song;
