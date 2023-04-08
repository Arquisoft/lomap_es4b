import {MapListComponent} from './MapListComponent';
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {getAllMaps} from '../../helper/PodMaps';
import "./MapList.css"

export function MapList(props) {

    const {session,webId} = props;
    const [maps, setMaps] = useState([]);

    useEffect(() => {
      const fetchMaps = async() => {
        const result = await getAllMaps(session, webId);
        setMaps(result);
      }
      fetchMaps();
    }, []);

    return (
      <ScrollArea.Root className="ScrollAreaRootMaps">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div className='sideListMaps' id='pointsList'>
            {
              maps.map((item) => (
                <MapListComponent showMapPoints={(points, webId, mapId) => {props.showMapPoints(points, webId, mapId)}} mapId={item.id} name={item.name} description={item.description} session={session} webId={webId}/>
              ))

            }
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    );
  }

  export default MapList;