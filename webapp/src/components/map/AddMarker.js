import React from "react";
import ReactDOM from "react-dom";

import L from "leaflet";
import InfoAndComments from "../Comments/InfoAndComments";
import {getSpecificPoint} from "../../helper/PodHelper";

// Crea un marcador, le asocia un popup con el contenido del componente InfoAndComments y lo asocia al mapa
function AddMarker (position, map, pointId, markerIcon, webId, session) {
    const IconLocation = L.icon({
        iconUrl: require('../../images/' + markerIcon + '.png'),
        iconRetinaUrl: require('../../images/blue-marker.png'),
        iconAnchor:null,
        shadowUrl:null,
        shadowSize:null,
        shadowAnchor:null,
        iconSize: [35,35],
        className:"leaflet-venue-icon",
    });
    const marker = L.marker(position, {icon: IconLocation, riseOnHover:true});
    // guardar el id de los puntos con este atributo?? (lo he creado yo, no es uno predefinido)
    marker.pointId = pointId;
    getSpecificPoint(session, webId, pointId).then((point) => {
        let myDiv = document.createElement('div');
        ReactDOM.render(
            <InfoAndComments username={point.author} pointId={pointId} marker={marker} map={map} webId={webId} session={session} />,
            myDiv
        );
        marker.bindPopup(myDiv).openPopup();
        marker.addTo(map);
    });

}




export default AddMarker