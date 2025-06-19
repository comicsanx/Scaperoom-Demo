import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [hintsUsed, setHintsUsed] = useState({});
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [nivelActual, setNivelActual] = useState(1);
  const [tiempo, setTiempo] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef();
  const [pickedUpObjects, setPickedUpObjects] = useState([])
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [audiusAudioUrl, setAudiusAudioUrl] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioPlayerRef = useRef(null);
  const currentVolume = useRef(0.1);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // const musicGroupMap = {
  //   0: "a5Y5Q", // Rutas generales 
  //   1: "ZZXVZya", // Nivel 1
  //   2: "g95Gv", // Nivel 2
  //   3: "32Z1aNv", // victoria
  // }; Es demasiado lento. 

  const SINGLE_AUDIUS_TRACK_ID = 'zK2Vq'; 
  const AUDIUS_DISCOVERY_PROVIDERS = [
    "https://discoveryprovider.audius.co",
    "https://discoveryprovider2.audius.co",
    "https://discoveryprovider3.audius.co"
];

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    // No navegar aquí
  };

    const audioLogout = useCallback(() => {
    setHasUserInteracted(false); 
    setIsMusicEnabled(false); 
    if (audioPlayerRef.current && !audioPlayerRef.current.paused) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.src = ""; 
      audioPlayerRef.current.load(); 
    }
    console.warn("Audio se ha 'deslogueado' (reiniciando interacción de usuario para audio).");
  }, []);


 useEffect(() => {
    const fetchSingleMusicTrackDirectly = async () => {
      setIsAudioLoading(true); 
      setAudiusAudioUrl(null);

      let foundStreamUrl = null;
       for (const providerUrl of AUDIUS_DISCOVERY_PROVIDERS) {
      try {
              console.log(`[GameContext] Intentando cargar la URL de la pista única desde el proveedor: ${providerUrl}`);
              const response = await fetch(`${providerUrl}/v1/tracks/${SINGLE_AUDIUS_TRACK_ID}/stream`);

              if (response.ok && response.url) {
                  foundStreamUrl = response.url;
                  console.log(`[GameContext] URL de Audius para pista única obtenida de ${providerUrl}: ${foundStreamUrl}`);
                  break; // Si encontramos una URL válida, salimos del bucle
              } else {
                  console.warn(`[GameContext] Proveedor ${providerUrl} no pudo obtener la URL de stream o la respuesta no fue OK. Intentando con el siguiente...`);
              }
          } catch (error) {
              console.warn(`[GameContext] Error al conectar con el proveedor ${providerUrl}:`, error);
          }
      }

      setAudiusAudioUrl(foundStreamUrl); // Establecemos la URL si se encontró
      if (!foundStreamUrl) {
           console.warn("[GameContext] No se pudo obtener la URL de stream de ninguna de los proveedores de la lista.");
      }
      setIsAudioLoading(false); 
    };

    fetchSingleMusicTrackDirectly();
  }, []);

   const makeRequest = useCallback(async (url, method = 'GET', body = null, token = '') => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;

    const res = await fetch(fullUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Error desconocido en la API" }));
      throw new Error(errorData.message || "Error en la API");
    }

    return await res.json();
  }, [API_BASE]); 

  useEffect(() => {
    const audio = audioPlayerRef.current;
    console.log("------------------------------------------");
    console.log("Estado de audio en useEffect (inicio):", {
      isMusicEnabled,
      audiusAudioUrl,
      hasUserInteracted,
      audioReady: !!audio,
      currentAudioSrc: audio ? audio.src : 'N/A',
      audioPaused: audio ? audio.paused : 'N/A'
    });


    if (audio && audiusAudioUrl) { 
      if (isMusicEnabled && hasUserInteracted) {
        if (audio.paused || audio.src !== audiusAudioUrl) {
           if (audio.src !== audiusAudioUrl) {
               audio.src = audiusAudioUrl;
               console.log("[Audio Player] Asignando la única URL de audio y cargando.");
               audio.load(); 
           }

           console.log(`[Audio Player] ReadyState antes de play: ${audio.readyState}`);
           setTimeout(() => {
               audio.volume = currentVolume.current;
               audio.loop = true; 
               audio.muted = false;
               console.log("[Audio Player] Intentando reproducir DESPUÉS del setTimeout...");
               audio.play().then(() => {
                   console.log("[Audio Player] REPRODUCCIÓN EXITOSA.");
               }).catch(e => {
                   console.warn("[Audio Player] FALLO EN LA REPRODUCCIÓN (con catch):", e.name, e.message, e);
               });
           }, 100); 
        }

      } else {

        if (!audio.paused) {
          console.log("[Audio Player] Pausando audio (isMusicEnabled o hasUserInteracted es false).");
          audio.pause();
        }
      }
    } else {
        console.log("[Audio Player] No se puede gestionar audio: elemento de audio o audiusAudioUrl no disponibles.", { audio, audiusAudioUrl });
    }
    console.log("------------------------------------------");
  }, [isMusicEnabled, hasUserInteracted, audiusAudioUrl, audioLogout, currentVolume]); // audiusAudioUrl como dependencia porque se carga asíncronamente

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
      return true; // Indica éxito
    } else {
      alert("Login fallido");
      return false; // Indica fallo
    }
  };

  const apiCall = async (API_BASE, method = 'GET', body = null, token = '') => {
    const res = await fetch(API_BASE + "/api/", {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      await apiCall(`${API_BASE}/user/profile`, "DELETE")
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
  //   setPistasUsadas((prev) => [...prev, idPista]);
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
        apiCall : makeRequest,
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
        audiusAudioUrl,
        isAudioLoading,
        audioPlayerRef,
        isMusicEnabled,
        setIsMusicEnabled,
        hasUserInteracted,
        setHasUserInteracted, 
      }}
    >
      {children}
    </GameContext.Provider>
  );
};