import { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType>({ isPlaying: false, toggleMusic: () => {} });

const TARGET_VOLUME = 0.18;

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audio.preload = 'auto';
    audio.src = '/audio/piano-ambient.mp3';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = TARGET_VOLUME;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('Audio playback failed:', e.message);
        });
    }
  }, [isPlaying]);

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
