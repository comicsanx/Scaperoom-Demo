// import Timer from "../components/Timer";
// import { InfoModalUser } from "../components/InfoModalUser";
// import { useRef, useState, useEffect } from "react";
// importacion del css del nivel
import "../CSS/Game.css";
// importacion del background del nivel
import { useNavigate } from "react-router-dom";

export default function GameContainer() {
    const navigate = useNavigate();

return (
<div>
<h1>Aquí irá el nivel 2</h1>
<button id="PlayerInfo"></button>
<button id="ESC"></button>
</div>
);
}