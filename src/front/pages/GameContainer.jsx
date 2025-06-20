import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { ObjectsLevel1 } from "../data/ObjectsArray";
import Level1BG from "../assets/img/Level1_img/Level1-Background.png";
import Timer from "../components/Timer";
import { Objects } from "../components/Objects";
import { InfoModalUser } from "../components/InfoModalUser";
import Pause from "../components/Pause";
import "../level1.css";
import "../Game.css";

export default function GameContainer() {
  const { menuOpen, timerRef, setMenuOpen } = useGame()
  // const [menuOpen, setMenuOpen] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintMessage, setHintMessage] = useState("");
  // const timerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleHint = () => {
    let penalty = 0;
    let message = "";
    if (hintsUsed === 0) {
      message = "Primera pista: sin penalización.";
    } else if (hintsUsed === 1) {
      penalty = 2; // segundos
      message = "Segunda pista: +2 segundos.";
    } else if (hintsUsed === 2) {
      penalty = 5;
      message = "Tercera pista: +5 segundos.";
    } else {
      message = "No hay más pistas disponibles.";
      setHintMessage(message);
      return;
    }
    setHintsUsed((prev) => prev + 1);
    setHintMessage(message);
    if (penalty > 0 && timerRef.current) {
      timerRef.current.addSeconds(penalty);
    }
  };

  const handlePenalty = (seconds) => {
    if (timerRef.current) {
      timerRef.current.addSeconds(seconds);
    }
  };

  return (
    <div className="game-container-bg">
      <img src={Level1BG} className="bg-img" alt="BG Level1" />
      <button id="plant"></button>
      <button onClick={() => navigate(`/level-victory`)} id="door"></button>
      <button id="letterbox"></button>
      <button id="ESC" onClick={() => setMenuOpen(true)}></button>
      <button id="lock"></button>
      <button id="gearbox"></button>
      <button id="PlayerInfo"></button>
      <div className="menu-toggle">
        <Pause open={menuOpen} onClose={() => setMenuOpen(false)} />
        <InfoModalUser className="info-modal-user" />
        <Timer className="timer" menuOpen={menuOpen} ref={timerRef} />
        <button onClick={handleHint} className="hint-button btn btn-warning mt-2">
          Pedir pista
        </button>
        {hintMessage && (
          <div className="alert alert-info mt-2">{hintMessage}</div>
        )}
        {/* Aquí se colocarán puzzles, pistas, menú de objetos */}
        <Objects objectsLevel={ObjectsLevel1} onPenalty={handlePenalty} />
      </div>
    </div>
  );
}