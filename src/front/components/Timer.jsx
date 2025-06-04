import useChrono from "../hooks/useChrono";

export default function Timer() {
    const { segundos, iniciar, pausar } = useChrono(true);

    return (
        <div>
            <h3>Tiempo: {segundos}s</h3>
            <button onClick={pausar}>Pausar</button>
            <button onClick={iniciar}>Reanudar</button>
        </div>
    );
}
