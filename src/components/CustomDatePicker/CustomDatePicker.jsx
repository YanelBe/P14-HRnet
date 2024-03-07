import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Composant de sélecteur de date personnalisé, basé sur le plugin react-datepicker
 * @param {Object} props - Les propriétés passées au composant
 * @param {string} props.label - Le label
 * @param {string} props.id - L'identifiant unique
 * @param {Date} props.selected - La date sélectionnée
 * @param {Date} props.maxDate - La date maximale sélectionnable
 * @param {function} props.onChange - La fonction de rappel appelée lorsqu'une nouvelle date est sélectionnée
 * @returns {JSX.Element} Composant JSX retourné
 */
export default function CustomDatePicker({ label, id, selected, maxDate, onChange }) {
    /**
     * Etat pour suivre si le sélecteur de date a le focus ou non
     * @type {[boolean, function]} Array contenant une valeur booléenne et une fonction pour mettre à jour la valeur
     */
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={"form-group"}>
            {/* Affichage du label seulement s'il est défini */}
            {label && <label htmlFor={id} className="form-label">{label}</label>}

            <DatePicker
                id={id}
                selected={selected}
                maxDate={maxDate}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                showYearDropdown
                className={`form-input ${isFocused ? "focused" : ""}`}
                wrapperClassName="datePicker"
            />
        </div>
    );
}

CustomDatePicker.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    selected: PropTypes.instanceOf(Date).isRequired,
    maxDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired
};