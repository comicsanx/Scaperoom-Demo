import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const API_BASE = "https://glorious-memory-695976v44pqg255jx-3001.app.github.dev"

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [pistasUsadas, setPistasUsadas] = useState([]);
  const [nivelActual, setNivelActual] = useState(1);
  const [tiempo, setTiempo] = useState(0);

  // fetch que registra tiempo y nivelActual post/put revisar
  // falta adaptar las url a los endpoints cuando estén subidos.



  const signup = async (email, password, avatar_filename, user_name) => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, avatar_filename, user_name }),
      });

      if (res.ok) {
        const data = await res.json();
        alert("¡Registro exitoso! Ya puedes iniciar sesión.")
        return true;
      } else {
        alert("registro fallido");
        return false;
      }
    }
    catch (error) {
      console.error("Error de conexión durante el registro:", error);
      alert("No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.");
      return false;
    }
  }

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
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

  const apiCall = async () => {
    const res = await fetch(`${API_BASE}/user/profile`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error en la API");
    }
    return await res.json();
  };

  const deleteUser = async () => {
    if (!user || !user.id || !token) {
      throw new Error("No hay usuario autenticado para eliminar.");
    }
    try {
      await apiCall(`${API_BASE}`, "DELETE")
      logout()
      return true
    } catch (error) {
      console.error("Error al eliminar usuario en la API:", error);
      throw new Error(error.message)
    }
  }

  // newProfile es la variable que hay que poner en el componente para actualizar los datos

  const updateUserProfile = async (newProfile) => {
    if (!user || !user.id || !token) {
      throw new Error("No hay usuario autenticado para modiifcar.");
    }
    try {
      const updateProfile = await apiCall(`${API_BASE}`, "PUT", newProfile)

      setUser(updateProfile)
      alert("Perfil actualizado exitosamente.");
      return true;
    } catch (error) {
      console.error("Error al eliminar usuario en la API:", error);
      throw new Error(error.message)

    }
  }
  // TODO: revisar si se puede hacer un put o post dependiendo de si hay progreso guardado o no
  const saveGameProgress = async (current_level, accumulated_time,) => {

    if (!user || !user.id || !token) {
      console.error("No hay usuario autenticado.");
      return false;
    }
    try {
      const hasProgress = await apiCall(`${API_BASE}`);
      console.log(hasProgress)

      const method = hasProgress ? "PUT" : "POST";
      const endpoint = method === "POST" ? `${API_BASE}` : `${API_BASE}/${user.id}`;

      await apiCall({
        current_level,
        accumulated_time,
        user_id: user.id,
      });

      console.log("Progreso guardado.");
      setNivelActual(current_level)
      setTiempo(accumulated_time);
      return true;
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      alert("No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.");
      return false;
    }
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
        signup,
        saveGameProgress,
        deleteUser,
        updateUserProfile
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
