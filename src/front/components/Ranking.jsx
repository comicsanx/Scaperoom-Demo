import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { ALLOWED_AVATAR_FILENAMES, getAvatarUrl } from '../data/AvatarData';
import '../CSS/General-UI.css';

// hay que adaptar los nombres a los estados del Ranking. El diseño está realizado como base en una resolucion 1280x720.
// MEDIA QUERIES: 1920x1080

export function Ranking() {
    const { user } = useGame();
    return (
        <div className="ranking-card p-3 mt-5 d-flex flex-column align-items-center w-100">
            <h1 className="righteous ranking-title mb-5 mt-4">RANKING</h1>
            <div className="ranking-results d-flex flex-column align-items-center w-100">
                <div className="ranking-result d-flex flex-column align-items-start w-100">
                    <div className="righteous ranking-number d-flex flex-column align-items-start w-100 ps-2">
                        <p className="m-0">1#</p>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <div className="ranking-avatar me-2 m-2">
                            <img src={getAvatarUrl(user.avatar_filename)} alt="Avatar de usuario" className="avatar-img" />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 gap-0 mt-2">
                            <div className="righteous ranking-name">
                                <p className="mb-0 text-truncate">NAME</p>
                            </div>
                            <div className="righteous ranking-time">
                                <p className="m-0 lh-1">TIME</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ranking-result d-flex flex-column align-items-start w-100">
                    <div className="righteous ranking-number d-flex flex-column align-items-start w-100 ps-2">
                        <p className="m-0">1#</p>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <div className="ranking-avatar me-2 m-2">
                            <img src={getAvatarUrl(user.avatar_filename)} alt="Avatar de usuario" className="avatar-img" />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 gap-0 mt-2">
                            <div className="righteous ranking-name">
                                <p className="mb-0 text-truncate">NAME</p>
                            </div>
                            <div className="righteous ranking-time">
                                <p className="m-0 lh-1">TIME</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ranking-result d-flex flex-column align-items-start w-100">
                    <div className="righteous ranking-number d-flex flex-column align-items-start w-100 ps-2">
                        <p className="m-0">1#</p>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <div className="ranking-avatar me-2 m-2">
                            <img src={getAvatarUrl(user.avatar_filename)} alt="Avatar de usuario" className="avatar-img" />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 gap-0 mt-2">
                            <div className="righteous ranking-name">
                                <p className="mb-0 text-truncate">NAME</p>
                            </div>
                            <div className="righteous ranking-time">
                                <p className="m-0 lh-1">TIME</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}