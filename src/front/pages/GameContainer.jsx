import Timer from "../components/Timer";
import { Objects } from "../components/Objects";
import { ObjectsLevel1 } from "../data/ObjectsArray";
import { InfoModalUser } from "../components/InfoModalUser";
import { useRef, useState, useEffect } from "react";
import "../level1.css";
import "../Game.css";
import Level1BG from "../assets/img/Level1_img/Level1-Background.png";
import FrameGame from "../assets/img/Game_img/Game-Frame.png";
import { useGame } from "../context/GameContext";
import { EnigmaModal } from "../components/EnigmaModal";
import { EnigmasData } from "../data/EnigmasData";



export default function GameContainer() {
  const { menuOpen, timerRef, setMenuOpen, hintsUsed, setHintsUsed } = useGame()

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const [showEnigma, setShowEnigma] = useState(false);
  const [currentEnigma, setCurrentEnigma] = useState(null);

  const handleEnigmaClick = (id) => {
    alert(`Enigma clicado: ${id}`)
    const enigma = EnigmasData.enigmasNivel1.find(e => e.id === id);
    if (enigma) {
      setCurrentEnigma(id);
      setShowEnigma(true);
    }
  }
  // const handleAskHint = (enigmaId, hintIndex) => {

  //   console.log(`Pidiendo pista ${hintIndex + 1} para enigma ${enigmaId}`);
  // };


  const handlePenalty = (seconds) => {
    if (timerRef.current) {
      timerRef.current.addSeconds(seconds);
    }
  };

  return (
    <div className="game-container-bg">
      <img src={Level1BG} className="bg-img" alt="BG Level1" />
      <img src={FrameGame} className="bg-frame" alt="Game Frame" />
      <button id="plant"></button>
      <button id="door"></button>
      <button id="letter" type="button" onClick={() => {
        console.log("Click en carta detectado")
        handleEnigmaClick(1)
      }}> Carta 📜</button>
      <button id="ESC"></button>
      <button id="lock"></button>
      <button id="gearbox"></button>
      <button id="PlayerInfo"></button>
      <div className="menu-toggle">

        <InfoModalUser className="info-modal-user" />

        <Timer className="timer" menuOpen={menuOpen} ref={timerRef} />


        {/* {menuOpen && <MenuAjustes onClose={() => setMenuOpen(false)} />} */}

        <EnigmaModal show={showEnigma} onHide={() => setShowEnigma(false)} enigmaId={currentEnigma} />
        <Objects objectsLevel={ObjectsLevel1} onPenalty={handlePenalty} />
      </div>
    </div>

  );
}