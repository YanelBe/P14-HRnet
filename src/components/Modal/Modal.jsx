import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Composant Modal pour afficher une fenêtre modale
 * @param {Object} props - Les propriétés passées au composant
 * @param {boolean} props.isOpen - Indique si la modale est ouverte ou non (requis)
 * @param {function} props.openClose - La fonction de rappel pour ouvrir ou fermer la modale (requis)
 * @param {string} props.content - Le contenu de la modale (requis)
 * @returns {JSX.Element|null} - Retourne le composant JSX, ou null si la modale n'est pas ouverte
 */
export default function Modal({ isOpen, openClose, content }) {
    
    // Utilisation de useEffect pour gérer les écouteurs d'événements pour fermer la modale au clavier
    useEffect(() => {
        const closeOnEscapeKey = e => {
            if (e.key === "Escape" && isOpen) {
                openClose();
            }
        };
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [isOpen, openClose]);

    // On gère également le clic en dehors de la modale pour pouvoir la fermer
    // Cela offre le choix de ne pas cliquer sur la croix
    const handleModalContainerClick = (event) => {
        // On empêche le clic de se propager plus loin
        event.stopPropagation(); 
    };

    return (
        isOpen ? (
            <div className="modal-overlay" onClick={openClose}>
                <div className="modal" onClick={handleModalContainerClick}>
                    <div className="modal-content">
                        <div className="modal-close">
                            <span className="modal-close-button" onClick={openClose}>&times;</span>
                        </div>
                        <p className="modal-text">{content}</p>
                    </div>
                </div>
            </div>
        ) : null
    );
}


Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    openClose: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
};
