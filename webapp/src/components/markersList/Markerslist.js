
import {MarkerComponent} from './MarkerComponent';
import {getAllPoints} from '../../helper/PodHelper';

export function MarkersList(props) {

    const {session,webId} = props;


    const items = [
    ];
/* 
    getAllPoints(session,webId)
        .then((points) => 
        {
            puntos = points;
        }) */

    return (
      <div>
        {

        items.map((item) => (
            <MarkerComponent key={item.id} name={item.name} description={item.description} />
        ))
        
       /*  getAllPoints(session,webId)
        .then((points) => 
        {
            points.map((item) => (
                <MarkerComponent key={item.id} name={item.name} description={item.comment} />
              ))
        }) */

        }
      </div>
    );
  }

  export default MarkersList;
