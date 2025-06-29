import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HowToPlay from './HowToPlay';
import { useGame } from '../context/GameContext';

const Pause = ({ open, onClose }) => {
    const [musicOn, setMusicOn] = useState(true);
    const [effectsOn, setEffectsOn] = useState(true);
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const navigate = useNavigate();
    const { setMusicVolume, displayMusicVolume } = useGame();

    // Si se cierra el menú de pausa, también se cierra el modal de ayuda
    useEffect(() => {
        if (!open) setShowHowToPlay(false);
    }, [open]);

    if (!open) return null;

    return (
        <>
            <div className="pause-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.6)', zIndex: 1000 }}>
                <div className="pause-menu bg-white p-4 rounded shadow d-flex flex-column align-items-center" style={{ minWidth: '300px' }}>
                    <h2 className="mb-4">Pausa</h2>
                    <div className="d-flex flex-column gap-2 w-100">
                        <button onClick={() => setShowHowToPlay(true)} className="btn btn-info">¿Cómo jugar?</button>
                        <div className="d-flex align-items-center gap-2">
                            <span>Música:</span>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={displayMusicVolume}
                                onChange={e => {
                                    const vol = parseFloat(e.target.value);
                                    setMusicVolume(vol);
                                    setMusicOn(vol > 0);
                                }}
                                style={{ width: '120px' }}
                            />
                            <span>{Math.round(displayMusicVolume * 100)}%</span>
                        </div>
                        <button onClick={() => setEffectsOn(e => !e)} className="btn btn-secondary">
                            Efectos: {effectsOn ? "ON" : "OFF"}
                        </button>
                        
                        <button onClick={() => { onClose && onClose(); navigate('/dashboard'); }} className="btn btn-danger">Abandonar</button>
                    </div>
                    <button onClick={onClose} className="btn btn-outline-dark mt-4">Cerrar</button>
                </div>
            </div>
            <HowToPlay open={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
        </>
    );
};

export default Pause;
