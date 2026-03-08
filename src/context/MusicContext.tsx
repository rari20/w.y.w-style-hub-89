import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType>({ isPlaying: false, toggleMusic: () => {} });

const AUDIO_URL = 'https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e0.mp3';
const TARGET_VOLUME = 0.18;

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Create audio element in DOM for better compatibility
    const audio = document.createElement('audio');
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audio.crossOrigin = 'anonymous';
    audio.src = AUDIO_URL;
    document.body.appendChild(audio);
    audioRef.current = audio;

    const fadeIn = () => {
      let vol = 0;
      const interval = setInterval(() => {
        vol = Math.min(vol + 0.005, TARGET_VOLUME);
        audio.volume = vol;
        if (vol >= TARGET_VOLUME) clearInterval(interval);
      }, 40);
    };

    const startPlayback = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;
      // Synchronously call play within user gesture
      const promise = audio.play();
      if (promise) {
        promise.then(() => {
          setIsPlaying(true);
          fadeIn();
        }).catch(() => {});
      }
    };

    // Listen for first user interaction
    const events = ['click', 'touchstart', 'keydown'] as const;
    events.forEach(evt => {
      document.addEventListener(evt, startPlayback, { once: true, passive: true });
    });

    return () => {
      events.forEach(evt => {
        document.removeEventListener(evt, startPlayback);
      });
      audio.pause();
      audio.src = '';
      audio.remove();
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = TARGET_VOLUME;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
