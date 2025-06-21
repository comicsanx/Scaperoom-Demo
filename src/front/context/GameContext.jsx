import { createContext, useContext, useState, useRef ,useEffect} from "react";


const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const [hintsUsed, setHintsUsed] = useState({});
  // const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [nivelActual, setNivelActual] = useState(1);
  const [tiempo, setTiempo] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef();
  const [pickedUpObjects, setPickedUpObjects] = useState([])
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [ isGearboxCodeCorrect,setIsGearboxCodeCorrect] = useState(false);      
  const [hasLookedRoom, setHasLookedRoom] = useState(false);

  // fetch que registra tiempo y nivelActual post/put revisar
  // falta adaptar las url a los endpoints cuando estén subidos.



  const signup = async (data) => {
    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    const res = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      setIsUserLoading(false)
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
    setIsUserLoading(false)
    // No navegar aquí
  };

const apiCall = async (API_BASE, method = 'GET', body = null, token = '') => {
  const res = await fetch(API_BASE, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
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
      await apiCall(`${API_BASE}/user/profile`, "DELETE", null, token)
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
      const updateProfile = await apiCall(`${API_BASE}/user/profile`, "PUT", newProfile, token)

      setUser(updateProfile)
      alert("Perfil actualizado exitosamente.");
      return true;
    } catch (error) {
      console.error("Error al eliminar usuario en la API:", error);
      throw new Error(error.message)

    }
  }

  const saveGameProgress = async (current_level, accumulated_time) => {
    if (!user || !user.id || !token) {
      console.error("No hay usuario autenticado.");
      return false;
    }
    try {
      const res = await fetch(`${API_BASE}/gamesession/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const session = await res.ok ? await res.json() : null;

      let method, endpoint;
      if (session && session.id) {
        method = "PUT";
        endpoint = `${API_BASE}/gamesession/${session.id}`;
      } else {
        method = "POST";
        endpoint = `${API_BASE}/gamesession`;
      }

      const saveRes = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          current_level,
          accumulated_time,
          user_id: user.id
        })
      });

      if (!saveRes.ok) throw new Error("Error al guardar progreso");

      setNivelActual(current_level);
      setTiempo(accumulated_time);
      return true;
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      alert("No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.");
      return false;
    }
  };

   useEffect(() => {
        const loadUserProfile = async () => {
           
            if (user && !isUserLoading) {
                setIsUserLoading(false); 
                return;
            }

           
            if (!token) {
                setUser(null);
                setIsUserLoading(false);
                return;
            }

            if (!user && token) {
                setIsUserLoading(true); 
                try {
                   
                    const userData = await apiCall(`${API_BASE}/api/user/profile`, "GET", null, token); 
                    setUser(userData); 
                } catch (error) {
                    console.error("Error al cargar el perfil de usuario al iniciar:", error);
                    
                    logout(); 
                } finally {
                    setIsUserLoading(false); 
                }
            }
        };

        loadUserProfile();
    }, [token, apiCall, user, setUser, setIsUserLoading, logout]); 

  // const registrarPistaUsada = (idPista) => {
  //   setPistasUsadas((prev) => [...prev, idPista]);
  // };

  return (
    <GameContext.Provider
      value={{
        user,
         setUser,
        isUserLoading,
        setIsUserLoading,
        token,
        login,
        logout,
        nivelActual,
        setNivelActual,
        tiempo,
        setTiempo,
        hintsUsed,
        setHintsUsed,
        apiCall,
        signup,
        saveGameProgress,
        deleteUser,
        updateUserProfile,
        menuOpen,
        setMenuOpen,
        timerRef,
        totalHintsUsed,
        setTotalHintsUsed,
        pickedUpObjects,
        setPickedUpObjects,
        hasLookedRoom,
        setHasLookedRoom,
        isGearboxCodeCorrect,
        setIsGearboxCodeCorrect
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


