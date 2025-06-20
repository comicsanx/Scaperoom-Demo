import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Dashboard() {
    const { setIsMusicEnabled, setNivelActual, setHasUserInteracted, hasUserInteracted } = useGame();
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

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

    //  const handleStartNewGame = () => {
    //     // **IMPORTANTE para la política de autoplay del navegador:**
    //     // Nos aseguramos de que hasUserInteracted sea true con este clic,
    //     // por si el usuario llega aquí directamente sin una interacción previa.
    //     if (!hasUserInteracted) {
    //         setHasUserInteracted(true);
    //         console.log("[Dashboard] Interacción de usuario registrada al iniciar 'Nueva Partida'.");
    //     }
        
    //     setIsMusicEnabled(true); 
    //     setNivelActual(1); 
    //     console.log("[Dashboard] Música activada y nivel establecido a 1 al iniciar 'Nueva Partida'.");
    //     navigate(`/level`); 
    // };

  
    // const handleContinueGame = () => {

    //     if (!hasUserInteracted) {
    //         setHasUserInteracted(true);
    //         console.log("[Dashboard] Interacción de usuario registrada al 'Continuar' partida.");
    //     }
    //     setIsMusicEnabled(true); 
    //     setNivelActual(1); 
    //     console.log("[Dashboard] Música activada y nivel establecido (ej. a 1) al 'Continuar' partida.");
    //     navigate(`/level`); 
    // };

    return (
        <div>
            <h1>Escape Room</h1>
            <button onClick={() => navigate(`/level`)}>Nueva Partida</button> {/* onclick a handleStartNewGame */}
            <button>Cómo Jugar</button> 
            <button>Continuar</button> {/* onclick a handleContinueGame */}
            {/* falta definir rutas */}
        </div>
    );
}
