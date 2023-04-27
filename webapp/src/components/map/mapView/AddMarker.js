import React from "react";
import ReactDOM from "react-dom";

import L from "leaflet";
import Icon from "../iconLocation/IconLocation";
import PointInfo from "../../pointInfo/PointInfo";

// Crea un marcador, le asocia un popup con el contenido del componente InfoAndComments y lo asocia al mapa
function AddMarker (position, map, mapId, pointId, markerIcon, markers, webId, session, isOwner) {
    const IconLocation = Icon(markerIcon);
    const marker = L.marker(position, {icon: IconLocation, riseOnHover:true});
    marker.addTo(map);
    markers.push(marker);
    marker.on('click', function() {
        let myDiv = document.createElement('div');
        ReactDOM.render(
            <PointInfo pointId={pointId} marker={marker} map={map} mapId={mapId} webId={webId} session={session} isOwner={isOwner}/>,
            myDiv
        );
        let popup = L.popup({minWidth:750, maxWidth:550, maxHeight:800, keepInView:true});
        popup.setContent(myDiv);
        marker.unbindPopup();
        marker.bindPopup(popup).openPopup();
    })
}

export default AddMarker