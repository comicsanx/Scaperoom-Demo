import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
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

    return (
        <div>
            <h1>Escape Room</h1>
            <button onClick={() => navigate(`/level/${1}`)}>Nueva Partida</button>
            <button onClick={() => navigate(`/ranking`)}>Ranking</button>
            <button onClick={() => navigate(`/creditos`)}>Créditos</button>
        </div>
    );
}
