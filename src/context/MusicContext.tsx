import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType>({ isPlaying: false, toggleMusic: () => {} });

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    const audio = new Audio(
      'https://cdn.pixabay.com/audio/2024/11/26/audio_fe0e4498d3.mp3'
    );
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    // Attempt autoplay with fade-in
    const tryAutoPlay = () => {
      if (hasAutoPlayed.current) return;
      hasAutoPlayed.current = true;
      audio.play().then(() => {
        setIsPlaying(true);
        // Fade in volume
        let vol = 0;
        const fadeIn = setInterval(() => {
          vol = Math.min(vol + 0.01, 0.15);
          audio.volume = vol;
          if (vol >= 0.15) clearInterval(fadeIn);
        }, 50);
      }).catch(() => {
        // Autoplay blocked — wait for user interaction
        const handler = () => {
          audio.play().then(() => {
            setIsPlaying(true);
            let vol = 0;
            const fadeIn = setInterval(() => {
              vol = Math.min(vol + 0.01, 0.15);
              audio.volume = vol;
              if (vol >= 0.15) clearInterval(fadeIn);
            }, 50);
          }).catch(() => {});
          document.removeEventListener('click', handler);
          document.removeEventListener('touchstart', handler);
        };
        document.addEventListener('click', handler, { once: true });
        document.addEventListener('touchstart', handler, { once: true });
      });
    };

    // Small delay to let page settle
    const timer = setTimeout(tryAutoPlay, 800);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      audioRef.current.volume = 0.15;
      setIsPlaying(true);
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
