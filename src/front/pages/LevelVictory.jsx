import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGame } from "../context/GameContext";

export function LevelVictory() {
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";
    const { tiempo } = useGame(); 

    return (
        <div>
            <h1>¡Te has pasado el nivel!</h1>
            <p><strong>Tiempo empleado:</strong> {Math.floor(tiempo / 60)} minutos y {String(tiempo % 60).padStart(2, "0")} segundos</p>
            <button onClick={() => navigate(`/dashboard`)}>Menú</button>
            <button onClick={() => navigate(`/level-2`)}>Continuar a nivel 2</button>
        </div>
    );
}