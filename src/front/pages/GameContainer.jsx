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
import despacho_vacio from "../assets/img/despacho_vacio.jpg";
import despacho_lleno from "../assets/img/despacho_lleno.jpg";



export default function GameContainer() {
  const {
    menuOpen,
    timerRef,
    setMenuOpen,
    hintsUsed,
    setHintsUsed,
    pickedUpObjects,
    setPickedUpObjects,
    isGearboxCodeCorrect,
    setIsGearboxCodeCorrect,
    hasLookedRoom,
    setHasLookedRoom,
  } = useGame()

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
  const [gameMessage, setGameMessage] = useState("");
  const [showRoomImage, setShowRoomImage] = useState(false);
  const id_key = 101
  const id_box_letter = 1
  const id_gearbox = 2

  // función para manejar el objeto seleccionado

  const handleObjectUsed = (objectId) => {
    console.log(`Objeto (ID: ${objectId}) ha sido usado y se eliminará del inventario.`);
    setPickedUpObjects(prevObjects => prevObjects.filter(id => id !== objectId));
    setSelectedObject(null);
  };
  // Función para abrir cualquier enigma

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
  // Función para abrir enigma buzón

  const handleMailboxClick = () => {
    console.log("Clic en el buzón detectado.");
    if (selectedObject === id_key) {
      handleEnigmaClick(id_box_letter);
      handleObjectUsed(id_key)
    } else {
      console.log("No tienes la llave seleccionada, o no es la llave correcta para el buzón.");
      setMailboxMessage("Parece que necesitas una llave para abrir esto.")
      setSelectedObject(null);
      setTimeout(() => {
        setMailboxMessage("");
      }, 2000);
    }
  };
  // Función para mirar por la mirilla

  const handlePeepholeClick = () => {
     setHasLookedRoom(true);
    console.log("Mirando por la mirilla...");
    const messageToShow = isGearboxCodeCorrect
      ? "¡La habitación está vacía!Es momento de pasar al despacho!."
      : "el Sr Geeks sigue en el despacho...hay que encontrar la forma de hacerle creer que es la hora de la comida";
    setGameMessage(messageToShow);
    setShowRoomImage(true);
    setTimeout(() => {
      setShowRoomImage(false);
      setGameMessage("");
    }, 3000);
  };

  // Función para el clic en el Cuadro de Luces
  const handleLightsPanelClick = () => {
    console.log("Clic en el cuadro de luces detectado.");
    if (!hasLookedRoom) {
      setGameMessage("Primero, debes mirar por la mirilla para comprobar la situación.");
      setTimeout(() => setGameMessage(""), 3000);
      return;
    }
    handleEnigmaClick(id_gearbox)
  }

  // Función para click de la puerta final
  const handleDoorClick = () => {
    console.log("Clic en la puerta detectado.");
     if (isGearboxCodeCorrect && hasLookedRoom) {
            setGameMessage("¡La puerta se abre! Avanzando al siguiente nivel...");
            setTimeout(() => {         
            }, 1500);
            navigate(`/level-victory`);
        } else {
           
            setGameMessage("La puerta está cerrada. Debes asegurarte de que la habitación esté vacía.");
            setTimeout(() => setGameMessage(""), 3000);
        }
    };

    //  Función para manejar la resolución de enigmas desde EnigmaModal
  const handleEnigmaSolved = (enigmaId, isCorrect) => {
        setShowEnigma(false); 
        setCurrentEnigma(null); 

        if (enigmaId === id_gearbox) {
            if (isCorrect) {
                setIsGearboxCodeCorrect(true); 
                 setGameMessage("¡Conseguiste manipular el reloj!Compreba si el señor Geeks se ha ido a comer.");
                 setTimeout(() => setGameMessage(""), 3000);
            } else {
              
            }
        }
}


    // Función para aplicar penalización de tiempo

    const handlePenalty = (seconds) => {
      if (timerRef.current) {
        timerRef.current.addSeconds(seconds);
      }
    };

    const currentEnigmaData = EnigmasData.enigmasNivel1.find(e => e.id === currentEnigma)

    return (
      <div className="game-container-bg">
        <img src={Level1BG} className="bg-img" alt="BG Level1" />
        <button id="plant"></button>
        <button id="door"onClick={handleDoorClick}></button>
        <button
          id="letterbox"
          className='object-zone'
          onClick={handleMailboxClick}
        ></button>
        <button id="ESC"></button>
        <button id="lock" onClick={handlePeepholeClick}></button>
        <button id="gearbox" onClick={handleLightsPanelClick}></button>
        <button id="PlayerInfo"></button>
        <div className="menu-toggle">

          <InfoModalUser className="info-modal-user" showEnigma={showEnigma}  />

          <Timer className="timer" menuOpen={menuOpen} ref={timerRef} />


          {/* {menuOpen && <MenuAjustes onClose={() => setMenuOpen(false)} />} */}
          {showEnigma && currentEnigmaData &&(
            <EnigmaModal show={showEnigma} onHide={() => { setShowEnigma(false) }} enigmaId={currentEnigma} onEnigmaSolved={handleEnigmaSolved} />)}
           {(mailboxMessage || gameMessage) && (
            <div className="mailbox-message">
              <p>{mailboxMessage || gameMessage}</p>
            </div>
          )}
           {showRoomImage && (
                    <div className="image-room">
                        <img
                            src={isGearboxCodeCorrect ? despacho_vacio : despacho_lleno} 
                            alt="Vista a través de la mirilla"
                            className="view-image"
                        />
                    </div>
                )}

          <Objects objectsLevel={ObjectsLevel1} onPenalty={handlePenalty} setSelectedObject={setSelectedObject} selectedObject={selectedObject} />
        </div>
      </div>

    );
  }