import { useRef, useState, useEffect } from 'react';

const GameMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toca automaticamente quando entra no jogo
  useEffect(() => {
    const startGameMusic = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.2; // Volume mais baixo para o jogo
          audioRef.current.loop = true;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Música do jogo aguardando clique...');
      }
    };

    startGameMusic();
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
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
          padding: '8px 12px',
          backgroundColor: isPlaying ? '#4CAF50' : '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '15px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </div>
  );
};

export default GameMusic;