import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGame } from '../context/GameContext';
import { ButtonWithSFX } from '../components/SFXButton'; 
import { UserProfile } from '../components/UserProfile';
import '../CSS/General-UI.css';

export function Dashboard() {
    const { setIsMusicEnabled, setNivelActual, nivelActual, setHasUserInteracted, hasUserInteracted, user, isUserLoading, token } = useGame();
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

    // Necesario para el perfil del jugador
    useEffect(() => {
        if (!isUserLoading && !user) {
            console.warn("No user found after loading, redirecting to home.");
            navigate('/');
        }
    }, [isUserLoading, user, navigate]);

    if (isUserLoading) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-section">
                    <h1>Cargando perfil de usuario...</h1>
                    <p>Por favor, espera un momento.</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    // para mostrar si ha jugado o no
    const hasPlayed = user.gameSession && (user.gameSession.current_level > 0 || user.gameSession.accumulated_time > 0);


    // Necesario para la navegación al juego
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

    //  const handleHowToPlay = () => {
    //     // Navegar a tu ruta de "Cómo Jugar"
    //     navigate('/how-to-play'); // Asume que tienes esta ruta
    // };

    return (
        <div className="dashboard-container container-fluid">
            {/* Usamos las clases de Bootstrap para las filas y columnas */}
            <div className="row justify-content-center align-items-center">
                {/* Sección de Control de Juego */}
                <div className="col-12 col-md-6 col-lg-5 dashboard-section game-controls">
                    <h1>¡Bienvenido, {user.username}!</h1>
                    <p>¡Prepárate para la aventura, agente!</p>
                    <div className="btn-group-vertical"> {/* Grupo de botones vertical */}
                        <ButtonWithSFX onClick={handleStartNewGame} sfxName="BUTTON_CLICK">
                            Nueva Partida
                        </ButtonWithSFX>

                        {hasPlayed ? (
                            <ButtonWithSFX onClick={handleContinueGame} sfxName="BUTTON_CLICK">
                                Continuar Partida (Nivel {user.gameSession.current_level})
                            </ButtonWithSFX>
                        ) : (
                            <ButtonWithSFX disabled sfxName="BUTTON_CLICK">
                                Continuar Partida (No hay progreso)
                            </ButtonWithSFX>
                        )}

{/* añadir onclick cuando se defina la ruta */}
                        <ButtonWithSFX sfxName="BUTTON_CLICK"> 
                            Cómo Jugar
                        </ButtonWithSFX>

                        {/* Botón de prueba SFX, puedes quitarlo después */}
                        <ButtonWithSFX sfxName="BUTTON_CLICK">
                            Boton prueba SFX
                        </ButtonWithSFX>
                    </div>
                </div>

                {/* Sección del Perfil de Usuario */}
                {/* col-12 para móviles, col-md-6 para tablets/desktops, col-lg-5 para pantallas grandes */}
                <div className="col-12 col-md-6 col-lg-5 dashboard-section user-profile-section">
                    <h2>Tu Perfil</h2>
                    <UserProfile />
                </div>
            </div>
        </div>
    );
}