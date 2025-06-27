import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function LevelVictory() {
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

    return (
        <div>
            <h1>¡Te has pasado el nivel!</h1>
            <button onClick={() => navigate(`/dashboard`)}>menu</button>
            <button onClick={() => navigate(`/level-2`)}>Continuar a nivel 2</button>
            {/* <button onClick={() => navigate(`/game-victory`)}>Continuar a pantalla victoria</button> */}
        </div>
    );
}
