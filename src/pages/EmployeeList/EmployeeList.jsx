import React from "react";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";


/**
 * Composant EmployeeList pour afficher la page de la liste des employés
 * @returns {JSX.Element} - La page EmployeeList
 */
export default function EmployeeList() {

    return (
        <>
            <Header />
            <Table />
        </>
    );
}
