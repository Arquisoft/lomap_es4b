import {MarkerComponent} from './MarkerComponent';
import React, { useState, useEffect } from 'react';
import {getAllPoints} from '../../helper/PodHelper';
import "./MarkerList.css"

export function MarkersList(props) {

    const {session,webId} = props;
    const [points, setPoints] = useState([]);

    useEffect(() => {
      const fetchPoints = async() => {
        const result = await getAllPoints(session, webId);
        setPoints(result);
      }
      fetchPoints();
    }, []);

    return (
      <div className='sideList'>
        {
        points.map((item) => (
          <MarkerComponent key={item.id} name={item.name} description={item.comment}
                           lat={item.latitude} lon={item.longitude} />
        ))

      }
      </div>
    );
  }

  export default MarkersList;