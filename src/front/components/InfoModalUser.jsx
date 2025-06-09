import useGame from "../context/GameContext";
import React, { useEffect, useState } from "react";
import useChrono from "../hooks/useChrono";

export const InfoModalUser = () => {

  const { user, setUser,nivelActual,apiCall,pistasUsadas, registrarPistaUsada, 
    nivelActual, tiempo, pausar, iniciar} =  useGame()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  const fetchUserData = async () => {
    
      if (user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
      
        const userData = await apiCall();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
   
    if (user === null) { 
        fetchUserData();
    }
     }

useEffect(() => {
    fetchUserData
},[apiCall, user, setUser])

//   useEffect(() => {
//     pausar();
//     return () => iniciar();
//   }, []);


  if (loading) return <p>Cargando datos del jugador...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No se pudieron cargar los datos del jugador.</p>;


 return (
  <div className="modal p-4">
    <h2>Información del Jugador</h2>

    <div className="d-flex align-items-center gap-3 mb-3">
      {/* <img
        src={user.profile}
        alt="Foto de perfil"
        className="rounded-circle"
        style={{ width: "80px", height: "80px", objectFit: "cover" }} */}
      />
      <h3>{user.username}</h3>
    </div>

    <p>Tiempo jugado: <strong>{tiempo} segundos</strong></p>
    <p>Nivel actual: <strong>{nivelActual}</strong></p>

    <div className="d-flex gap-3 mt-3">
      {pistas.map(({ id, nombre }) => {
        const usada = pistasUsadas.includes(id);
        return (
          <button
            key={id}
            onClick={() => {
              if (!usada) registrarPistaUsada(id);
            }}
            disabled={usada}
            className={`btn ${usada ? "btn-secondary" : "btn-success"}`}
          >
            {/* {nombre}poner el nombre que vaya a tener la pista */}
          </button>
        );
      })}
    </div>

    <button onClick={onClose} className="btn btn-primary mt-4">
      Cerrar
    </button>
  </div>
);

     