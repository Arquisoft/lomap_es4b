import {MarkerComponent} from './MarkerComponent';
import { useState, useEffect } from 'react';
import {getAllPointsInCurrentMap} from '../../helper/PodMaps';
import { useSession } from "@inrupt/solid-ui-react";
import "./markerslist.css"

export function MarkersList(props) {

    const {mapId, webId, setPointsLoading} = props;
    const [points, setPoints] = useState([]);
    const {session} = useSession();

    useEffect(() => {
      const fetchPoints = async() => {
          setPointsLoading(true);
          const result = await getAllPointsInCurrentMap(session, webId, mapId);
          setPoints(result);
          setPointsLoading(false);
      }
      fetchPoints();
    }, [props.mapId, props.webId, session]);

    return (
        <div className='markersListComponent'>
          <div className='sideListLocations' id='pointsList' data-testid={"sideListLocations"}>
            {
              points.map((item) => (
                <MarkerComponent centerMap={(position) => props.centerMap(position)} key={item.id} name={item.name} category={item.category}
                description={item.description}  lat={item.latitude} lon={item.longitude} />
              ))

            }
          </div>
        </div>
    );
  }

  export default MarkersList;