import {MapListComponent} from './MapListComponent';
import { useState, useEffect } from 'react';
import {getAllMaps} from '../../helper/PodMaps';
import "./MapList.css"

export function MapList(props) {

    const {session, webId, setMapsLoading} = props;
    const [maps, setMaps] = useState([]);

    useEffect(() => {
      const fetchMaps = async() => {
          setMapsLoading(true);
          const result = await getAllMaps(session, webId);
          setMaps(result);
          setMapsLoading(false);
      }
      fetchMaps();
    }, []);

    return (
      <div className='mapListComponent'>
          <div className='sideListMaps' id='pointsList'>
            {
              maps.map((item) => (
                <MapListComponent key={item.id} showMapPoints={(points, webId, mapId) => {props.showMapPoints(points, webId, mapId)}} mapId={item.id}
                  setCurrentMapId={props.setCurrentMapId} name={item.name} session={session} webId={webId}/>
              ))

            }
          </div>
      </div>
    );
  }

  export default MapList;