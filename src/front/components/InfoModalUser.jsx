import { useGame } from "../context/GameContext";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import GameContainer from "../pages/GameContainer";
import "../CSS/Game.css";
import { Dropdown, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Avatar_01 from '../assets/img/UI/Avatars/Avatar_01.png';
import Avatar_02 from '../assets/img/UI/Avatars/Avatar_02.png';
import Avatar_03 from '../assets/img/UI/Avatars/Avatar_03.png';
import Default_Avatar from '../assets/img/UI/Avatars/default_avatar.png';

const avatarMap = {
  "Avatar_01.png": Avatar_01,
  "Avatar_02.png": Avatar_02,
  "Avatar_03.png": Avatar_03,
  "default_avatar.png": Default_Avatar,
};

export const InfoModalUser = ({ showEnigma }) => {

  const {user, nivelActual, totalHintsUsed, isUserLoading  } = useGame()

  if (showEnigma) {
    return null;
  }

    if (isUserLoading) {
        return <p>Cargando información del jugador...</p>;
    }
      if (!user) {
        return <p>Información de usuario no disponible.</p>;
    }

  function hintMessage(totalHintsUsed) {

    if (totalHintsUsed === 0) {
      return 'Aún no has usado pistas, ¡la ayuda está lista cuando la necesites!';
    } else if (totalHintsUsed === 1) {
      return 'Una pista ha sido revelada, pero aún queda ayuda disponible.';
    } else if (totalHintsUsed === 2) {
      return 'Solo te queda una pista, ¡úsala sabiamente!';
    } else if (totalHintsUsed >= 3) {
      return 'No queda más ayuda, ahora toca confiar en tu ingenio.';
    }

    return '';
  }

  const hints = [1, 2, 3];

const avatarSrc = user.avatar_filename 
    ? avatarMap[user.avatar_filename] || Default_Avatar 
    : Default_Avatar; 

  return (

<div className="PlayerMenu-toggle">
    <Dropdown drop="end">
      <Dropdown.Toggle className="Avatar-Button" as="div">
                <img src={avatarSrc} className="Avatar" alt="Avatar"/> 
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-3">
        <h2>Informe Clasificado</h2>

        <div className="d-flex align-items-center gap-3 mb-3">
      
          <h3 className="modalUser-name">{user.username}</h3>
        </div>

        <p>Nivel : <strong>{nivelActual}</strong></p>
        <p> {hintMessage(totalHintsUsed)} </p>

        <div className="d-flex gap-3 mt-3">
          {hints.map((number) => {
            const used = totalHintsUsed >= number
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
</div>
  );
};