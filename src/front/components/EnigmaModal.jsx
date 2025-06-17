import  { useGame } from "../context/GameContext";
import {EnigmasData} from "../data/EnigmasData";
import UsedHints from "./UsedHints"; 

import { Modal, Button } from "react-bootstrap";

export const EnigmaModal = ({ show, onHide, enigmaId }) => {
 const enigma = EnigmasData.enigmasNivel1.find((e) => e.id === enigmaId);
  if (!enigma) return null;

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{enigma.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {enigma.img && (
          <img
            src={enigma.img}
            alt={enigma.title}
            className="img-fluid mb-3"
            style={{ borderRadius: "8px" }}
          />
          
        )}
        <div className="d-flex flex-column gap-2">
          
          <UsedHints enigmaId={enigma.id}  isOpen={show} onClose={onHide}/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}