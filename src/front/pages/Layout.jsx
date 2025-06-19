import { Outlet, useLocation } from "react-router-dom/dist"
import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import '../CSS/Responsive.css';
import '../CSS/General-UI.css';

import RotateDeviceImage from '../assets/img/rotate-device.png';

export function Layout() {
  const {
    isAudioLoading,
    audioPlayerRef,
    isMusicEnabled,
    setIsMusicEnabled,
     hasUserInteracted, 
    setHasUserInteracted,
    audiusAudioUrl,
  } = useGame();

  const location = useLocation();

  const toggleMusic = () => {
    const newState = !isMusicEnabled;
    setIsMusicEnabled(newState);

     if (newState && !hasUserInteracted) { 
      setHasUserInteracted(true);
      console.log("[Layout] Música activada por el usuario. hasUserInteracted = true.");
    } else if (!newState) { 
        console.log("[Layout] Música desactivada por el usuario.");
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

      {audiusAudioUrl && location.pathname === '/' && (
        <button id="toggle-music-button" className={isMusicEnabled ? "music-on" : "music-off"} onClick={toggleMusic}>
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