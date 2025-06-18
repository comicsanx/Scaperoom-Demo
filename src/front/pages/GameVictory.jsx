import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function GameVictory() {
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

    return (
        <div>
            <h1>¡Te has pasado el juego!</h1>
            <button onClick={() => navigate(`/dashboard`)}>Volver al inicio</button>
        </div>
    );
}
