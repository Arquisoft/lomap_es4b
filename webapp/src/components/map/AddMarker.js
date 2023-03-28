import React from "react";
import ReactDOM from "react-dom";

import {IconLocation} from "./IconLocation";
import L from "leaflet";
import InfoAndComments from "../Comments/InfoAndComments";
import {getSpecificPoint} from "../../helper/PodHelper";

// Crea un marcador, le asocia un popup con el contenido del componente InfoAndComments y lo asocia al mapa
function AddMarker (position, map, pointId, webId, session) {
    const marker = L.marker(position, {icon: IconLocation, riseOnHover:true});
    // guardar el id de los puntos con este atributo?? (lo he creado yo, no es uno predefinido)
    marker.pointId = pointId;
    console.log(pointId);
    getSpecificPoint(session, webId, pointId).then((point) => {
        console.log(point);
        console.log('id del marcador: ' + marker.pointId);
        console.log(point.autor);
        let myDiv = document.createElement('div');
        ReactDOM.render(
            <InfoAndComments username={point.autor} pointId={pointId} marker={marker} map={map} webId={webId} session={session} />,
            myDiv
        );
        marker.bindPopup(myDiv).openPopup();
        marker.addTo(map);
    });

}




export default AddMarker