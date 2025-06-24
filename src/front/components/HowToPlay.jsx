import React, { useState } from 'react';

const HowToPlay = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="howtoplay-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 2000, background: 'rgba(0,0,0,0.7)' }}>
            <div className="howtoplay-modal bg-white p-4 rounded shadow d-flex flex-column align-items-center">
                <h2 className="mb-3">¿Cómo jugar?</h2>
                <p className="mb-4 text-center">
                    ¡Bienvenido a la Escape Room!<br />
                    Explora la habitación haciendo clic en los objetos.<br />
                    Usa las pistas si te atascas, pero recuerda que algunas añaden penalización de tiempo.<br />
                    Pulsa el botón de menú o la tecla ESC para pausar el juego.<br />
                    ¡Resuelve los acertijos y escapa lo más rápido posible!
                </p>
                <button className="btn btn-primary" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default HowToPlay;
