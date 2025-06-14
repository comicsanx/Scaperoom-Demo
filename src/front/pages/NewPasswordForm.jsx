import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(
        process.env.BACKEND_URL + `/api/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      setMsg(data.msg);
    } catch (err) {
      setMsg("Error al cambiar la contraseña");
    }
  };

  return (
    <div>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cambiar contraseña</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};
