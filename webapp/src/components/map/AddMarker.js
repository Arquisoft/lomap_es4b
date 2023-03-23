import React from "react";
import ReactDOM from "react-dom";

import {IconLocation} from "./IconLocation";
import L from "leaflet";
import InfoAndComments from "../Comments/InfoAndComments";

// Crea un marcador, le asocia un popup con el contenido del componente InfoAndComments y lo asocia al mapa
function AddMarker (position, map, markerId) {
    const marker = L.marker(position, {icon: IconLocation, riseOnHover:true});
    // guardar el id de los puntos con este atributo?? (lo he creado yo, no es uno predefinido)
    marker.pointId = markerId;
    console.log('id del marcador: ' + marker.pointId);
    let myDiv = document.createElement('div');
    ReactDOM.render(
        <InfoAndComments/>,
        myDiv
    );
    marker.bindPopup(myDiv).openPopup();
    marker.addTo(map);
}




export default AddMarker