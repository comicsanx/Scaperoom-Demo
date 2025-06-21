import { useNavigate } from "react-router-dom";

export function Home() {
	const navigate = useNavigate();
	// const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

	return (
		<div>
			<h1>Escape Room</h1>
			<button onClick={() => navigate(`/login`)}>Iniciar Sesión</button>
			<button onClick={() => navigate(`/signup`)}>Registro</button>
			<button onClick={() => navigate(`/credits`)}>Créditos</button>
		</div>
	);
}; 