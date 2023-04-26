import React, { useState, useEffect } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import './LoadedMapInfo.css';
import {getMap} from "../../../helper/PodMaps"
import {LoadingMapInfo} from "../../loadingComponents/LoadingMapInfo";

const LoadedMapInfo = (props) => {
  const [mapInfo, setMapInfo] = useState(undefined)
  const [loadingInfo, setLoadingInfo] = useState(false);
  const{session} = useSession();

  useEffect(() => {
    const fetchMap = async() => {
      
      setLoadingInfo(true);
      text = <p>Cargando</p>
      setMapInfo(await getMap(props.mapId, props.webId, session));
      setLoadingInfo(false);
    }
    fetchMap();
  }, [props.mapId, props.webId, session]);

  let text;
  if(mapInfo === undefined){
    text = <p>Ningún mapa cargado</p>
  }else{
    text = <p>{mapInfo.name + " de " + mapInfo.author}</p>
  }

  return (
    <div className="loadedMapInfo">
      {loadingInfo && <LoadingMapInfo/>}
      {mapInfo==undefined &&  <p>Cargando</p>}
      {mapInfo!=undefined && !loadingInfo && <p>{mapInfo.name + " de " + mapInfo.author}</p>}
      {mapInfo!=undefined && loadingInfo && <p>Cargando</p>}
    </div>
  );
}

export default LoadedMapInfo;
