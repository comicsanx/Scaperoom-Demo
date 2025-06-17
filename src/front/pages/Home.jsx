import React, { useEffect } from "react"
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import GameContainer from "./GameContainer";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

export function Home() {
	 const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";


	/* const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	} */

	/* useEffect(() => {
		loadMessage()
	}, []) */


    return (
        <div>
            <h1>Escape Room</h1>
            <button onClick={() => navigate(`/login`)}>Iniciar Sesión</button>
            <button onClick={() => navigate(`/signup`)}>Registro</button>
            <button onClick={() => navigate(`/credits`)}>Créditos</button>
        </div>
    );	
}; 