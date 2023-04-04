import * as solid from '@inrupt/solid-client';
import {Point} from "../entities/Entities";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {ownAclPermission, friendsAclPermission} from './PodFriends';
import {updateData, createPointsFile, createData} from './PodFiles';


/**
 * ----------------------------------------------------------------------------------------------------
 * Funciones directas a los puntos
 * ----------------------------------------------------------------------------------------------------
 */



//Borrará del pod el punto cuya id se pasa por parámetro
export async function deletePoints(session, webId, pointId){

  let mapId = "1";

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let mapsString = await file.text();
    var jsonMaps = JSON.parse(mapsString);
    var map = jsonMaps.maps.find(map => map.id == mapId);

    const pointIndex = map.locations.findIndex(p => p.id === pointId);

    map.locations.splice(pointIndex, 1);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });

    await updateData(fichero, webId, session);


  } catch (error) {
    console.log(error);
  }
}

//Devuelve un array con la lista de puntos filtrados
export async function filterPoints(session, webId, categories){

  let mapId = "1";

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let mapsString = await file.text();
    var jsonMaps = JSON.parse(mapsString);
    const mapPoints = jsonMaps.maps.find(map => map.id == mapId).locations;

    var result = mapPoints.filter(item => categories.includes(item.category));

    return result;

  } catch (error) {
    console.log(error);
  }
}

//Actualiza los datos del JSON introduciéndo un nuevo punto
export async function updatePoints(mapId,latitude,longitude,name,description,category,session,webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";

  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let solidFile = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let author = await getNameFromPod(webId);

    let idPunto = randomId(20);

    var newPoint = {
      id:idPunto,
      name:name,
      author:author,
      latitude:latitude,
      longitude:longitude,
      description:description,
      category:category,
      comments:[],
      reviewScores:[]
    }

    let mapsString = await solidFile.text();
    var jsonMaps = JSON.parse(mapsString);
    const map = jsonMaps.maps.find(map => map.id == mapId);

    map.locations.push(newPoint);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });

    await updateData(fichero, webId, session)

    return idPunto;

  } catch (error) {

    const file = await createPointsFile(webId);
    await createData(urlContainer, file, session);
    await ownAclPermission(webId,session);
    await friendsAclPermission(webId,session);
    return updatePoints(mapId,latitude,longitude,name,description,category,session,webId);
  }

}



//Devolverá todos los puntos dentro del Pod
export async function getAllPointsInCurrentMap(session,webId){

  let mapId = "1";

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

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


//Método que devuelve el punto específico del pod
export async function getSpecificPoint(session, webId,pointId){

  let mapId = "1";

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let mapsString = await file.text();
    var jsonMaps = JSON.parse(mapsString);
    const mapPoints = jsonMaps.maps.find(map => map.id == mapId).locations;  

    var point = mapPoints.find(item => item.id == pointId);

    if(point === undefined){
      console.log("Error: No existe el punto del pod");
    }else{
      let specificPoint = new Point(point.id, point.author, point.latitude, point.longitude, point.name, 
        point.description, point.category, point.comments, point.reviewScores);
      return specificPoint;
    }

  } catch (error) {
    console.log(error);
  }
}


//Editará el punto del que se pasa la id como parámetro
export async function editPoint(pointId,latitude,longitude,name,description,category,session,webId){

  let mapId = "1";

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {

    let file = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let mapsString = await file.text();
    var jsonMaps = JSON.parse(mapsString);
    const mapPoints = jsonMaps.maps.find(map => map.id == mapId).locations;
    const point = mapPoints.find(point => point.id == pointId);
    mapPoints.map(point => {
      if(point.id == pointId){
        point.latitude = latitude;
        point.longitude = longitude;
        point.name = name;
        point.description = description;
        point.category = category;
      }
    })

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });

    await updateData(fichero, webId, session);


  } catch (error) {
    console.log(error);
  }

}

//Método que devuelve una lista con los mapas del pod
export async function getAllMaps(session, webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

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

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";

  url = url+"private/puntoPrueba3Mapa.json";

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

//Añade un comentario a un punto
export async function addComment(mapId,pointId,comment,session,webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";

  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let solidFile = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let author = await getNameFromPod(webId);

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    var newComment = {
      author:author,
      comment:comment,
      date: formattedDate
    }

    let mapsString = await solidFile.text();
    var jsonMaps = JSON.parse(mapsString);
    const map = jsonMaps.maps.find(map => map.id == mapId);
    const point = map.locations.find(point => point.id == pointId);

    point.comments.push(newComment);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });

    await updateData(fichero, webId, session);
    return newComment;

  } catch (error) {
    console.log(error);
  }

}

//Añade un comentario a un punto
export async function addScore(mapId,pointId,score,session,webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";

  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let solidFile = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let author = await getNameFromPod(webId);

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    var newScore = {
      author:author,
      score:score,
      date: formattedDate
    }

    let mapsString = await solidFile.text();
    var jsonMaps = JSON.parse(mapsString);
    const map = jsonMaps.maps.find(map => map.id == mapId);
    const point = map.locations.find(point => point.id == pointId);

    point.reviewScores.push(newScore);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });

    await updateData(fichero, webId, session);

  } catch (error) {
    console.log(error);
  }
  return newScore;
}


/**
 * ----------------------------------------------------------------------------------------------------
 * Funciones varias de ayuda
 * ----------------------------------------------------------------------------------------------------
 */


//Devuelve la información del perfil
export async function getProfile(webId){ 
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let myDataset = await solid.getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  return solid.getThing(myDataset, webId); // we obtain the thing we are looking for from the dataset
}


//Devuelve el nombre del usuario logeado
export async function getNameFromPod(webId) {
  if (webId === "" || webId === undefined) return "Name not found"; // we return the empty string
  let name = solid.getStringNoLocale(await getProfile(webId), FOAF.name);
  return name !== null ? name : "No name :(";
}


export async function getImageFromPod(webId) {
  if (webId === "" || webId === undefined) return "Name not found"; // we return the empty string
  let image = solid.getUrl(await getProfile(webId), VCARD.hasPhoto.iri.value);
  return image !== null ? image : "NoImage";
}

//Función que devuelve una id random para poder distinguir los puntos
export const randomId = function(length) {
  return (Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)).substring(0, length);
};


//Imprime el contenido del archivo
export async function printContents(file) {
  var reader = new FileReader();
  reader.onload = function(event) {
    console.log(event.target.result);
  }
  reader.readAsText(file);
}


