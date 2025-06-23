
import React, { useRef, useEffect, useCallback } from 'react';
import { SFX_CONFIG } from '../data/SFXData';

export const SFXManager = ({ sfxManagerPlayRef, sfxGlobalVolumeRef }) => {
    const audioInstances = useRef({});

    useEffect(() => {
        console.log("[SFXManager] Inicializando SFX.");
        Object.values(audioInstances.current).forEach(audio => {
            audio.pause();
            audio.src = '';
            audio.load();
        });
        audioInstances.current = {};

       for (const key in SFX_CONFIG) {
            const url = SFX_CONFIG[key];
            if (url) {
                const audio = new Audio(url);
                audio.preload = 'auto'; 
                audio.volume = sfxGlobalVolumeRef.current; 
                audioInstances.current[key] = audio;
                console.log(`[SFXManager] Precargado: ${key} (${url})`);
            } else {
                console.warn(`[SFXManager] SFX ${key} no tiene URL en SFX_CONFIG.`);
            }
        }

        return () => {
            console.log("[SFXManager] Limpiando SFX al desmontar.");
            Object.values(audioInstances.current).forEach(audio => {
                audio.pause();
                audio.src = '';
                audio.load();
            });
            audioInstances.current = {};
        };
    }, [sfxGlobalVolumeRef]);

    const internalPlaySfx = useCallback((sfxName, loop = false, localVolume = 1, currentGlobalVolume) => {
        const audio = audioInstances.current[sfxName];
        if (audio) {
            if (!audio.paused) { 
                audio.pause();
            }
            audio.currentTime = 0; 
            audio.loop = loop;

            const validGlobalVolume = Number.isFinite(currentGlobalVolume) ? Math.max(0, Math.min(1, currentGlobalVolume)) : 1;
            const validLocalVolume = Number.isFinite(localVolume) ? Math.max(0, Math.min(1, localVolume)) : 1;
            
            audio.volume = validGlobalVolume * validLocalVolume;
            audio.muted = false; 

            audio.play().then(() => {
                console.log(`[SFXManager] Reproduciendo SFX: ${sfxName} (Volumen: ${audio.volume})`);
            }).catch(e => {
                console.warn(`[SFXManager] Fallo al reproducir ${sfxName} (${SFX_CONFIG[sfxName]}):`, e.name, e.message, "A menudo esto es un problema de interacción del usuario o de ruta del archivo.");
            });
        } else {
            console.warn(`[SFXManager] SFX '${sfxName}' no encontrado en el diccionario de instancias de audio. ¿Existe en SFX_CONFIG?`);
        }
    }, []);

    useEffect(() => {
        if (sfxManagerPlayRef) {
            sfxManagerPlayRef.current = internalPlaySfx;
            console.log("[SFXManager] sfxManagerPlayRef asignado.");
        }
        return () => {
            if (sfxManagerPlayRef) {
                sfxManagerPlayRef.current = null;
                console.log("[SFXManager] sfxManagerPlayRef limpiado.");
            }
        };
    }, [internalPlaySfx, sfxManagerPlayRef]);

    return null; // El SFXManager no renderiza nada visual
};