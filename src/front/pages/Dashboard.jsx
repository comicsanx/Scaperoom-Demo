import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Escape Room</h1>
            <button onClick={() => navigate(`/level/${1}`)}>Nueva Partida</button>
            <button onClick={() => navigate(`/ranking`)}>Ranking</button>
            <button onClick={() => navigate(`/creditos`)}>Créditos</button>
        </div>
    );
}
