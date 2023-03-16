
import {getAllPoints} from "./PodHelper";

var points = [];

export async function savePoints(session,webId){
    let promiseValue = await getAllPoints(session,webId);
    points = promiseValue.slice();
    return points;
}

export function getPointsSaved(){
    return points;
}