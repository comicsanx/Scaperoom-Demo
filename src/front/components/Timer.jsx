import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import useChrono from "../hooks/useChrono";



const Timer = forwardRef(function Timer({ menuOpen }, ref) {
    const { seconds, start, pause, addSeconds } = useChrono(true);
    const pausedByMenu = useRef(false);

    useImperativeHandle(ref, () => ({
        addSeconds
    }));

    useEffect(() => {
        if (menuOpen) {
            pause();
            pausedByMenu.current = true;
        } else if (pausedByMenu.current) {
            start();
            pausedByMenu.current = false;
        }
    }, [menuOpen, pause, start]);

    return (
        <div>
            {String(Math.floor(seconds / 3600)).padStart(2, '0')}:
            {String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')}:
            {String(seconds % 60).padStart(2, '0')}
        </div>
    );
});

export default Timer;
