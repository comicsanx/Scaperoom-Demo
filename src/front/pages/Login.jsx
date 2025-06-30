import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { ButtonWithSFX } from '../components/SFXButton';
import '../CSS/General-UI.css';

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
        <div className="text-center mt-5 py-5 container">
            <div className="background-green d-flex flex-column align-items-center w-100">
                <div className="righteous ranking-number d-flex flex-column w-100 ps-2">
            <h1 className="header-title righteous mt-5 yellow mb-5">INICIAR SESIÓN</h1>
                </div>
            <form onSubmit={handleSubmit} className="col-md-6 mx-auto m-5">
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="open-sans orange form-label">Email</label>
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
                    <label htmlFor="exampleInputPassword1" className="open-sans orange form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <ButtonWithSFX type="submit" sfxName="BUTTON_CLICK" className="ClassicButton-Variation righteous mb-0 mt-4 rounded-pill px-5 py-3">Entrar</ButtonWithSFX>
            </form>
            <div className="mb-5">
                <button
                    className="btn btn-link open-sans orange"
                    onClick={() => navigate("/forgot-password")}
                >
                    <h5>He olvidado mi contraseña</h5>
                </button>
            </div>
            </div>
        </div>
    );
};