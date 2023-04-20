import AddMarker from "../mapView/AddMarker";
import {updatePoints} from "../../../helper/PodHelper";

function CreatePoint (position, map, mapId, markers, name,description, category, webId, session) {

    updatePoints(mapId, position.lat,position.lng,name,description,category,session,webId).then((id) => {
        console.log(id);
        AddMarker(position, map, mapId, id, category, markers, webId, session, true);
    });
}

export default CreatePoint;