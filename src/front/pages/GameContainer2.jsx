import { useRef, useState, useEffect } from "react";
import "../CSS/level1.css";
import "../CSS/Game.css";
import Level1BG from "../assets/img/Level1_img/Level1-Background.png";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { ObjectsLevel2 } from "../data/ObjectsArray";
import Timer from "../components/Timer";
import { Objects } from "../components/Objects";
import { InfoModalUser } from "../components/InfoModalUser";
import { EnigmaModal } from "../components/EnigmaModal";
import { EnigmasData } from "../data/EnigmasData";

import despacho_vacio from "../assets/img/despacho_vacio.jpg";
import despacho_lleno from "../assets/img/despacho_lleno.jpg";

import Pause from "../components/Pause";

// import { useNavigate } from "react-router-dom";

export default function GameContainer2() {
    const navigate = useNavigate();
    const {
        menuOpen,
        timerRef,
        setMenuOpen,
        isSafeCodeCorrect,
        setIsSafeCodeCorrect,
    } = useGame()

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
    const [bookMessage, setBookMessage] = useState("")

    const [gameMessage, setGameMessage] = useState("");

    const id_clinex = 102
    const id_magnifying_glass = 103
    const id_telescope = 1
    const id_book = 2
    const id_safe = 3

    // función para manejar el objeto seleccionado

    const handleObjectUsed = (objectId) => {
        console.log(`Objeto (ID: ${objectId}) ha sido usado y se eliminará del inventario.`);
        setPickedUpObjects(prevObjects => prevObjects.filter(id => id !== objectId));
        setSelectedObject(null);
    };

    const handleEnigmaClick = (enigmaIdToOpen) => {
        console.log("handleEnigmaClick llamado con ID:", enigmaIdToOpen)
        const enigma = EnigmasData.enigmasNivel2.find(e => e.id === enigmaIdToOpen);
        if (enigma) {
            setCurrentEnigma(enigmaIdToOpen);
            setShowEnigma(true);
            console.log(`Abriendo enigma ${enigmaIdToOpen}`)
        } else {
            console.log(`ERROR: Enigma ${enigmaIdToOpen} no encontrado.`);
        }
        setSelectedObject(null)

    }
    // Función para abrir enigma libro

    const handleBookClick = () => {
        console.log("Clic en el libro detectado.");
        if (selectedObject === id_magnifying_glass) {
            handleEnigmaClick(id_book);
            handleObjectUsed(id_magnifying_glass)
        } else {
            console.log("No tienes la lupa seleccionada.");
            setBookMessage("¿consigues leer lo que pone?")
            setSelectedObject(null);
            setTimeout(() => {
                setBookMessage("");
            }, 3000);
        }
    };


    //  Función para manejar la resolución de enigmas desde EnigmaModal
    const handleEnigmaSolved = (enigmaId, isCorrect) => {
        setShowEnigma(false);
        setCurrentEnigma(null);

        if (enigmaId === id_safe) {
            if (isCorrect) {
                setIsSafeCodeCorrect(true);
                setGameMessage("¡Felicidades! Has conseguido abrir la caja fuerte.!");
                setTimeout(() => setGameMessage(""), 4000);
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

    const currentEnigmaData = EnigmasData.enigmasNivel2.find(e => e.id === currentEnigma)

    return (
        <div className="game-container2-bg">
            <img src={Level1BG} className="bg-img" alt="BG Level2" />
            <button id="calendar"></button>
            <button id="map" onClick={''}></button>
            <button
                id="telescope"
                className='object-zone'
                onClick={''}
            ></button>
            <button
                id="book"
                className='object-zone'
                onClick={''}
            ></button>
            <button id="ESC" onClick={() => setMenuOpen(true)}></button>
            <button id="PlayerInfo"></button>
            <div className="menu-toggle">
                <Pause open={menuOpen} onClose={() => setMenuOpen(false)} />

                <InfoModalUser className="info-modal-user" showEnigma={showEnigma} />

                <Timer className="timer" menuOpen={menuOpen} ref={timerRef} />



                {showEnigma && currentEnigmaData && (
                    <EnigmaModal show={showEnigma} onHide={() => { setShowEnigma(false) }}
                        enigmaId={currentEnigma} onEnigmaSolved={handleEnigmaSolved}
                        timerRef={timerRef} />)}
                {/* {(mailboxMessage || gameMessage) && (
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
                )} */}

                <Objects objectsLevel={ObjectsLevel2} onPenalty={handlePenalty} setSelectedObject={setSelectedObject} selectedObject={selectedObject} />
            </div>
        </div>



    );
}
