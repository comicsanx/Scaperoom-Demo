import { useGame } from "../context/GameContext";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import GameContainer from "../pages/GameContainer";
import "../CSS/Game.css";


import { Dropdown, Button, OverlayTrigger, Tooltip  } from 'react-bootstrap'


// añadir el componente a gamecontainer

export const InfoModalUser = () => {

  const { user, setUser, nivelActual, apiCall, pistasUsadas, token, menuOpen, timerRef, setMenuOpen } = useGame()

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  const fetchUserData = async () => {
    if (user) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const userData = await apiCall(
        (import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api") + "/api/user/profile",
        "GET",
        null,
        token
      );
      setUser(userData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [apiCall, user, setUser]);


  if (loading) return <p>Cargando datos del jugador...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No se pudieron cargar los datos del jugador.</p>;



  function hintMessage(pistasUsadas) {
    const usadas = pistasUsadas.length;

    if (usadas === 0) {
      return 'Aún no has usado pistas, ¡la ayuda está lista cuando la necesites!';
    } else if (usadas === 1) {
      return 'Una pista ha sido revelada, pero aún queda ayuda disponible.';
    } else if (usadas === 2) {
      return 'Solo te queda una pista, ¡úsala sabiamente!';
    } else if (usadas >= 3) {
      return 'No queda más ayuda, ahora toca confiar en tu ingenio.';
    }

    return '';
  }

  const hints = [1, 2, 3];




  return (


    <Dropdown drop="end">
      <Dropdown.Toggle as={Button} variant="secondary">
        info
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-3">
        <h2>Informe Clasificado</h2>

        <div className="d-flex align-items-center gap-3 mb-3">
          {user.avatar_filename && (
            <img
              src={user.avatar_filename}
              alt="Foto de perfil"
              className="rounded-circle modalUser-avatar"
            />
          )}
          <h3 className="modalUser-name">{user.username}</h3>
        </div>
        {/* <div>Tiempo: <strong><Timer menuOpen={menuOpen} ref={timerRef} /> segundos</strong></div> */}
        <p>Nivel : <strong>{nivelActual}</strong></p>
        <p> {hintMessage(pistasUsadas)} </p>

        <div className="d-flex gap-3 mt-3">
          {hints.map((number) => {
            const used = pistasUsadas.length >= number
            const tooltipText = used
              ? " El secreto ya fue revelado."
              : "Un consejo espera, solo tienes que solicitarlo.";

            return (
              <OverlayTrigger
                key={number}
                placement="top"
                overlay={<Tooltip id={`tooltip-${number}`}>{tooltipText}</Tooltip>}
              >
                <button
                  disabled
                  className={`rounded-circle modalUser-hints btn btn-sm ${used
                    ? "modalUse-hints-used"
                    : "modalUse-hints-unused"}`}
                  aria-label={`Pista ${number}`}
                >
                  <i className="fa-solid fa-lightbulb"></i>
                </button>
              </OverlayTrigger>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};