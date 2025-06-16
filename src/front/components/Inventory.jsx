import React, { useState, useEffect } from "react";
import { Objects } from "./Objects";


export const Inventory = ({ pickedUpObjects, allObjects, onPenalty }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectObject, setSelectObject] = useState(null)
    const [wrongClicks, setWrongClicks] = useState(0)
    const [message, setMessage] = useState('')
  



    const wrongMessage = [
        "Eso no parece encajar... ¿estás seguro de lo que haces?",
        "Has tocado algo que no deberías. Otra más y habrá consecuencias...",
         "Cada error tiene un precio... y el tuyo son 4 segundos más" 

    ]

    const modalObject = allObjects.filter(obj => pickedUpObjects.includes(obj.id))
    console.log("Objetos recogidos:", pickedUpObjects);
    console.log("Objetos filtrados:", modalObject);

    const handleSelect = (id) => {
        if (selectObject === id) {
            setSelectObject(null)
            setWrongClicks(0)
        }
        else {
            setSelectObject(id)
            setWrongClicks(0)
        }

    }
    const handleWrongClick = () => {
        setWrongClicks(prev => {
            const newCount = prev + 1;


            setMessage(wrongMessage[Math.min(newCount - 1, wrongMessage.length - 1)]);


            setTimeout(() => {
                setMessage('');
            }, 2000);

            if (newCount >= 3) {
                console.log("Penalización");
                setSelectObject(null);
                
                if (typeof onPenalty === "function") {
                    onPenalty(2);
                    
                }
                return 0;
            }

            return newCount;
            console.log("Se ha ejecutado handleWrongClick")
        });
    };

    useEffect(() => {

        if (!selectObject) return;

        const handleClick = (e) => {
            const isValid = e.target.closest(".object-zone");
            if (!isValid) {
                handleWrongClick();
            }
        };

        const timeoutId = setTimeout(() => {
            document.addEventListener("click", handleClick);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("click", handleClick);
        };
    }, [selectObject])



    return (
        <>
            <div className="inventoryContainer">
                {!isOpen && (
                    <button
                        type="button"
                        className="btn inventory_btn dropdown-toggle"
                        onClick={() => setIsOpen(true)}
                    >
                        <i className="fa-solid fa-box-open inventoryIcono"></i>
                    </button>
                )}

                {isOpen && (
                    <div className="inventoryMenuObjects  w-100 w-sm-75 w-md-50 w-lg-25 mx-auto gap-3 ">
                        {modalObject.length === 0 && (
                            <p className="dropdown-item">Aún no has recogido ningun objeto.</p>
                        )}

                        {modalObject.map(obj => (
                            <div
                                key={obj.id}
                                className='inventory-item'
                                onClick={() => handleSelect(obj.id)}
                            >
                                <img
                                    src={obj.img}
                                    className={`inventoryImg ${selectObject === obj.id ? "selected" : ""}`}
                                    alt={obj.name}
                                />
                                <p className="inventoryName">{obj.name}</p>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-sm btn-danger  "
                            onClick={() => setIsOpen(false)}
                        >
                            X
                        </button>
                    </div>
                )}
            </div>
            <div className={`inventoryPenaltyMessage ${message ? 'visible' : 'hidden'}`}>
                {message}
            </div>

        </>

    );
};