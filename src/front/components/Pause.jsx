import React, { useState } from 'react';

const Pause = ({ open, onClose, onAbandon, onShowHowToPlay }) => {
    const [musicOn, setMusicOn] = useState(true);
    const [effectsOn, setEffectsOn] = useState(true);

    if (!open) return null;

    return (
        <div className="pause-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.6)', zIndex: 1000 }}>
            <div className="pause-menu bg-white p-4 rounded shadow d-flex flex-column align-items-center" style={{ minWidth: '300px' }}>
                <h2 className="mb-4">Pausa</h2>
                <div className="d-flex flex-column gap-2 w-100">
                    <button onClick={onShowHowToPlay} className="btn btn-info">¿Cómo jugar?</button>
                    <button onClick={() => setMusicOn(m => !m)} className="btn btn-secondary">
                        Música: {musicOn ? "ON" : "OFF"}
                    </button>
                    <button onClick={() => setEffectsOn(e => !e)} className="btn btn-secondary">
                        Efectos: {effectsOn ? "ON" : "OFF"}
                    </button>
                    <button onClick={onAbandon} className="btn btn-danger">Abandonar</button>
                </div>
                <button onClick={onClose} className="btn btn-outline-dark mt-4">Cerrar</button>
            </div>
        </div>
    );
};

export default Pause;
