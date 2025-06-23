import React from 'react';
import { useGame } from '../context/GameContext'; 
import { SFX_CONFIG } from '../data/SFXData';

export const ButtonWithSFX = ({ 
    onClick, 
    sfxName = SFX_CONFIG.BUTTON_CLICK, 
    sfxLoop = false, 
    sfxLocalVolume = 1, 
    children, 
    ...props 
}) => {


    const { playSfx } = useGame(); 

    const handleClick = (event) => {
        playSfx(sfxName, sfxLoop, sfxLocalVolume);
        
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    );
};
