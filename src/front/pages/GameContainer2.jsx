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
import imagen_borrosa from "../assets/img/level2_provisional/imagen_borrosa.jpg";
import Pause from "../components/Pause";
import pantalla_final from '../assets/img/level2_provisional/pantalla_final.png';

// LAS CLASES QUE SE LLAMEN 'object-zone' NO SE LES PUEDE CAMBIAR EL NOMBRE
export default function GameContainer2() {
  const navigate = useNavigate();
  const {
    menuOpen,
    timerRef,
    setMenuOpen,
    isSafeCodeCorrect,
    setIsSafeCodeCorrect,
    setPickedUpObjects,
    nivelActual,
    setNivelActual,
    tiempo,
    setTiempo,
    saveGameProgress
  } = useGame()

  useEffect(() => {
    setNivelActual(2);
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setNivelActual]);

  const [selectedObject, setSelectedObject] = useState(null);
  const [showEnigma, setShowEnigma] = useState(false);
  const [currentEnigma, setCurrentEnigma] = useState(null);
  const [selectPictureCorrectBook, setSelectPictureCorrectBook] = useState(false);
  const [selectPictureCorrectTelescope, setSelectPictureCorrectTelescope] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const id_clinex = 102
  const id_magnifying_glass = 103
  const id_telescope = 207
  const id_book = 206
  const id_safe = 205
  const id_calendar = 204
  const id_map = 203
  const id_safe_handle = 208

  // función para manejar el objeto seleccionado
  const handleObjectUsed = (objectId) => {
    console.log(`Objeto (ID: ${objectId}) ha sido usado y se eliminará del inventario.`);
    setPickedUpObjects(prevObjects => prevObjects.filter(id => id !== objectId));
    setSelectedObject(null);
  };

  // Función para abrir cualquier enigma
  const handleEnigmaClick = (enigmaIdToOpen) => {
    setCurrentEnigma(enigmaIdToOpen);
    setShowEnigma(true);
    console.log(`Abriendo enigma ${enigmaIdToOpen}`);
    setSelectedObject(null);
  };

  // función para abrir la bola del mundo
  const handleMapClick = () => {
    handleEnigmaClick(id_map);
  }
  const handleCalendarClick = () => {
    handleEnigmaClick(id_calendar);
  }

  // Función para abrir enigma libro
  const handleBookClick = () => {
    if (selectedObject === id_magnifying_glass) {
      handleEnigmaClick(id_book);
      handleObjectUsed(id_magnifying_glass)
    } else {
      setGameMessage("¿consigues leer lo que pone?")
      setSelectPictureCorrectBook(true);
      setSelectedObject(null);
      setTimeout(() => {
        setSelectPictureCorrectBook(false);
        setGameMessage("");
      }, 5000);
    }
  };

  // funcion para enigma de telescopio
  const handleTelescopeClick = () => {
    if (selectedObject === id_clinex) {
      handleEnigmaClick(id_telescope);
      handleObjectUsed(id_clinex);
    } else {
      setGameMessage("El telescopio está sucio. Necesitas algo para limpiarlo.");
      setSelectPictureCorrectTelescope(true);
      setSelectedObject(null);
      setTimeout(() => {
        setSelectPictureCorrectTelescope(false);
        setGameMessage("");
      }, 5000);
    }
  };

  const handleSafeClick = () => {
    handleEnigmaClick(id_safe);
  }

  //  Función para manejar la resolución de enigma final desde EnigmaModal
  const handleEnigmaSolved = (enigmaId, isCorrect) => {
    setShowEnigma(false);
    setCurrentEnigma(null);

    if (enigmaId === id_safe) {
      if (isCorrect) {
        setIsSafeCodeCorrect(true);
        setGameMessage("¡Felicidades! Has conseguido abrir la caja fuerte.!");
        setTimeout(() => setGameMessage(""), 4000);
        saveGameProgress((nivelActual + 1), tiempo);
        navigate(`/game-victory`)
      }
    }
  }

  // funcion para manejar el clic en la manilla de la caja fuerte
  const handleSafeHandle = () => {
    if (!isSafeCodeCorrect) {
      setGameMessage("Necesitas resolver el enigma de la caja fuerte para poder abrirla.");
      setTimeout(() => setGameMessage(""), 4000);
    } else {
     setShowFinalImage (true);
       setTimeout(() => {
        setShowFinalImage(false); 
        saveGameProgress(nivelActual, tiempo); 
        navigate("/game-victory"); 
      }, 15000); 
    
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
      <button id="calendar" onClick={handleCalendarClick}>calendario</button>
      <button id="id_safe" onClick={handleSafeClick}>caja fuerte</button>
      <button id="id_safe_handle" onClick={handleSafeHandle}> manilla caja fuerte</button>
      <button id="map" onClick={handleMapClick}>bola del mundo</button>
      <button id="telescope" className='object-zone' onClick={handleTelescopeClick}>telescopio</button>
      <button id="book" className='object-zone' onClick={handleBookClick}>libro</button>
      <button id="ESC" onClick={() => setMenuOpen(true)}>salir</button>
      <button id="PlayerInfo"></button>

      {gameMessage && (
        <div className="game-message-overlay">
          <p>{gameMessage}</p>
        </div>
      )}

      {/* Imagen del imagen borrosa*/}
      {selectPictureCorrectTelescope && (
        <div className="enigma-image-overlay">
          <img src={imagen_borrosa} alt="imagen borrosa" className="enigma-zoom-image" />
        </div>
      )}

      {/* Imagen del libro ilegible*/}
      {selectPictureCorrectBook && (
        <div className="enigma-image-overlay">
          <img src={letra_pequeña} alt="Texto ilegible del libro" className="enigma-zoom-image" />
        </div>
      )}


      {showEnigma && currentEnigmaData && (
        <EnigmaModal show={showEnigma} onEnigmaSolved={handleEnigmaSolved} onHide={() => setShowEnigma(false)} enigmaId={currentEnigma}
          timerRef={timerRef}
        />
      )}
  {showFinalImage && (
        <div className="final-image-overlay"> {/* Esta clase la definiremos en CSS */}
          <img src={pantalla_final} alt="Repositorio Desbloqueado" className="final-image-content" />
        </div>
      )}




      <div className="menu-toggle">
        <Pause open={menuOpen} onClose={() => setMenuOpen(false)} />
        <InfoModalUser className="info-modal-user" showEnigma={showEnigma} />
        <Timer className="timer" menuOpen={menuOpen} ref={timerRef} tiempo={tiempo} setTiempo={setTiempo} />
        <Objects objectsLevel={ObjectsLevel2} onPenalty={handlePenalty} setSelectedObject={setSelectedObject} selectedObject={selectedObject} />
      </div>

    </div>



  );
}
