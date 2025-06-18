import { Outlet } from "react-router-dom/dist"
import '../Responsive.css';
import RotateDeviceImage from '../assets/img/rotate-device.png';
// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export function Layout() {
  return (
    <> 
      <div className="responsive-gestor-container">
        <Outlet />
      </div>

      <div className="orientation-message">
        <img src={RotateDeviceImage} alt="Por favor, gira tu dispositivo" />
        <p>Por favor, gira tu dispositivo para una mejor experiencia de juego.</p>
        <p>¡Gira tu pantalla a horizontal!</p>
      </div>
    </>
  );
}