import {useGame} from "../context/GameContext";
import React, { useEffect, useState } from "react";
import useChrono from "../hooks/useChrono";

export const InfoModalUser = () => {

  const { user, setUser, nivelActual, apiCall, pistasUsadas, tiempo} = useGame()

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
 useEffect(() => {
    if (user === null) {
      fetchUserData();
    }
  }, [apiCall, user, setUser])


if (loading) return <p>Cargando datos del jugador...</p>;
if (error) return <p>Error: {error}</p>;
if (!user) return <p>No se pudieron cargar los datos del jugador.</p>;

 
const hints = [1, 2, 3];

return (


<Dropdown drop="end">
      <Dropdown.Toggle as={Button} variant="secondary">
        info
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-3">
        <h2>Información del Jugador</h2>

        <div className="d-flex align-items-center gap-3 mb-3">
          {user.avatar_filename && (
            <img
              src={user.avatar_filename}
              alt="Foto de perfil"
              className="rounded-circle"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          )}
          <h3>{user.username}</h3>
        </div>

        <p>Tiempo: <strong>{tiempo} segundos</strong></p>
        <p>Nivel actual: <strong>{nivelActual}</strong></p>

   <div className="d-flex gap-3 mt-3">
      {hints.map(({ number }) => {
         const used = pistasUsadas.length >= number
        return (
          <button
            key={number}
            disabled={true}
           className={`rounded-circle btn btn-sm ${used ? "btn-secondary" : "btn-success"}`}
          >
           
          </button>
      );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};