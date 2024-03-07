import React from "react";
import { Link } from "react-router-dom";

/**
 * Composant Error pour afficher la page d'erreur
 * @returns {JSX.Element} - Composant JSX retourné
 */
export default function Error() {

    return (
        <>
            <div className="div-404">
                <h2 className="title-404">404</h2>
                <p className="text-404">Cette page n&apos;existe pas !</p>
                <Link className="link-404" to="/">
                    <p>Retourner sur la page d&apos;accueil</p>
                </Link>
            </div>
        </>
    );
}
