import * as solid from '@inrupt/solid-client';
import {Point} from "../entities/Entities";
import {ownAclPermission, friendsAclPermission} from './PodFriends';
import {updateData, createPointsFile, createData} from './PodFiles';
import {getNameFromPod,randomId,urlCreator} from "./PodHelper";


//Devolverá todos los puntos dentro del Pod
export async function getAllPointsInCurrentMap(session,webId,mapId){

  
    let url = urlCreator(webId);
  
    try {
  
      let file = await solid.getFile(
          url,
          { fetch: session.fetch }
      );
  
      let mapsString = await file.text();
      var jsonMaps = JSON.parse(mapsString);
      const mapPoints = jsonMaps.maps.find(map => map.id == mapId).locations;
  
      var points = [];
  
      for(var i in mapPoints) {
        let p = new Point(mapPoints[i].id,mapPoints[i].author,mapPoints[i].latitude,
          mapPoints[i].longitude, mapPoints[i].name, mapPoints[i].description, mapPoints[i].category,
          mapPoints[i].comments, mapPoints[i].reviewScores);
        points.push(p);
      }
  
      return points;
  
    } catch (error) {
      console.log("Error: No existe el fichero, por favor añada un punto al mapa");
      return [];
    }
  
  }




  //Método que devuelve una lista con los mapas del pod
export async function getAllMaps(session, webId){

    let url = urlCreator(webId);
  
    try {
      let file = await solid.getFile(
        url,
        { fetch: session.fetch }
  
      );
  
      let mapsString = await file.text();
      var jsonMaps = JSON.parse(mapsString);
  
      var maps = jsonMaps.maps;
  
      return maps;
  
  
    } catch (error) {
      console.log(error);
      return [];
    }
  }


  //Actualiza los datos del JSON introduciéndo un nuevo mapa
export async function addMap(name,session,webId){

    let url = urlCreator(webId);
    let urlContainer = url.replace("private/puntoPrueba3Mapa.json","");
    urlContainer=urlContainer+"private/";
  
    try {
      let solidFile = await solid.getFile(
          url,
          { fetch: session.fetch }
      );
  
      let author = await getNameFromPod(webId);
  
      let mapId = randomId(20);
  
      var newMap = {
        id:mapId,
        name:name,
        author:author,
        locations:[]
      }
  
      let mapsString = await solidFile.text();
      var jsonMaps = JSON.parse(mapsString);
  
      jsonMaps.maps.push(newMap);
  
      const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
        type: "application/json",
      });
  
      var fichero = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });
  
      await updateData(fichero, webId, session)
  
      return mapId;
  
    } catch (error) {
      const file = await createPointsFile(webId);
      await createData(urlContainer, file, session);
      await ownAclPermission(webId,session);
      await friendsAclPermission(webId,session);
      return addMap(name,session,webId);
    }
  
  }