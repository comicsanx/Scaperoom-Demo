import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGame } from '../context/GameContext';
import { ButtonWithSFX } from '../components/SFXButton';
import { UserProfile } from '../components/UserProfile';
import { Ranking } from '../components/Ranking';
import '../CSS/General-UI.css';
import Logo from '../assets/img/UI/General_UI/Logo.png';



export function Dashboard() {
    const { setIsMusicEnabled, setNivelActual, nivelActual, setHasUserInteracted, hasUserInteracted, user, isUserLoading, token } = useGame();
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";
    
    const { logout } = useGame();

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

     const handleHowToPlay = () => {
        navigate('/how-to-play');

     }
     // boton de logout
    const handleLogoutClick = () => {
    logout(); 
    navigate('/login'); 
};


    return (
        <div className="dashboard-container container-fluid d-flex justify-content-center align-items-center vh-100 mt-5">
            <div className="row w-100 h-100">
                <div className="col-lg-3 col-md-4 col-sm-2 col-xs-2 d-flex flex-column mt-5">
                        <UserProfile />
                </div>

                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-6 game-controls d-flex flex-column">

                    <div className="row w-100">

                    <div className="logo-container col-12 text-center mb-auto mt-5 mx-auto px-5">
                        <img src={Logo} alt="Scaperoom Logo" className="Scaperoom-Logo img-fluid" />
                    </div>

                    <div className="btn-group-vertical d-flex justify-content-center align-items-center">
                        <div className="button-group col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-5">
                        <ButtonWithSFX onClick={handleStartNewGame} sfxName="BUTTON_CLICK" 
                        className="ClassicButton mb-3 rounded-pill px-4 py-3 w-100">
                          <h2>Nueva Partida</h2>
                        </ButtonWithSFX>
                        {hasPlayed ? (
                            <ButtonWithSFX onClick={handleContinueGame} sfxName="BUTTON_CLICK" className="ClassicButton mb-3 rounded-pill px-4 py-3 w-100">
                               <h2>Continuar</h2> 
                            </ButtonWithSFX>
                        ) : (
                            <ButtonWithSFX disabled sfxName="BUTTON_CLICK" className="ClassicButton mb-3 rounded-pill px-4 py-3 w-100">
                                <h2>Continuar</h2>
                            </ButtonWithSFX>
                        )}

                        <ButtonWithSFX onClick={handleHowToPlay} sfxName="BUTTON_CLICK" className="ClassicButton mb-3 rounded-pill px-4 py-3 w-100"> 
                            <h2>Cómo Jugar</h2>
                        </ButtonWithSFX>
                        <button onClick={handleLogoutClick}>Cerrar Sesión</button>

                        <ButtonWithSFX sfxName="BUTTON_CLICK" className="ClassicButton mb-3 rounded-pill px-4 py-3 w-100">
                            <h2>Boton prueba SFX</h2>
                        </ButtonWithSFX>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-2 col-xs-2 d-flex flex-column mt-5">      
                    <Ranking />
                </div >
            </div >
        </div >
            
    );
}