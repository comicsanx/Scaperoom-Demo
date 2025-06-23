
import { EnigmasData } from "../data/EnigmasData";
import UsedHints from "./UsedHints";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

export const EnigmaModal = ({ show, onHide, enigmaId, onEnigmaSolved, timerRef }) => {
  console.log("EnigmaModal: Renderizando con show:", show, "y enigmaId:", enigmaId);

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const enigma = EnigmasData.enigmasNivel1.find((e) => e.id === enigmaId);

  useEffect(() => {
    if (show) {
      setInputValue('');
      setMessage('');
    }
  }, [show, enigmaId]);

  if (!enigma) {
    console.error("Enigma no encontrado con ID:", enigmaId);
    return null;
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setMessage('');
  };

  const handleSubmit = () => {
    if (enigma.id === 2) {
      if (inputValue === enigma.solution) {
        setMessage(
          "¡Código correcto! Ya has manipulado el reloj...deberías echar un vistazo por la mirilla para comprobar si el señor Geeks está en su despacho."
        );
        setTimeout(() => {
          onEnigmaSolved(enigma.id, true);
          onHide();
        }, 4000);
      } else {
        setMessage(
          "Código incorrecto. Este error te trae 5 segundos de penalización..."
        );

        if (timerRef.current && timerRef.current.addSeconds) {
          timerRef.current.addSeconds(5);
          console.log("Penalización de 5 segundos aplicada por respuesta incorrecta.");
        }
      }
    } else {
      
    }
  }; 

  return ( 
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>{enigma.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {enigma.img && (
          <img
            src={enigma.img}
            className="img-fluid mb-3"
            alt={enigma.title}
          />
        )}
        {enigma.id === 2 && (
          <Form.Group className="mb-3">
            <Form.Label>Necesitas manipular el reloj para que el Sr Geeks crea que es la hora de la comida.</Form.Label>
            <Form.Control
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ej: 1234"
            />
          </Form.Group>
        )}
        {message && <p className={`text-center ${message.includes('correcto') ? 'text-success' : 'text-danger'}`}>{message}</p>}
        {enigma.description && <p>{enigma.description}</p>}

        <UsedHints enigmaId={enigma.id} isOpen={show} onClose={onHide} />

      </Modal.Body>
      <Modal.Footer>
        {enigma.id === 2 && (
          <Button variant="primary" onClick={handleSubmit}>
            Enviar Código
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}