
import {getAllCoordinates} from "./PodHelper";

var points = [];

export async function savePoints(session,webId){
    let promiseValue = await getAllCoordinates(session,webId);
    points = promiseValue.slice();
    return points;
}

export function getPointsSaved(){
    return points;
}