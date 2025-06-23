
import { useGame } from "../context/GameContext";
import { useState, useEffect } from "react";
import {useHints} from "../context/HintsContext";

export default function UsedHints({ enigmaId, isOpen, onClose }) {
  const {  hintsUsed, totalHintsUsed, currentHintMessage, requestHint} = useHints();
  const { getCurrentEnigmas } = useGame()
  const [localMessage, setLocalMessage] = useState("");

  if (!isOpen) return null;

  const currentLevelEnigmas = getCurrentEnigmas(); 
  const enigma = currentLevelEnigmas.find(e => e.id === enigmaId);
  if (!enigma) return <div>Enigma no encontrado</div>;

  
  const currentHintsForThisEnigma = hintsUsed[enigmaId] || 0;
  const hints = enigma.hints;

  const canAskForMoreHints = currentHintsForThisEnigma < hints.length && totalHintsUsed < 3;

const handleHint = () => { 
      const hintGiven = requestHint(enigmaId);
      if (!hintGiven) {
          setLocalMessage(currentHintMessage);
      }
  };


  useEffect(() => {
        if (isOpen) {
            setLocalMessage(currentHintMessage);
        } else {
            setLocalMessage(""); 
        }
    }, [isOpen, currentHintMessage]);
    
  return (
    <div>
      <button className="btn btn-warning" onClick={handleHint} disabled={!canAskForMoreHints}>
        Pedir pista
      </button>
       {currentHintMessage && <p className="mt-2 text-warning">{currentHintMessage}</p>} 
            {!currentHintMessage && localMessage && <p className="mt-2 text-warning">{localMessage}</p>}
            
            {currentHintsForThisEnigma > 0 && (
                <p className="mt-2">Pista: {hints[currentHintsForThisEnigma - 1]}</p>
            )}
        </div>
    );
}