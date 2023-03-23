import {MarkerComponent} from './MarkerComponent';
import { useState } from "react";
import {getAllPoints} from '../../helper/PodHelper';

export async function MarkersList(props) {

    const {session,webId} = props;


    const points = [
    ];
 


    return (
      <div>
        {
        await getAllPoints(session,webId)
        .then((points) => 
        {
            points.map((item) => (
                <MarkerComponent key={item.id} name={item.name} description={item.comment} />
              ))
        })

        }
      </div>
    );
  }

  export default MarkersList;