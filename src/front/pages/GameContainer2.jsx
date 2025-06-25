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

import letra_pequeña from "../assets/img/level2_provisional/letra_pequeña.jpg";

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
        setPickedUpObjects,
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
    const [noReadBook, setNoReadBook] = useState(false);

    const [gameMessage, setGameMessage] = useState("");

    const id_clinex = 102
    const id_magnifying_glass = 103
    const id_telescope = 207
    const id_book = 206 
    const id_safe = 205
    const id_calendar = 204
    const id_map = 203


    // función para manejar el objeto seleccionado

    const handleObjectUsed = (objectId) => {
        console.log(`Objeto (ID: ${objectId}) ha sido usado y se eliminará del inventario.`);
        setPickedUpObjects(prevObjects => prevObjects.filter(id => id !== objectId));
        setSelectedObject(null);
    };
// funcion para abrir los enigmas

    // const handleEnigmaClick = (enigmaIdToOpen) => {
    //     console.log("handleEnigmaClick llamado con ID:", enigmaIdToOpen)
    //     console.log("Enigmas Nivel 2 disponibles:", EnigmasData.enigmasNivel2)
    //     const enigma = EnigmasData.enigmasNivel2.find(e => e.id === enigmaIdToOpen);
    //     if (enigma) {
    //         setCurrentEnigma(enigmaIdToOpen);
    //         setShowEnigma(true);
    //         console.log(`Abriendo enigma ${enigmaIdToOpen}`)
    //     } else {
    //         console.log(`ERROR: Enigma ${enigmaIdToOpen} no encontrado.`);
    //     }
    //     setSelectedObject(null)

    // }

    // Función para abrir cualquier enigma
    const handleEnigmaClick = (enigmaIdToOpen) => {
        console.log("handleEnigmaClick llamado con ID:", enigmaIdToOpen);
        
        setCurrentEnigma(enigmaIdToOpen); 
        setShowEnigma(true);
        console.log(`Abriendo enigma ${enigmaIdToOpen}`);
        setSelectedObject(null); // Deseleccionar el objeto
    };

    // Función para abrir enigma libro

    const handleBookClick = () => {
        console.log("Clic en el libro detectado.");
        if (selectedObject === id_magnifying_glass) {
            handleEnigmaClick(id_book);
            handleObjectUsed(id_magnifying_glass)
        } else {
            console.log("No tienes la lupa seleccionada.");
            setBookMessage("¿consigues leer lo que pone?")
            setNoReadBook(true);
            setSelectedObject(null);
            setTimeout(() => {
                setNoReadBook(false);
                setBookMessage("");
            }, 5000);
        }
    };

    // funcion para enigma de telescopio
      const handleTelescopeClick = () => {
        console.log("Clic en el telescopio detectado. Objeto seleccionado:", selectedObject);
        if (selectedObject === id_clinex) {
            handleEnigmaClick(id_telescope); 
             handleObjectUsed(id_clinex); 
        } else {
            setGameMessage("El telescopio está sucio. Necesitas algo para limpiarlo.");
            setSelectedObject(null);
            setTimeout(() => setGameMessage(""), 4000);
            // Aquí podrías mostrar una imagen del telescopio sucio si tuvieras una
        }
    };



    //  Función para manejar la resolución de enigma final desde EnigmaModal
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
            {/* <img src={Level1BG} className="bg-img" alt="BG Level2" /> */}
            <button id="calendar">calendario</button>
            <button id="map" onClick={''}>bola del mundo</button>
            <button
                id="telescope"
                className='object-zone'
                onClick={''}
            >telescopio</button>

            {/* funciones del libro */}
            <button
                id="book"
                className='object-zone'
                onClick={handleBookClick}
            >libro</button>
             {bookMessage && (
        <div className="game-message-overlay">
          <p>{bookMessage}</p>
        </div>
      )}

      {/* Imagen del libro ilegible*/}
      {noReadBook && (
        <div className="enigma-image-overlay"> 
          <img src={letra_pequeña} alt="Texto ilegible del libro" className="enigma-zoom-image" />
        </div>
      )}

      {/* Modal del Enigma (cuando se usa la lupa) */}
      {showEnigma && currentEnigmaData && (
        <EnigmaModal
          show={showEnigma}
          onHide={() => setShowEnigma(false)}
          enigmaId={currentEnigma}
          enigmaData={currentEnigmaData} 
         
       
        />
      )}
            <button id="ESC" onClick={() => setMenuOpen(true)}>salir</button>
            <button id="PlayerInfo"></button>
            <div className="menu-toggle">
                <Pause open={menuOpen} onClose={() => setMenuOpen(false)} />

                <InfoModalUser className="info-modal-user" showEnigma={showEnigma} />

                <Timer className="timer" menuOpen={menuOpen} ref={timerRef} />


                <Objects objectsLevel={ObjectsLevel2} onPenalty={handlePenalty} setSelectedObject={setSelectedObject} selectedObject={selectedObject} />
            </div>
        </div>



    );
}
