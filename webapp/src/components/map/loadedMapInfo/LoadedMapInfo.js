import React, { useState, useEffect } from 'react';
import './LoadedMapInfo.css';
import {getMap} from "../../../helper/PodMaps"

const LoadedMapInfo = (props) => {
  const [mapInfo, setMapInfo] = useState(undefined)

  useEffect(() => {
    const fetchMap = async() => {
      setMapInfo(await getMap(props.mapId, props.webId, props.session));
    }
    fetchMap();
  }, [props.mapId, props.webId, props.session]);

  let text;
  if(mapInfo === undefined){
    text = <p>Ningún mapa cargado</p>
  }else{
    text = <p>{mapInfo.name + " de " + mapInfo.author}</p>
  }

  return (
    <div className="loadedMapInfo">
      {text}
    </div>
  );
}

export default LoadedMapInfo;
