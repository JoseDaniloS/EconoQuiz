import { useRef, useState } from 'react';

const HomeMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Erro na música da Home:', error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/background-music.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        style={{
          padding: '10px 15px',
          backgroundColor: isPlaying ? '#4CAF50' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {isPlaying ? '🔊 Música ON' : '🔇 Música OFF'}
      </button>
    </div>
  );
};

export default HomeMusic;