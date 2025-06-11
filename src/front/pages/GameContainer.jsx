import Timer from "../components/Timer";
import { useRef, useState, useEffect } from "react";

export default function GameContainer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintMessage, setHintMessage] = useState("");
  const timerRef = useRef();

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

  return (
    <div>
      <h2>Nivel 1</h2>
      <Timer menuOpen={menuOpen} ref={timerRef} />
      <button onClick={handleHint} className="btn btn-warning mt-2">
        Pedir pista
      </button>
      {hintMessage && (
        <div className="alert alert-info mt-2">{hintMessage}</div>
      )}
      {/* {menuOpen && <MenuAjustes onClose={() => setMenuOpen(false)} />} */}
      {/* Aquí se colocarán puzzles, pistas, menú de objetos */}
    </div>
  );
}