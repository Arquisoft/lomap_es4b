import { VCARD, FOAF } from "@inrupt/lit-generated-vocab-common";
import AddMarker from "./AddMarker";
import {updatePoints} from "../../helper/PodHelper";

function CreatePoint (position, map, markerId,name,comment, category, webId, session) {
    console.log(position);
    let id = updatePoints(position.lat,position.lng,name,comment,category,session,webId);
    AddMarker(position, map, id);
}

export default CreatePoint;