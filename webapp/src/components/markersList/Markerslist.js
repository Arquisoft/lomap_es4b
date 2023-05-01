import {MarkerComponent} from './MarkerComponent';
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
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
      <ScrollArea.Root className="ScrollAreaRootLocations">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div className='sideListLocations' id='pointsList' data-testid={"sideListLocations"}>
            {
              points.map((item) => (
                <MarkerComponent centerMap={(position, pointId) => props.centerMap(position, pointId)} pointId={item.id} key={item.id} name={item.name} category={item.category}
                description={item.description}  lat={item.latitude} lon={item.longitude} />
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

  export default MarkersList;