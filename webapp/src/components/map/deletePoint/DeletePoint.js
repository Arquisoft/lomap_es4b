import {deletePoints} from '../../../helper/PodHelper'

export default function DeletePoint(pointId, marker, map, mapId, session, webId){
    if (window.confirm("Estás seguro de que deseas borrar el punto?"))
        deletePoints(session, webId, pointId,mapId).then(
            map.removeLayer(marker)
        );
}