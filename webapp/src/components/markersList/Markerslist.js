import {MarkerComponent} from './MarkerComponent';
import React, { useState, useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {getAllPoints} from '../../helper/PodHelper';
import "./markerslist.css"

export function MarkersList(props) {

    const {session,webId} = props;
    const [points, setPoints] = useState([]);
    //

    useEffect(() => {
      const fetchPoints = async() => {
        const result = await getAllPoints(session, webId);
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
                <MarkerComponent key={item.id} name={item.name} category={item.category}
                description={item.comment}  lat={item.latitude} lon={item.longitude} />
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

  // const getData = async () => {
  //   const response = await fetch('https://api.example.com/data');
  //   const data = await response.json();
  //   return data;
  // }
  
  // const filterData = async () => {
  //   const dataArray = await getData();
  //   const filteredArray = dataArray.filter(item => item.category === 'fruit');
  //   return filteredArray;
  // }
  
  // const fruitsArray = await filterData();
  // console.log(fruitsArray);