import { useNavigate } from "react-router-dom";
import '../CSS/General-UI.css';
import { ButtonWithSFX } from "../components/SFXButton";
import Avatar_01 from '../assets/img/UI/Avatars/Avatar_01.png';
import Avatar_02 from '../assets/img/UI/Avatars/Avatar_02.png';
import Avatar_03 from '../assets/img/UI/Avatars/Avatar_03.png';


export function Credits() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="text-center container form-main-container">
                <div className="background-green credits-background d-flex flex-column align-items-center w-100">
                    <div className="righteous ranking-number credits-top header-background d-flex justify-content-between align-items-center w-100">
                        <p className="header-title righteous yellow text-center">CRÉDITOS</p>
                    </div>

                    <div className="menu-content-victory mt-4 w-100">
                        <div className="row justify-content-center px-lg-5 px-3">

                            <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 px-2"> {/* px-2 para un pequeño padding lateral dentro de la columna */}
                                <img src={Avatar_01} alt="Avatar de Carol" className="credit-avatar mb-3" /> {/* mb-3 para separar el avatar del nombre */}
                                <p className="righteous orange credit-text mb-0">CAROL</p>
                                <p className="open-sans-lite brown credit-text text-center mb-0 px-3">Iniciando mi camino como Full Stack Developer con gran entusiasmo por la tecnología y el desarrollo web. Lista para seguir creciendo y creando proyectos.</p>
                                <a href="https://github.com/CarolCastilloDev" target="_blank" rel="noopener noreferrer" className="credit-link open-sans-lite mt-2"><strong>Puedes ver mi trabajo aquí</strong></a>
                            </div>
                            <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 px-2">
                                <img src={Avatar_03} alt="Avatar de Sandra" className="credit-avatar mb-3" /> {/* Avatar dentro de la columna, con mb-3 */}
                                <p className="righteous orange credit-text mb-0">SANDRA</p>
                                <p className="open-sans-lite brown credit-text text-center mb-0 px-3">UI/UX & 3D Artist especializada en interfaces interactivas y arte 3D para videojuegos. Recién graduada en Full Stack, con ganas de crear experiencias completas.</p>
                                <a href="https://linktr.ee/comic.sanx" target="_blank" rel="noopener noreferrer" className="credit-link open-sans-lite mt-2"><strong>Puedes ver mi trabajo aquí</strong></a>
                            </div>
                            {/* Naiomi - Avatar Derecha */}
                            <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 px-2">
                                <img src={Avatar_02} alt="Avatar de Naiomi" className="credit-avatar mb-3" /> {/* Avatar dentro de la columna, con mb-3 */}
                                <p className="righteous orange credit-text mb-0">NAIOMI</p>
                                <p className="open-sans-lite brown credit-text text-center mb-0 px-3">Después de hacer un checkout a una nueva rama profesional, éste ha sido mi primer proyecto en equipo y el deploy oficial de mi nueva carrera como desarrolladora. Recién graduada y con el entusiasmo, sigo sumando líneas de código.</p>
                                <a href="https://github.com/naiomi25" target="_blank" rel="noopener noreferrer" className="credit-link open-sans-lite mt-2"><strong>Puedes ver mi trabajo aquí</strong></a>
                            </div>

                            {/* Sandra - Avatar Izquierda */}

                        </div>
                    </div>
                    <ButtonWithSFX sfxName="BUTTON_CLICK" className="CreditsButton righteous rounded-pill px-3 py-1" onClick={() => navigate(`/`)}><h3>Volver al inicio</h3></ButtonWithSFX>

                </div>
            </div>
        </div>
    );
}