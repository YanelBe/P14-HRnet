import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employeeSlice";

import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
// import Dropdown from "../../components/Dropdown/Dropdown";
import Dropdown from "@yanbe/hrnet-dropdown"; // Import du composant directement depuis npm
import Modal from "../../components/Modal/Modal";

import optionsData from "../../data/dropdownData.json";


/**
 * Composant Home pour la création d'un employé
 * @returns {JSX.Element} - La page Home
 */
export default function Home() {
    const dispatch = useDispatch();

    //L'état initial des éléments du formulaire
    const initialState = {
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
        startDate: new Date(),
        department: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
    };
    const [formData, setFormData] = useState(initialState);
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState({});

    //On parcourt les options des départements et des états pour les menus Dropdown
    const departments = optionsData.departments.map(option => option.toString());
    const stateOptions = optionsData.states.map(state => state.name);


    // Labels associés aux différents champs de formulaire
    const fieldLabels = {
        firstName: "First Name",
        lastName: "Last Name",
        department: "Department",
        street: "Street",
        city: "City",
        state: "State",
        zipCode: "Zip Code",
        dateOfBirth: "Date of Birth",
        startDate: "Start Date",
    };

    // Objet pour aider à définir plus précisément les messages d'erreurs
    const fieldActions = {
        firstName: "enter",
        lastName: "enter",
        department: "select",
        street: "enter",
        city: "enter",
        state: "select",
        zipCode: "enter",
        dateOfBirth: "select",
        startDate: "select",
    };

    /**
     * Sert à capitaliser la première lettre de chaque mot dans une chaîne de caractère
     * @param {string} string - La chaîne à capitaliser
     * @returns {string} - Retourne la chaîne capitalisée
     */
    const capitalizeWords = (string) => {
        return string.replace(/\b(\w)/g, char => char.toUpperCase()).replace(/\b(\w+)\b/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    };
    

    /**
     * Gère le changement d'input du formulaire et met à jour le state de formData
     * Cette fonction est associée à capitalizeWords
     * @param {string} field - Le champ à mettre à jour
     * @param {string | Date} value - La nouvelle valeur du champ (ou la Date s'il s'agissait du champ des dates)
     */
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value instanceof Date ? value : capitalizeWords(value) }));
    };

    
    /**
     * Met à jour le champ du State (des USA) avec son abbréviation
     * @param {string} selectedName - Le nom de l'état (qui a déjà une abbreviation associée)
     */
    const handleSelectState = (selectedName) => {
        const selectedState = optionsData.states.find(state => state.name === selectedName);
        if (selectedState) {
            setFormData(prev => ({ ...prev, state: selectedState.abbreviation }));
        }
    };

    /**
     * Valide les données du formulaire, et met à jour les erreurs avec les messages correspondants
     * @returns {boolean} - Retourne True si le formulaire est bien envoyé, renvoie False sinon
     */
    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            if (!formData[field]) {
                const action = fieldActions[field];
                const label = fieldLabels[field];
                newErrors[field] = `Please ${action} a ${label}.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // On définit une fonction pour sauvegarder un employé dans le state de Redux si le formulaire est valide
    const saveEmployee = () => {
        if (validateForm()) {
            const newEmployee = {
                id: Date.now(),
                ...formData,
                dateOfBirth: formData.dateOfBirth.toLocaleDateString(),
                startDate: formData.startDate.toLocaleDateString(),
            };

            dispatch(addEmployee(newEmployee));
            setOpenModal(true);
            resetForm();
        }
    };


    // Fonction pour réinitialiser le formulaire à son état initial
    const resetForm = () => {
        setFormData(initialState);
    };

    /**
     * Gère la soumission du formulaire
     * @param {React.FormEvent<HTMLFormElement>} e - Le FormEvent
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        saveEmployee();
    };

    return (
        <>
            <Header />
            <div className="container">
                <h1>Create Employee</h1>
                <form className="employee-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <Input
                            id="first-name"
                            label="First Name"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            errorMessage={errors.firstName}
                        />
                        <Input
                            id="last-name"
                            label="Last Name"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            errorMessage={errors.lastName}
                        />
                    </div>
                    <div className="form-section">
                        <CustomDatePicker
                            label="Date of Birth"
                            id="date-of-birth"
                            selected={formData.dateOfBirth}
                            onChange={date => handleInputChange("dateOfBirth", date)}
                        />
                        <CustomDatePicker
                            label="Start Date"
                            id="start-date"
                            selected={formData.startDate}
                            onChange={date => handleInputChange("startDate", date)}
                        />
                    </div>
                    <fieldset className="address">
                        <legend>Address</legend>
                        <div className="form-section">
                            <Input
                                id="street"
                                label="Street"
                                type="text"
                                value={formData.street}
                                onChange={(e) => handleInputChange("street", e.target.value)}
                                errorMessage={errors.street}
                            />
                            <Input
                                id="city"
                                label="City"
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                errorMessage={errors.city}
                            />
                        </div>
                        <div className="form-section">
                            <Dropdown
                                id="state-dropdown"
                                label="State"
                                data={stateOptions}
                                placeholder="Select a State"
                                onSelected={handleSelectState}
                                errorMessage={errors.state}
                            />
                            <Input
                                id="zip-code"
                                label="Zip Code"
                                type="number"
                                value={formData.zipCode}
                                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                errorMessage={errors.zipCode}
                            />
                        </div>
                    </fieldset>
                    <Dropdown
                        id="department-dropdown"
                        label="Department"
                        data={departments}
                        placeholder="Select a Department"
                        onSelected={(selected) => handleInputChange("department", selected)}
                        errorMessage={errors.department}
                    />
                    <div className="save-container">
                        <button className="save-button" type="submit">Save</button>
                    </div>
                    <Modal
                        isOpen={openModal}
                        openClose={() => setOpenModal(!openModal)}
                        content={"Employee created successfully!"}
                    />
                </form>
            </div>
        </>
    );
}


Home.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    startDate: PropTypes.instanceOf(Date),
    department: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
};
