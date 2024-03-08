import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Composant représentant le header de l'applicatiobn
 * @returns {JSX.Element} Composant JSX retourné
 */
export default function Header() {
    return (
        <div className="header-container">
            <div className="header-wrap">
                <h2>
                    <NavLink to="/" className="logo-title">
                        HRnet
                    </NavLink>
                </h2>
                <div className="nav-right">
                        <NavLink to="/" className="header-link">Add New Employee</NavLink>
                        <NavLink to="/employees" className="header-link">View Current Employees</NavLink>
                </div>
            </div>
        </div>
    );
}