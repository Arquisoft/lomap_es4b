import {getSpecificPoint} from "../../helper/PodHelper";
import ReactDOM from "react-dom";
import EditPointForm from "./EditPointForm";
import L from "leaflet";
import React from "react";
import AddPointForm from "./AddPointForm";

export default function EditPoint (pointId, marker, map, webId, session) {
    getSpecificPoint(session, webId, pointId).then(
        (point) => {
            let formDiv = document.createElement('div');
            console.log(point);
            ReactDOM.render(
                <EditPointForm name={point.name} comment={point.comment} category={point.category} pointId={pointId} latLng={marker.getLatLng()} webId={webId} session={session}/>,
                formDiv
            );
            console.log(map);
            let popup = L.popup()
                .setLatLng(marker.getLatLng())
                .setContent(formDiv)
                .openOn(map);
        }
    );


}