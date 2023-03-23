import {React, Component} from "react";
import ReactDOM, { render } from "react-dom";

import {Marker, Popup} from 'react-leaflet'
import {IconLocation} from "./IconLocation";
import L from "leaflet";
import InfoAndComments from "../Comments/InfoAndComments";
import {useMap} from "react-leaflet";

const markerPosition = ['43.3665913', '-5.8439451']

function AddMarker (position, map) {
    console.log(map);
    const marker = L.marker(position, {icon: IconLocation, riseOnHover:true});
    // guardar el id de los puntos con este atributo?? (lo he creado yo, no es uno predefinido)
    marker.pointId = 1;
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