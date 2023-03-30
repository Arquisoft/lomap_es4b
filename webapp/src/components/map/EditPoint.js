import {getSpecificPoint} from "../../helper/PodHelper";
import ReactDOM from "react-dom";
import EditPointForm from "./EditPointForm";
import L from "leaflet";
import React from "react";

export default function EditPoint (pointId, marker, map, webId, session) {
    getSpecificPoint(session, webId, pointId).then(
        (point) => {
            let formDiv = document.createElement('div');
            let popup = L.popup();
            ReactDOM.render(
                <EditPointForm name={point.name} description={point.description} category={point.category} pointId={pointId} latLng={marker.getLatLng()} map={map} popup={popup} webId={webId} session={session}/>,
                formDiv
            );
                popup.setLatLng(marker.getLatLng())
                .setContent(formDiv)
                .openOn(map);
        }
    );


}