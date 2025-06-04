import { useEffect, useState } from "react";

export default function useChrono(start = false) {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(start);

  useEffect(() => {
    let intervalo = null;
    if (activo) {
      intervalo = setInterval(() => {
        setSegundos((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  return { segundos, iniciar: () => setActivo(true), pausar: () => setActivo(false), reiniciar: () => setSegundos(0) };
}
