import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { ALLOWED_AVATAR_FILENAMES, getAvatarUrl } from '../data/AvatarData'; 
import '../CSS/General-UI.css';

export function Ranking() {
return (
 <div className="ranking-container container mt-5 p-5 d-flex flex-column align-items-center">
    <h1>Ranking</h1>
</div>
)

}