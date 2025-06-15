import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

// export default function Login() {
//   const { login } = useGame();
//   const [user, setUser] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await login(user, password);
//     if (success) {
//       navigate("/menu");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
//       <button type="submit">Iniciar Sesión</button>
//     </form>
//   );
// }
