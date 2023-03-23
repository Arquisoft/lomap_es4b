import {MarkerComponent} from './MarkerComponent';
import React, { useState, useEffect } from 'react';
import {getAllPoints} from '../../helper/PodHelper';

export async function MarkersList(props) {

    const {session,webId} = props;
    const [points, setPoints] = useState([]);

    useEffect(() => {
      function fetchPoints() {
        const result = getAllPoints(session, webId);
        setPoints(result);
      }
      fetchPoints();
    }, []);

    return (
      <div>
        {
        // await getAllPoints(session,webId)
        // .then((points) => 
        // {
        //     points.map((item) => (
        //         <MarkerComponent key={item.id} name={item.name} description={item.comment} />
        //       ))
        // })

        points.map((item) => (
          <MarkerComponent key={item.id} name={item.name} description={item.comment} />
        ))

      }
      </div>
    );
  }

  export default MarkersList;