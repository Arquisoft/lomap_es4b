import AddMarker from "./AddMarker";
import {updatePoints} from "../../helper/PodHelper";

function CreatePoint (position, map,name,comment, category, webId, session) {

    updatePoints(position.lat,position.lng,name,comment,category,session,webId).then((id) => {
        console.log(id);
        AddMarker(position, map, id, webId, session);
    });
}

export default CreatePoint;