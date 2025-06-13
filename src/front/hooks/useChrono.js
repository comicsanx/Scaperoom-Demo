import { useEffect, useState } from "react";

export default function useChrono(start = false) {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(start);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active]);

  return {
    seconds,
    start: () => setActive(true),
    pause: () => setActive(false),
    reset: () => setSeconds(0),
    addSeconds: (n) => setSeconds((s) => s + n),
  };
}
