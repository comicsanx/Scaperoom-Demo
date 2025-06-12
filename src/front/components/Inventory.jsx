import React, { useState } from "react";
import { Objects } from "./Objects";


export const Inventory = ({ pickedUpObjects, allObjects }) => {

    const [isOpen, setIsOpen] = useState(false)

    const modalObject = allObjects.filter(obj => pickedUpObjects.includes(obj.id))
    console.log("Objetos recogidos:", pickedUpObjects);
    console.log("Objetos filtrados:", modalObject);

    const handleCloseButton = () => {

        setIsOpen(!isOpen)

    }


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
                            <div key={obj.id} className="inventory-item">
                                <img src={obj.img} className="inventoryImg" alt={obj.name} />
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

        </>

    );
};