import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export const Login = () => {
    const { login } = useGame();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

       const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Intentando iniciar sesión con:", email, password);
        setError(null);

        try {
            const resp = await login(email, password); 
            console.log("login realizado", resp);
            console.log(resp);
            if (resp) {
                navigate("/dashboard");
            } else {
                console.error("Error en el login.");
                setError("Credenciales inválidas.");
            }

            console.log("Login exitoso, token:", localStorage.getItem("token"));
        } catch (error) {
            console.error("Error de red al iniciar sesión:", error);
            setError("Error de conexión al servidor.");
        }
    };   

    return (
        <div className="text-center mt-5 container">
            <h1 className="mb-4">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">Entrar</button>
            </form>
            <div className="mt-3">
                <button
                    className="btn btn-link"
                    onClick={() => navigate("/forgot-password")}
                >
                    He olvidado mi contraseña
                </button>
            </div>
        </div>
    );
};