import {MarkerComponent} from './MarkerComponent';
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {getAllPointsInCurrentMap} from '../../helper/PodHelper';
import "./markerslist.css"

export function MarkersList(props) {

    const {session,webId} = props;
    const [points, setPoints] = useState([]);
    // 

    useEffect(() => {
      const fetchPoints = async() => {
        const result = await getAllPointsInCurrentMap(session, webId);
        setPoints(result);
      }
      fetchPoints();
    }, []);

    return (
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div className='sideList' id='pointsList'>
            {
              points.map((item) => (
                <MarkerComponent centerMap={(position) => props.centerMap(position)} key={item.id} name={item.name} category={item.category}
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