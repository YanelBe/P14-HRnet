import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Composant Input pour les champs de formulaires
 * @param {Object} props - Les propriétés passées au composant
 * @param {string} props.id - L'id unique de l'input
 * @param {string} [props.label] - Le label de l'input
 * @param {string} [props.type] - Le type de l'input
 * @param {string|number} props.value - La valeur actuelle de l'input 
 * @param {function} props.onChange - La fonction de rappel appelée lorsqu'il y a un changement dans l'input (requis)
 * @param {string} [props.errorMessage] - Le message d'erreur à afficher si besoin
 * @returns {JSX.Element} - Composant JSX retourné
 */
export default function Input({ id, label, type, value, onChange, errorMessage }) {

    const [isFocused, setIsFocused] = useState(false);

    // On gère les évènements pour le blur et pour le focus
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div className={"form-group"}>
            {label && (<label htmlFor={id} className="form-label">{label}</label>)}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`form-input ${isFocused ? "focused" : ""}`}
            />
            <div className={`error ${errorMessage ? "error-visible" : ""}`}>{errorMessage || ""}</div>

        </div>
    );
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};