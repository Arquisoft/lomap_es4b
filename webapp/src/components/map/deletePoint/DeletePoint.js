import {deletePoints} from '../../../helper/PodHelper'

export default function DeletePoint(pointId, marker, map, mapId, session, webId){
        deletePoints(session, webId, pointId,mapId).then(
            map.removeLayer(marker)
        );
}