import {deletePoints} from '../../helper/PodHelper'

export default function DeletePoint(pointId, marker, map, session, webId){
    deletePoints(session, webId, pointId).then(
        map.removeLayer(marker)
    );
}