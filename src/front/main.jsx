import React from 'react'
import ReactDOM from 'react-dom/client'
import './CSS/index.css'  // Global styles for your application
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { BackendURL } from './components/BackendURL';
import { GameProvider } from "./context/GameContext";

const Main = () => {

if (! import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
    <React.StrictMode>
      <BackendURL />
    </React.StrictMode>
  );
  return (
    <React.StrictMode>
      {/* GameProvider debe envolver al RouterProvider */}
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </React.StrictMode>
  );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
