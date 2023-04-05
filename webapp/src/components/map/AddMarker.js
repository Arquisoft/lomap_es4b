import React from "react";
import ReactDOM from "react-dom";

import L from "leaflet";
import Icon from "./IconLocation";
import PointInfo from "../pointInfo/PointInfo";

// Crea un marcador, le asocia un popup con el contenido del componente InfoAndComments y lo asocia al mapa
function AddMarker (position, map, pointId, markerIcon, markers, webId, session, isOwner) {
    const IconLocation = Icon(markerIcon);
    const marker = L.marker(position, {icon: IconLocation, riseOnHover:true});
    marker.addTo(map);
    markers.push(marker);
    marker.on('click', function() {
        /*getSpecificPoint(session, webId, pointId).then((point) => {
            let myDiv = document.createElement('div');
            ReactDOM.render(
                //<InfoAndComments point={point} marker={marker} map={map} webId={webId} session={session} isOwner={isOwner}/>,
                <PointInfo point={point} marker={marker} map={map} webId={webId} session={session} isOwner={isOwner}/>,
                myDiv
            );
            marker.bindPopup(myDiv).openPopup();
        });*/
        let myDiv = document.createElement('div');
        ReactDOM.render(
            //<InfoAndComments point={point} marker={marker} map={map} webId={webId} session={session} isOwner={isOwner}/>,
            <PointInfo pointId={pointId} marker={marker} map={map} webId={webId} session={session} isOwner={isOwner}/>,
            myDiv
        );
        let popup = L.popup({minWidth:750, maxWidth:550, maxHeight:800});
        popup.setContent(myDiv);
        marker.unbindPopup();
        marker.bindPopup(popup).openPopup();
    })
}




export default AddMarker