import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useGame } from "./GameContext";
import { EnigmasData } from "../data/EnigmasData";

export const HintsContext = createContext();
export const useHints = () => useContext(HintsContext);

export const HintsProvider = ({ children }) => {

      const [hintsUsed, setHintsUsed] = useState({}); // Pistas usadas por enigma: { enigmaId: count }
    const [totalHintsUsed, setTotalHintsUsed] = useState(0); // Pistas totales usadas en el juego
    const [currentHintMessage, setCurrentHintMessage] = useState("");



}

return (
    <HintsContext.Provider value={{

    }}>
        {children}
    </HintsContext.Provider>
    )