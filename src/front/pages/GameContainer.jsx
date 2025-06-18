import Timer from "../components/Timer";
import { Objects } from "../components/Objects";
import { ObjectsLevel1 } from "../data/ObjectsArray";
import { InfoModalUser } from "../components/InfoModalUser";
import { useRef, useState, useEffect } from "react";
import "../level1.css";
import "../Game.css";
import Level1BG from "../assets/img/Level1_img/Level1-Background.png";

import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { EnigmaModal } from "../components/EnigmaModal";
import { EnigmasData } from "../data/EnigmasData";



export default function GameContainer() {
  const { menuOpen, timerRef, setMenuOpen, hintsUsed, setHintsUsed } = useGame()
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const [selectedObject, setSelectedObject] = useState(null);
  const [showEnigma, setShowEnigma] = useState(false);
  const [currentEnigma, setCurrentEnigma] = useState(null);
  const [mailboxMessage, setMailboxMessage] = useState("")
  const id_key = 101
  const id_box_letter = 1

  const handleEnigmaClick = (enigmaIdToOpen) => {
    console.log("handleEnigmaClick llamado con ID:", enigmaIdToOpen)
    const enigma = EnigmasData.enigmasNivel1.find(e => e.id === enigmaIdToOpen);
    if (enigma) {
      setCurrentEnigma(enigmaIdToOpen);
      setShowEnigma(true);
      console.log(`Abriendo enigma ${enigmaIdToOpen}`)
    } else {
      console.log(`ERROR: Enigma ${enigmaIdToOpen} no encontrado.`);
    }
    setSelectedObject(null)
    setMailboxMessage("")
  }
  const handleMailboxClick = () => {
    console.log("Clic en el buzón detectado.");
    if (selectedObject === id_key) {
      handleEnigmaClick(id_box_letter);
    } else {
      console.log("No tienes la llave seleccionada, o no es la llave correcta para el buzón.");
      setMailboxMessage("Parece que necesitas una llave para abrir esto.")
      setSelectedObject(null);
      setTimeout(() => {
        setMailboxMessage("");
      }, 2000);
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
      <button id="door"></button>
      <button onClick={() => navigate(`/level-victory`)} id="door"></button>
      <button
        id="letterbox"
        className='object-zone'
        onClick={handleMailboxClick}
      ></button>
      <button id="ESC"></button>
      <button id="lock"></button>
      <button id="gearbox"></button>
      <button id="PlayerInfo"></button>
      <div className="menu-toggle">

        <InfoModalUser className="info-modal-user" />

        <Timer className="timer" menuOpen={menuOpen} ref={timerRef} />


        {/* {menuOpen && <MenuAjustes onClose={() => setMenuOpen(false)} />} */}
        {showEnigma && (
          <EnigmaModal show={showEnigma} onHide={() => { setShowEnigma(false) }} enigmaId={currentEnigma} />)}
        {mailboxMessage && (
          <div className="mailbox-message">
            <p>{mailboxMessage}</p>
          </div>
        )}

        <Objects objectsLevel={ObjectsLevel1} onPenalty={handlePenalty} setSelectedObject={setSelectedObject} selectedObject={selectedObject} />
      </div>
    </div>

  );
}