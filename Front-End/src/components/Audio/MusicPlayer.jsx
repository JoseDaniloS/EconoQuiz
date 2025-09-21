import { useRef, useState } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        // Se está tocando, pausa
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Se não está tocando, inicia
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Erro ao controlar música:', error);
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
        {isPlaying ? '🔊 Som ON' : '🔇 Som OFF'}
      </button>
    </div>
  );
};

export default MusicPlayer;