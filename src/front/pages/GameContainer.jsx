
import Timer from "../components/Timer";
import { Objects } from "../components/Objects";
import { ObjectsLevel1 } from "../data/ObjectsArray";

export default function GameContainer() {
  return (
    <div>
      <h2>Nivel 1</h2>
      <Timer />
      {/* Aquí se colocarán puzzles, pistas, menú de objetos */}
      <Objects objectsLevel={ObjectsLevel1} />
    </div>
  );
}
