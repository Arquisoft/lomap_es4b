import {deletePoints} from '../../helper/PodHelper'

export default function DeletePoint(pointId, marker, map, session, webId){
    if (window.confirm("Estás seguro de que deseas borrar el punto?"))
        deletePoints(session, webId, pointId,1).then(
            map.removeLayer(marker)
        );
}