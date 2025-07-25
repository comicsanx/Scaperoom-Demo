import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { ButtonWithSFX } from '../components/SFXButton';
import '../CSS/General-UI.css';

export function LevelVictory() {
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";
    const { tiempo } = useGame();

    return (
        <div>
            <div className="text-center container form-main-container">
                <div className="background-green form-background d-flex flex-column align-items-center w-100">
                    <div className="righteous orange-header header-background d-flex justify-content-between align-items-center w-100">
                        <p className="header-title righteous yellow text-center">¡VICTORIA!</p>
                    </div>
                    <div className="menu-content-victory">
                        <p className="righteous orange">¡Te has pasado el Nivel 1!</p>
                        <p className="righteous orange"> Has empleado {Math.floor(tiempo / 60)} minutos y {String(tiempo % 60).padStart(2, "0")} segundos</p>
                        <div className="d-flex flex-column align-items-center">
                        <ButtonWithSFX sfxName="BUTTON_CLICK" className="ClassicButton-Variation righteous mb-0 mt-4 rounded-pill px-4 py-2" onClick={() => navigate(`/level-2`)}><h3>Continuar a nivel 2</h3></ButtonWithSFX>
                        <ButtonWithSFX sfxName="BUTTON_CLICK" className="ClassicButton-Variation righteous mb-0 mt-4 rounded-pill px-4 py-2" onClick={() => navigate(`/dashboard`)}><h3>Volver al inicio</h3></ButtonWithSFX>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}