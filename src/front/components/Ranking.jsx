import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { ButtonWithSFX } from '../components/SFXButton';
import { ALLOWED_AVATAR_FILENAMES, getAvatarUrl } from '../data/AvatarData';
import '../CSS/General-UI.css';

const ALL_ITEMS_TO_PAGINATE = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
}));

export function Ranking() {
    const { user } = useGame();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; 

    const totalPages = Math.ceil(ALL_ITEMS_TO_PAGINATE.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ALL_ITEMS_TO_PAGINATE.slice(indexOfFirstItem, indexOfLastItem);

    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

// hay que adaptar los nombres a los estados del Ranking. 
// No se ha podido probar la paginación al no existir logica de ranking

// El diseño está realizado como base en una resolucion 1280x720.
// MEDIA QUERIES: 1920x1080

    return (
        <div className="ranking-card p-3 mt-5 d-flex flex-column align-items-center w-100 justify-content-between">
            <h1 className="righteous ranking-title mb-5 mt-4">RANKING</h1>
            <div className="ranking-results d-flex flex-column align-items-center w-100">
                {/* {currentItems.map((item) => ( aqui va la logica para la paginacion del ranking. Ranking results es el contenedor padre, ranking-result mapea la info. La info de cada player es avatar, nombre, tiempo y posición */}
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
            <div className="pagination d-flex justify-content-end w-100">
                <ButtonWithSFX sfxName="BUTTON_CLICK" onClick={goToPrevPage} className="paginationbutton me-2"><h2><i class="fa-solid fa-caret-left"></i></h2></ButtonWithSFX>
                <ButtonWithSFX sfxName="BUTTON_CLICK" onClick={goToNextPage} className="paginationbutton me-2"><h2><i class="fa-solid fa-caret-right"></i></h2></ButtonWithSFX>
            </div>
        </div>
    )

}