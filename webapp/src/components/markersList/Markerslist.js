
import {MarkerComponent} from './MarkerComponent';
import {getAllPoints} from '../../helper/PodHelper';

export function MarkersList(props) {

    const {session,webId} = props;

    const puntos = () =>
    {
        
    };

    return (
      <div>
        {
        
        getAllPoints(session,webId)
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
