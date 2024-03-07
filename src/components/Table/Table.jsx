import React from "react";
import { useSelector } from "react-redux"

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
// import employeesData from '../../data/employeesData.json';

/**
 * Composant Form pour afficher une liste d'employés
 * @returns {JSX.Element} - L'élément Form.
 */
export default function Form() {
    //Accès aux employés via Redux
    const employees = useSelector((state) => state.employee.employees); 
    // console.log(employees);

    // Définition des colonnes pour DataTable
    const columns = [
        { name: "First Name", selector: (row) => row.firstName, sortable: true },
        { name: "Last Name", selector: (row) => row.lastName, sortable: true },
        { name: "Start Date", selector: (row) => row.startDate, sortable: true },
        { name: "Department", selector: (row) => row.department, sortable: true },
        { name: "Date of Birth", selector: (row) => row.dateOfBirth, sortable: true },
        { name: "Street", selector: (row) => row.street, sortable: true },
        { name: "City", selector: (row) => row.city, sortable: true },
        { name: "State", selector: (row) => row.state, sortable: true },
        { name: "Zip Code", selector: (row) => row.zipCode, sortable: true },
    ];


    return (
        <>
            <div className="container-list">
                <h1 className="title">Current Employees</h1>
                <div className="list-wrapper">
                    <DataTableExtensions
                        columns={columns}
                        data={employees}
                        print={false}
                        export={false}
                        filterPlaceholder="Search"
                    >
                        <DataTable
                            title="Parameter List"
                            noHeader
                            pagination
                            highlightOnHover
                        />
                    </DataTableExtensions>
                </div>
            </div>
        </>
    );
}
