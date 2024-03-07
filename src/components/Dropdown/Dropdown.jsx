import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

/**
 * Composant de menu dropdown
 * @param {Object} props - Les propriétés passées au composant
 * @param {string[]} props.data - Les données à afficher dans le dropdown (requis)
 * @param {string} props.label - Le label
 * @param {string} props.placeholder - Le texte à afficher par défaut si rien n'est sélectionné
 * @param {function} props.onSelected - La fonction de rappel appelée lorsqu'un élément est sélectionné
 * @param {string} props.id - L'id unique du dropdown
 * @param {string} props.errorMessage - Le message d'erreur à afficher si besoin
 * @param {Object} props.containerStyle - Les styles CSS appliqués au conteneur du dropdown
 * @param {Object} props.toggleStyle - Les styles CSS appliqués au toggle de l'ouverture du dropdown
 * @param {Object} props.menuStyle - Les styles CSS appliqués dropdown
 * @param {Object} props.itemStyle - Les styles CSS appliqués aux éléments de la liste dropdown
 * @param {Object} props.highlightedStyle - Les styles CSS appliqués aux éléments en surbrillance
 * @returns {JSX.Element} Composant JSX retourné
 */
export default function Dropdown({
    data,
    label,
    placeholder,
    onSelected,
    id,
    errorMessage,
    containerStyle,
    toggleStyle,
    menuStyle,
    itemStyle,
    highlightedStyle
  }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [searchString, setSearchString] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const searchTimeoutRef = useRef(null);
    const dropdownRef = useRef(null);
    const toggleRef = useRef(null);

    // Etat pour suivre si la dernière interaction vient du clavier ou de la souris
    const [lastInteraction, setLastInteraction] = useState("mouse");

    const toggleDropdown = () => setIsOpen(prev => !prev);

    // On définit une fonction pour gérer lorsqu'un élément est sélectionné dans le dropdown
    const handleSelection = (item, event) => {
        if (event) event.stopPropagation();
        setSelected(item);
        setIsOpen(false);
        onSelected?.(item);
    };

    // Fonction pour réinitialiser la chaîne de recherche au clavier
    const resetSearchString = () => setSearchString("");

    // Fonction pour mettre à jour la chaîne de recherche au clavier
    const updateSearchString = (str) => {
        setSearchString(prev => prev + str);

        clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => {
            resetSearchString();
        }, 1000);
    };

    // On définit une fonction avec un switch pour gérer les événements liés à l'appui sur les touches du clavier
    const handleKeyDown = (event) => {
        setLastInteraction("keyboard"); // Lorsqu'on appuie sur le clavier, on définit que la dernière interaction vient du clavier
        if (["Enter", "ArrowDown", "ArrowUp"].includes(event.key) && !isOpen) {
            setIsOpen(true);
            if (highlightedIndex === null) {
                setHighlightedIndex(0);
            }
            event.preventDefault();
        } else {
            switch (event.key) {
                case "Tab": // On ferme le dropdown lorsqu'on appuie sur tab pour parcourir le reste du formulaire
                    setIsOpen(false); 
                    break;
                case "PageUp": // Sert à aller tout en haut de la liste dropdown
                    if (isOpen) {
                        setHighlightedIndex(0);
                        event.preventDefault();
                    }
                    break;
                case "PageDown": // Sert à aller tout en bas de la liste dropdown
                    if (isOpen) {
                        setHighlightedIndex(data.length - 1);
                        event.preventDefault();
                    }
                    break;
                case "Enter": // Permet d'ouvrir le dropdown et de le refermer après la sélection du choix qui est en surbrillance
                    if (isOpen && highlightedIndex !== null) {
                        handleSelection(data[highlightedIndex]);
                        event.preventDefault();
                    }
                    break;
                case "Escape": // On ferme le dropdown lors de l'appui sur échap
                    setIsOpen(false);
                    break;
                case "ArrowDown": // Les flèches du haut et du bas permettent de parcourir la liste et de mettre un choix en surbrillance
                case "ArrowUp":
                    event.preventDefault();
                    if (isOpen) {
                        const newIndex = event.key === "ArrowDown"
                            ? (highlightedIndex + 1) % data.length
                            : highlightedIndex > 0 ? highlightedIndex - 1 : data.length - 1;
                        setHighlightedIndex(newIndex);
                    }
                    break;
                default: // On autorise la recherche au clavier
                    if (/^[a-zA-Z ]$/.test(event.key)) {
                        updateSearchString(event.key.toLowerCase());
                        const newIndex = data.findIndex(item =>
                            item.toLowerCase().startsWith(searchString + event.key.toLowerCase())
                        );
                        if (newIndex !== -1) {
                            setHighlightedIndex(newIndex);
                        }
                        event.preventDefault();
                    }
                    break;
            }
        }
    };

    // Fonction pour ajuster la surbrillance en fonction du survol de la souris
    // Uniquement si la dernière interaction n'est pas au clavier
    const handleMouseEnter = index => {
        if (lastInteraction !== "keyboard") {
            setHighlightedIndex(index);
        }
    };

    // Fonction pour rétablir la surbrillance par la souris après utilisation du clavier  
    // On réinitialise lastInteraction lors du mouvement de la souris  
    const handleMouseMove = () => {
        if (lastInteraction === "keyboard") {
            setLastInteraction("mouse");
        }
    };

    // On gère les évènements pour le blur et pour le focus
    const handleFocus = () => setIsFocused(true); 
    const handleBlur = () => setIsFocused(false);

    // On ajoute un effet pour gérer le clic en dehors du dropdown afin de le fermer
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toggleRef.current && !toggleRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // On ajoute un effet pour faire défiler le dropdown lorsqu'un élément est mis en surbrillance plus bas/plus haut dans la liste
    useEffect(() => {
        if (isOpen && highlightedIndex !== null) {
            dropdownRef.current.querySelectorAll(".dropdown-menu li")[highlightedIndex]?.scrollIntoView({
                block: "nearest",
            });
        }
    }, [highlightedIndex, isOpen]);

    return (
        <div className={"form-group"} ref={dropdownRef} onMouseMove={handleMouseMove} style={containerStyle} onFocus={handleFocus} onBlur={handleBlur}>
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <div
                className={`dropdown ${isOpen ? "open" : ""} ${isFocused ? "focused" : ""}`}
                id={id}
                onKeyDown={handleKeyDown}
                tabIndex="0"
                ref={toggleRef}
                onClick={toggleDropdown}
            >
                <div 
                    className="dropdown-toggle" 
                    tabIndex="-1"
                    style={toggleStyle}
                >
                    {selected || placeholder}
                    {isOpen ? <FaCaretUp /> : <FaCaretDown />}
                </div>
                {isOpen && (
                    <ul className="dropdown-menu" style={menuStyle}>
                        {data.map((item, index) => (
                            <li
                                key={item}
                                onClick={(event) => handleSelection(item, event)}
                                className={highlightedIndex === index ? "highlighted" : ""}
                                onMouseEnter={() => handleMouseEnter(index)}
                                style={highlightedIndex === index ? { ...itemStyle, ...highlightedStyle } : itemStyle}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={`error ${errorMessage ? "error-visible" : ""}`}>{errorMessage || ""}</div>
        </div>
    );
}

Dropdown.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onSelected: PropTypes.func,
    id: PropTypes.string,
    errorMessage: PropTypes.string,
    containerStyle: PropTypes.object,
    toggleStyle: PropTypes.object,
    menuStyle: PropTypes.object,
    itemStyle: PropTypes.object,
    highlightedStyle: PropTypes.object,
};

// On définit un style par défaut aux props de style
Dropdown.defaultProps = {
    containerStyle: {},
    toggleStyle: {},
    menuStyle: {},
    itemStyle: {},
    highlightedStyle: {},
};
