import {EnigmasData} from "../data/EnigmasData";
import { useGame } from "../context/GameContext";
import { useState } from "react";


export default function UsedHints({ enigmaId, isOpen, onClose }) {
  const { hintsUsed, setHintsUsed, totalHintsUsed, setTotalHintsUsed, timerRef } = useGame();
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const enigma = EnigmasData.enigmasNivel1.find(e => e.id === enigmaId);
  if (!enigma) return <div>Enigma no encontrado</div>;

  const current = hintsUsed[enigmaId] || 0;
  const hints = enigma.hints;

  const canAskForMoreHints = current < hints.length && totalHintsUsed < 3;
  const handleHint = () =>{
  
    if (totalHintsUsed >= 3) {
      setMessage("No hay más pistas disponibles.");
      return;
  }


    let penalty = 0;
    let message = "";
    if (current === 0) {
      message = "Primera pista: sin penalización.";
    } else if (current === 1) {
      penalty = 2; // segundos
      message = "Segunda pista: +2 segundos.";
    } else if (current === 2) {
      penalty = 5;
      message = "Tercera pista: +5 segundos.";
    } else {
      message = "No hay más pistas disponibles.";
      setMessage(message);
      return;
    }
    setHintsUsed((prev) => ({ ...prev, [enigmaId]: current + 1 }));;
    setMessage(message);
    setTotalHintsUsed(prev => prev + 1);

    if (penalty > 0 && timerRef.current) {
      timerRef.current.addSeconds(penalty);
    }
  }
    ;
  return (
    <div>
      <button className="btn btn-warning" onClick={handleHint} disabled={!canAskForMoreHints}>
        Pedir pista
      </button>
      {message && <p className="mt-2">{message}</p>}
      {current > 0 && <p className="mt-2">Pista: {hints[current - 1]}</p>}
    </div>
  );
}