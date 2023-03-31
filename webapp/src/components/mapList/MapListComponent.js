import imagen from '../../images/default-icon.png';
import {getAllPointsInCurrentMap} from "../../helper/PodHelper";

export function MapListComponent(props) {

    const { webId,session} = props;

    const handleClick = () => {
        getAllPointsInCurrentMap(session,webId).then((points)=>{
            console.log(points);
            props.showMapPoints(points);
        });
    };

    return (
      <div className="sideComponent">
        {/* <div className="componentInfo"> */}
        <header className='pointHeader'>
          <p className='name'>{props.name} </p>
        </header>
        <div className="descriptionAndImage">
            <img src={imagen} alt="Imagen del mapa"/>
            <p>{props.description}</p>
          </div>
          <div className="showPointsButton">
              <button onClick={handleClick}>Cargar Mapa</button>
          </div>
        {/* </div> */}
      </div>
    );
  }

export default MapListComponent;