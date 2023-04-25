import React from 'react';
import './About.css';
//import Popup from "reactjs-popup";
//import 'reactjs-popup/dist/index.css';
import Popup from './Popup'

export default function About (props) {
    console.log('entro');

    const togglePopup = () => {
       props.setMarcadorAboutSeleccionado(false);
    }

    const content = () => {
        return (
        <>
            <h1>Quienes somos</h1>
            <p>LoMap es una aplicación para crear tus propios mapas y lugares, y compartirlos con tus amigos. </p>
            <p>En esta aplicación nos tomamos muy en serio la privacidad del cliente, y es por ello que guardamos la informacion de manera descentralizada. Para ello hacemos uso de los pods de solid, y serán los usuarios los que decidan quien tiene permiso para ver sus datos.</p>
            <h2>Informacion de contacto</h2>
            <ul>
                <li>Javier Garcia Gonzalez (uo276723@uniovi.es)</li>
                <li>Aaron Orozco Fernandez (uo281997@uniovi.es)</li>
                <li>Daniel Suarez de la Roza (uo276467@uniovi.es)</li>
                <li>Juan Gomez Tejeda (uo281835@uniovi.es)</li>
            </ul>
        </>
        )
    }

    return (
        <div className="aboutContainer" data-testid={"contenedorAbout"}>
            {props.marcadorAboutSeleccionado && <Popup
                content={content()}
                handleClose={togglePopup}
            />}
        </div>
    )
}