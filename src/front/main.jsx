import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/index.css' 
import { RouterProvider } from "react-router-dom"; 
import { router } from "./routes";
import { BackendURL } from './components/BackendURL';
import { GameProvider } from "./context/GameContext";
import { HintsProvider} from "./context/HintsContext";
const Main = () => {

if (! import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
    <React.StrictMode>
      <BackendURL />
    </React.StrictMode>
  );
  return (
    <React.StrictMode>
      <GameProvider>
          <HintsProvider>
            <RouterProvider router={router} />
          </HintsProvider>
      </GameProvider>
    </React.StrictMode>
  );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
