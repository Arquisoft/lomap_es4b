import React from "react";
import ReactDOM from "react-dom";

import L from "leaflet";
import InfoAndComments from "../Comments/InfoAndComments";
import {getSpecificPoint} from "../../helper/PodHelper";
import Icon from "./IconLocation";

// Crea un marcador, le asocia un popup con el contenido del componente InfoAndComments y lo asocia al mapa
function AddMarker (position, map, pointId, markerIcon, markers, webId, session, isOwner) {
    const IconLocation = Icon(markerIcon);
    const marker = L.marker(position, {icon: IconLocation, riseOnHover:true});
    marker.addTo(map);
    markers.push(marker);
    marker.on('click', function() {
        getSpecificPoint(session, webId, pointId).then((point) => {
            let myDiv = document.createElement('div');
            ReactDOM.render(
                <InfoAndComments point={point} marker={marker} map={map} webId={webId} session={session} isOwner={isOwner}/>,
                myDiv
            );
            marker.bindPopup(myDiv).openPopup();
        });
    })
}




export default AddMarker