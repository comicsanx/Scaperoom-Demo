import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://glorious-memory-695976v44pqg255jx-3001.app.github.dev/api/ranking/global")
            .then(res => res.json())
            .then(data => {
                console.log("Ranking:", data);
            })
            .catch(err => console.error("Error fetching ranking:", err));
    }, []);

    return (
        <div>
            <h1>Escape Room</h1>
            <button onClick={() => navigate(`/level/${1}`)}>Nueva Partida</button>
            <button onClick={() => navigate(`/ranking`)}>Ranking</button>
            <button onClick={() => navigate(`/creditos`)}>Créditos</button>
        </div>
    );
}
