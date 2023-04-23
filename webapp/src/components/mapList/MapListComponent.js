import imagen from '../../images/default-icon.png';
import {getAllPointsInCurrentMap} from "../../helper/PodMaps";
import { useState} from "react";
import {ListLoadingItem} from '../loadingComponents/ListLoadingItem';

export function MapListComponent(props) {

    const {mapId, setCurrentMapId, webId, session} = props;
    const [mapLoading, setMapLoading] = useState(false);
    const handleClick = () => {
        setMapLoading(true);
        getAllPointsInCurrentMap(session,webId,mapId).then((points)=>{
            props.showMapPoints(points, webId, mapId);
            setCurrentMapId(mapId);
            setMapLoading(false);
        });
    };

    return (
      <div className="sideComponentMap">
        {/* <div className="componentInfo"> */}
        <header className='pointHeaderMap'>
          <p className='nameMap'>{props.name} </p>
        </header>
        <div className="descriptionAndImageMap">
            <img src={imagen} alt="Imagen del mapa" data-testid={"Imagen"}/>
            <p>{props.description}</p>
          </div>
          <div className="showPointsButton">
              <button onClick={handleClick}>
                  {mapLoading && <ListLoadingItem/>}
                  {mapLoading ? <span>Cargando</span> : <span>Cargar Mapa</span>}
              </button>
          </div>
        {/* </div> */}
      </div>
    );
  }

export default MapListComponent;