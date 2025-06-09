import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [pistasUsadas, setPistasUsadas] = useState([]);
  const [nivelActual, setNivelActual] = useState(1);
  const [tiempo, setTiempo] = useState(0);
  // const { segundos, iniciar, pausar, reiniciar } = useChrono(true);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return true; // Indica éxito
    } else {
      alert("Login fallido");
      return false; // Indica fallo
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    // No navegar aquí
  };

  const apiCall = async (url, method = "GET", body = null) => {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!res.ok) {
      throw new Error("Error en la API");
    }
    return await res.json();
  };

  const registrarPistaUsada = (idPista) => {
    setPistasUsadas((prev) => [...prev, idPista]);
  };

  return (
    <GameContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        nivelActual,
        setNivelActual,
        tiempo,
        setTiempo,
        pistasUsadas,
        registrarPistaUsada,
        apiCall,
        // pausar,
        // iniciar,
        // reiniciar

      }}
    >
      {children}
    </GameContext.Provider>
  );
};
