import { Outlet, useLocation } from "react-router-dom/dist"
import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import '../CSS/Responsive.css';
import '../CSS/General-UI.css';
import RotateDeviceImage from '../assets/img/rotate-device.png';

export function Layout() {
  const {
    audiusAudioUrl,
    isAudioLoading,
    audioPlayerRef,
    setCurrentMusicGroupId,
    isMusicEnabled,
    setIsMusicEnabled
  } = useGame();

  const location = useLocation();

  useEffect(() => {
    let newMusicGroupId;

    if (location.pathname === '/level') {
      newMusicGroupId = 1;
    } else if (location.pathname === '/level-2') {
      newMusicGroupId = 2;
    } else if (location.pathname === '/level-victory' || location.pathname === '/game-victory') {
      newMusicGroupId = 3;
    }
    else {
      newMusicGroupId = 0;
    }
    setCurrentMusicGroupId(newMusicGroupId);

  }, [location.pathname, setCurrentMusicGroupId]);

  const toggleMusic = () => {
    const newState = !isMusicEnabled;
    setIsMusicEnabled(newState);

    if (audioPlayerRef.current) {
      audioPlayerRef.current.muted = !newState;
    }

  };
  return (
    <>

      <audio ref={audioPlayerRef} loop>

        <source src={audiusAudioUrl || ''} type="audio/mpeg" />
        Tu navegador no soporta la reproducción de audio.
      </audio>


      {isAudioLoading && audiusAudioUrl && isMusicEnabled && (
        <p style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', zIndex: 1000 }}>Cargando música...</p>
      )}


      {audiusAudioUrl && (
        <button 
        id="toggle-music-button"
        onClick={toggleMusic}
        >

          {isMusicEnabled ? '🔇 Desactivar Música' : '🎵 Activar Música'}
        </button>
      )}
      <div className="responsive-gestor-container">
        <Outlet />
      </div>

      <div className="orientation-message">
        <img src={RotateDeviceImage} alt="Por favor, gira tu dispositivo" />
        <p>Por favor, gira tu dispositivo para una mejor experiencia de juego.</p>
        <p>¡Gira tu pantalla a horizontal!</p>
      </div>
    </>
  );
}