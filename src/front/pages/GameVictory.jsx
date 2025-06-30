import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";

export function GameVictory() {
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";
    const { tiempo } = useGame(); 
    const [accumulatedTime, setAccumulatedTime] = useState(parseInt(sessionStorage.getItem('level1Timer') || 0));

    useEffect(() => {
        setAccumulatedTime(accumulatedTime + tiempo);
    }, []);

    return (
        <div>
            <h1>¡Te has pasado el juego!</h1>
             <p><strong>Tiempo total:</strong> {Math.floor(accumulatedTime / 60)} minutos y {String(accumulatedTime % 60).padStart(2, "0")} segundos</p>
            <button onClick={() => navigate(`/dashboard`)}>Volver al inicio</button>
        </div>
    );
}
