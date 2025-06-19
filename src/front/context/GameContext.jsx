import { createContext, useContext, useState, useRef, useEffect } from "react";


const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api";

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [pistasUsadas, setPistasUsadas] = useState([]);
  const [nivelActual, setNivelActual] = useState(1);
  const [tiempo, setTiempo] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef();

  //API para la música de Audius

  const [audiusAudioUrl, setAudiusAudioUrl] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState(true);
  const audioPlayerRef = useRef(null);
  const currentVolume = useRef(0.1); 
  const [currentMusicGroupId, setCurrentMusicGroupId] = useState(0);

  const musicGroupMap = {
    0: "a5Y5Q", // Rutas generales 
    1: "ZZXVZya", // Nivel 1
    2: "g95Gv", // Nivel 2
    3: "32Z1aNv", // victoria
  };

  const getAudiusDiscoveryProvider = useRef(async () => {
    try {
      const response = await fetch('https://api.audius.co');
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        console.log("Audius Discovery Provider:", data.data[0]);
        return data.data[0];
      }
      return null;
    } catch (error) {
      console.error("Error al obtener discovery providers de Audius:", error);
      return null;
    }
  });

  useEffect(() => {
    const fetchMusicForGroup = async () => {
      setIsAudioLoading(true);
      console.log(`[Music Fetch] Intentando cargar música para Grupo ID: ${currentMusicGroupId}`);
      const provider = await getAudiusDiscoveryProvider.current();
      if (!provider) {
        setIsAudioLoading(false);
        setAudiusAudioUrl(null);
        return;
      }
      const appName = "ScapeRoom102-4GeeksAcademy";
      
      const trackId = musicGroupMap[currentMusicGroupId]; 

        if (!trackId) {
        console.warn(`[Music Fetch] No se encontró ID de pista en musicGroupMap para el Grupo ${currentMusicGroupId}.`);
        if (audioPlayerRef.current && !audioPlayerRef.current.paused) {
            console.log("[Music Fetch] Pausando audio actual (no hay ID de pista configurado).");
            audioPlayerRef.current.pause();
        }
        setAudiusAudioUrl(null);
        setIsAudioLoading(false);
        return;
      }

      // CAMBIO 4: Construimos la URL de streaming DIRECTAMENTE con el ID, sin usar /search
      const streamUrl = `${provider}/v1/tracks/${trackId}/stream?app_name=${appName}`;
      console.log(`[Music Fetch] URL de streaming construida: "${streamUrl}" para ID: ${trackId}`);

      if (streamUrl === audiusAudioUrl) {
        console.log(`[Music Fetch] La nueva URL es la misma que la actual. No se reinicia la reproducción.`);
        setIsAudioLoading(false);
        return; 
      }
      
      // CAMBIO 5: Agregamos un bloque try-catch para manejar errores de carga de la pista por ID
      try {
        // Opcional: Puedes quitar esta llamada 'checkResponse' si quieres optimizar al máximo,
        // pero te da un log del título de la canción y verifica si el ID es válido.
        const checkResponse = await fetch(`${provider}/v1/tracks/${trackId}?app_name=${appName}`);
        if (!checkResponse.ok) {
            throw new Error(`Track ID ${trackId} no encontrado o inaccesible. Estado: ${checkResponse.status}`);
        }
        const trackData = await checkResponse.json();
        console.log(`[Music Fetch] Pista verificada: "${trackData.data.title}"`);
        
        setAudiusAudioUrl(streamUrl); 
      } catch (error) {
        console.error(`[Music Fetch] Error al verificar/cargar pista con ID ${trackId}:`, error);
        if (audioPlayerRef.current && !audioPlayerRef.current.paused) {
            console.log("[Music Fetch] Pausando audio actual (error al cargar pista por ID).");
            audioPlayerRef.current.pause();
        }
        setAudiusAudioUrl(null);
      } finally {
        setIsAudioLoading(false); 
        console.log("[Music Fetch] Proceso de carga de música finalizado.");
      }
    };

    if (currentMusicGroupId !== null) { 
      fetchMusicForGroup();
    } else {
        if (audioPlayerRef.current && !audioPlayerRef.current.paused) {
            audioPlayerRef.current.pause();
        }
        setAudiusAudioUrl(null);
        setIsAudioLoading(false);
    }
  }, [currentMusicGroupId, audiusAudioUrl]); 

  useEffect(() => {
    const audio = audioPlayerRef.current;
    if (audio) {
        if (audiusAudioUrl) {
          if (audio.src !== audiusAudioUrl) { 
                audio.src = audiusAudioUrl;
                console.log(`[Audio Player] Cargando nueva fuente: ${audiusAudioUrl}`);
                audio.load();
          }
            audio.volume = currentVolume.current;
            audio.loop = true;
            audio.muted = false; 
            audio.play().catch(e => {
                console.warn("Reproducción automática de audio bloqueada por el navegador:", e);
            });
        } else {
            if (!audio.paused) {
               console.log("[Audio Player] Pausando audio.");
                audio.pause();
                audio.src = "";
                audio.load();
            }
        }
    }
  }, [audiusAudioUrl]);

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

    const logout = () => {
      setToken("");
      setUser(null);
      localStorage.removeItem("token");
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
        const updateProfile = await apiCall(`${API_BASE}/user/profile`, "PUT", newProfile)

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
          updateUserProfile,
          menuOpen,
          setMenuOpen,
          timerRef,
          audiusAudioUrl,
          isAudioLoading,
          audioPlayerRef,
          setCurrentMusicGroupId,
        }}
      >
        {children}
      </GameContext.Provider>
    );
  };