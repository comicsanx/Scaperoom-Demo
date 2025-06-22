import { Outlet, useLocation } from "react-router-dom/dist"
import { useEffect, useCallback } from "react";
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
    currentVolume,
    setMusicVolume,
    displayMusicVolume,
    logout,
  } = useGame();

  const location = useLocation();

  useEffect(() => {

        const musicRoutes = ['/level-1', '/level-2', '/level-victory', '/game-victory']; 

        if (musicRoutes.includes(location.pathname)) {
            if (!isMusicEnabled) {
                console.log(`[Layout] Entrando en ruta de música (${location.pathname}). Habilitando música.`);
                setIsMusicEnabled(true);
            }
        } else {
            if (isMusicEnabled) {
                console.log(`[Layout] Saliendo de ruta de música (${location.pathname}). Deshabilitando música.`);
                setIsMusicEnabled(false);
            }
        }
if (location.pathname === '/' && !hasUserInteracted && isMusicEnabled) {
            console.log("[Layout] Activando hasUserInteracted en la ruta '/' si la música está habilitada.");
            setHasUserInteracted(true);
        }
         }, [location.pathname, isMusicEnabled, setIsMusicEnabled, hasUserInteracted, setHasUserInteracted]);

 useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasUserInteracted) {
                setHasUserInteracted(true);
                console.log("[Layout] Primera interacción del usuario detectada. Música puede empezar a sonar.");
            }
        };

        document.addEventListener('click', handleFirstInteraction, { once: true });
        document.addEventListener('keydown', handleFirstInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };
    }, [hasUserInteracted, setHasUserInteracted]);

     const toggleMusicButtonHandler = useCallback(() => {
        const newState = !isMusicEnabled;
        setIsMusicEnabled(newState);

        if (newState && !hasUserInteracted) {
            setHasUserInteracted(true);
            console.log("[Layout] Música activada por botón. hasUserInteracted = true.");
        } else if (!newState) {
            console.log("[Layout] Música desactivada por botón.");
        }
    }, [isMusicEnabled, setIsMusicEnabled, hasUserInteracted, setHasUserInteracted]);


 const handleMusicVolumeChange = useCallback((event) => {
        const newVolume = parseFloat(event.target.value);
        setMusicVolume(newVolume);
        console.log(`[Layout] Volumen de música cambiado a: ${newVolume}`);
    }, [setMusicVolume]);

  return (
    <>

       <audio ref={audioPlayerRef} loop>
                <source src={audiusAudioUrl || ''} type="audio/mpeg" />
                Tu navegador no soporta la reproducción de audio.
            </audio>
{location.pathname === '/' && (
     <button id="toggle-music-button" className={isMusicEnabled ? "music-on" : "music-off"} onClick={toggleMusicButtonHandler}>
                    {isMusicEnabled ? '🔇 Desactivar Música' : '🎵 Activar Música'}
                </button>
      )}
      {isMusicEnabled && audiusAudioUrl && (
       <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000, color: 'white' }}>
                    <label htmlFor="music-volume">Volumen Música:</label>
                    <input
                        type="range"
                        id="music-volume"
                        min="0"
                        max="1"
                        step="0.01"
                        value={displayMusicVolume}
                        onChange={handleMusicVolumeChange}
                    />
                    <span>{Math.round(displayMusicVolume * 100)}%</span>
                </div>
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