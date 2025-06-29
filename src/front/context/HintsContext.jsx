import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useGame } from "./GameContext";
import { EnigmasData } from '../data/EnigmasData';


export const HintsContext = createContext();
export const useHints = () => useContext(HintsContext);

export const HintsProvider = ({ children }) => {

    const { timerRef , nivelActual } = useGame();

    const [hintsUsed, setHintsUsed] = useState({}); 
    const [totalHintsUsed, setTotalHintsUsed] = useState(0); 
    const [currentHintMessage, setCurrentHintMessage] = useState("");

    useEffect(() => {
        setHintsUsed({})
        setTotalHintsUsed(0);
        setCurrentHintMessage("");
    }, [nivelActual]); // Resetea al cambiar de nivel

    const requestHint = useCallback((enigmaId) => {
        let message = "";
        let penalty = 0;
        let canGiveHint = false;

       
         let enigma = EnigmasData.enigmasNivel1.find(e => e.id === enigmaId);
        if (!enigma) {
            enigma = EnigmasData.enigmasNivel2.find(e => e.id === enigmaId);
        }
        if (!enigma) {
            message = "Error: Enigma no encontrado para solicitar pista.";
            setCurrentHintMessage(message);
            setTimeout(() => setCurrentHintMessage(""), 4000);
            return false;
        }

        const hintsAvailableInEnigma = enigma.hints.length;
        const currentHintsForEnigma = hintsUsed[enigmaId] || 0;

        
        if (totalHintsUsed >= 3) {
            message = "¡Has usado el máximo de 3 pistas en total!";
        }

        else if (currentHintsForEnigma >= hintsAvailableInEnigma) {
            message = "No quedan más pistas disponibles para este enigma.";
        }
     
        else {
            
            if (totalHintsUsed === 0) { 
                message = "Acceso gratuito concedido para la primera pista. Las siguientes tendrán penalización.";
                penalty = 0;
            } else if (totalHintsUsed === 1) { 
                penalty = 2; 
                message = "Cada pista revela... y roba. Has añadido 2 segundos a tu tiempo.";
            } else if (totalHintsUsed === 2) { 
                penalty = 5;
                message = "El conocimiento tiene un precio. Esta es tu última pista y te ha costado 5 segundos.";
            }
            
          
            setHintsUsed(prev => ({ ...prev, [enigmaId]: currentHintsForEnigma + 1 }));
            setTotalHintsUsed(prev => prev + 1);
            canGiveHint = true; 

            if (penalty > 0 && timerRef.current) {
                timerRef.current.addSeconds(penalty);
            }
        }

        setCurrentHintMessage(message); 
        setTimeout(() => setCurrentHintMessage(""), 6000);

        return canGiveHint; 
    }, [hintsUsed, totalHintsUsed, timerRef]);



    
    return (
        <HintsContext.Provider value={{
            hintsUsed,
            totalHintsUsed,
            currentHintMessage,
            requestHint,
            
        }}>
        {children}
    </HintsContext.Provider>
    )
}