import imagen from '../../images/default-icon.png';
import {getAllPointsInCurrentMap} from "../../helper/PodMaps";

export function MapListComponent(props) {

    const { webId,session,mapId} = props;
    const handleClick = () => {
        getAllPointsInCurrentMap(session,webId,mapId).then((points)=>{
            props.showMapPoints(points, webId, mapId);
        });
    };

    return (
      <div className="sideComponentMap">
        {/* <div className="componentInfo"> */}
        <header className='pointHeaderMap'>
          <p className='nameMap'>{props.name} </p>
        </header>
        <div className="descriptionAndImageMap">
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