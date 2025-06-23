import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGame } from '../context/GameContext';
import { ButtonWithSFX } from '../components/SFXButton'; 

export function Dashboard() {
    const { setIsMusicEnabled, setNivelActual, nivelActual, setHasUserInteracted, hasUserInteracted, sfxVolume, setSfxVolume, displaySfxVolume } = useGame();
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

    // Tu código comentado para fetching de ranking
    // useEffect(() => {
    //     fetch(`${API_BASE}/ranking/global`)
    //         .then(async res => {
    //             if (!res.ok) {
    //                 const text = await res.text();
    //                 throw new Error(`Error HTTP: ${res.status} - ${text}`);
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log("Ranking:", data);
    //         })
    //         .catch(err => console.error("Error fetching ranking:", err));
    // }, []);


    const handleStartNewGame = () => {

        if (!hasUserInteracted) {
            setHasUserInteracted(true);
            console.log("[Dashboard] Interacción de usuario registrada al iniciar 'Nueva Partida'.");
        }
        
        setIsMusicEnabled(true); 
        setNivelActual(1); 
        console.log("[Dashboard] Música activada y nivel establecido a 1 al iniciar 'Nueva Partida'.");
        navigate(`/level-1`); 
    };

    const handleContinueGame = () => {
        if (!hasUserInteracted) {
            setHasUserInteracted(true);
            console.log("[Dashboard] Interacción de usuario registrada al 'Continuar' partida.");
        }
        setIsMusicEnabled(true); 
        setNivelActual(nivelActual); 
        console.log("[Dashboard] Música activada y nivel establecido (ej. a 1) al 'Continuar' partida.");
        navigate(`/level-${nivelActual}`); 
    };

    return (
        <div>
            <h1>Escape Room</h1>
            <ButtonWithSFX onClick={handleStartNewGame} sfxName="BUTTON_CLICK">Nueva Partida</ButtonWithSFX>
            {/* <ButtonWithSFX onClick={handleHowToPlay} sfxName="BUTTON_CLICK">Cómo Jugar</ButtonWithSFX>  */}
            Como jugar (ruta aun no definida)
            <ButtonWithSFX onClick={handleContinueGame} sfxName="BUTTON_CLICK">Continuar</ButtonWithSFX>
            <ButtonWithSFX sfxName="BUTTON_CLICK">Boton prueba SFX</ButtonWithSFX>
        </div>
    );
}