import { useRef, useEffect } from 'react';

const SimpleAudio = () => {
  const audioRef = useRef(null);

  useEffect(() => {

    const handleClick = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <audio ref={audioRef}>
      <source src="/sounds/background-music.mp3" type="audio/mpeg" />
    </audio>
  );
};

export default SimpleAudio;