import * as solid from '@inrupt/solid-client';
import {Point} from "../entities/Entities";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import {updateData} from './PodFiles';
import { useSession } from '@inrupt/solid-ui-react';


/**
 * ----------------------------------------------------------------------------------------------------
 * Funciones directas a los puntos
 * ----------------------------------------------------------------------------------------------------
 */
 

//Borrará del pod el punto cuya id se pasa por parámetro
export async function deletePoints(session, webId, pointId,mapId){

  let url = urlCreator(webId);

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let mapsString = await file.text();
    var jsonMaps = JSON.parse(mapsString);
    var map = jsonMaps.maps.find(map => map.id === mapId);

    const pointIndex = map.locations.findIndex(p => p.id === pointId);

    map.locations.splice(pointIndex, 1);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "locations.json", { type: blob.type });

    await updateData(fichero, webId, session);


  } catch (error) {
    console.log(error);
  }
}

//Devuelve un array con la lista de puntos filtrados
export async function filterPoints(session, webId, categories, mapId){

  let url = urlCreator(webId);


  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let mapsString = await file.text();
    var jsonMaps = JSON.parse(mapsString);
    const mapPoints = jsonMaps.maps.find(map => map.id === mapId).locations;

    var result = mapPoints.filter(item => categories.includes(item.category));

    return result;

  } catch (error) {
    console.log(error);
  }
}

//Actualiza los datos del JSON introduciéndo un nuevo punto
export async function updatePoints(mapId,latitude,longitude,name,description,category,session,webId){

  let url = urlCreator(webId);


  try {
    let solidFile = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let author = await getNameFromPod(webId);
    let idPunto = randomId(20);

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formattedDate = `${day}/${month}/${year}`;

    var newPoint = {
      id:idPunto,
      name:name,
      author:author,
      latitude:latitude,
      longitude:longitude,
      description:description,
      category:category,
      comments:[],
      reviewScores:[],
      pictures:[],
      date: formattedDate,
    }

    let mapsString = await solidFile.text();
    var jsonMaps = JSON.parse(mapsString);
    console.log(jsonMaps)
    const map = jsonMaps.maps.find(map => map.id === mapId);

    map.locations.push(newPoint);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "locations.json", { type: blob.type });

    await updateData(fichero, webId, session)

    return idPunto;

  } catch (error) {

    console.log(error);
  }

}


//Método que devuelve el punto específico del pod
export async function getSpecificPoint(session, webId,pointId,mapId){

  let url = urlCreator(webId);

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let mapsString = await file.text();
    var jsonMaps = JSON.parse(mapsString);
    const mapPoints = jsonMaps.maps.find(map => map.id === mapId).locations;  

    var point = mapPoints.find(item => item.id === pointId);

    if(point === undefined){
      console.log("Error: No existe el punto del pod");
    }else{
      let specificPoint = new Point(point.id, point.author, point.latitude, point.longitude, point.name, 
        point.description, point.category, point.date, point.comments, point.reviewScores,point.pictures);
      return specificPoint;
    }

  } catch (error) {
    console.log(error);
  }
}


//Editará el punto del que se pasa la id como parámetro
export async function editPoint(pointId,latitude,longitude,name,description,category,session,webId,mapId){

  let url = urlCreator(webId);

  try {

    let file = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let mapsString = await file.text();
    var jsonMaps = JSON.parse(mapsString);
    const mapPoints = jsonMaps.maps.find(map => map.id === mapId).locations;
    mapPoints.map(point => {
      if(point.id === pointId){
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

    var fichero = new File([blob], "locations.json", { type: blob.type });

    await updateData(fichero, webId, session);


  } catch (error) {
    console.log(error);
  }

}



//Añade un comentario a un punto
export async function addComment(mapId,pointId,comment,session,webIdPar){

  let url = urlCreator(webIdPar);

  try {
    let solidFile = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    const { webId } = session.info;

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
    const map = jsonMaps.maps.find(map => map.id === mapId);
    const point = map.locations.find(point => point.id === pointId);

    point.comments.push(newComment);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "locations.json", { type: blob.type });

    await updateData(fichero, webIdPar, session);
    return newComment;

  } catch (error) {
    console.log(error);
  }

}

//Añade una review a un punto
export async function addScore(mapId,pointId,score,session,webIdPar){

  let url = urlCreator(webIdPar);

  try {
    let solidFile = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    const { webId } = session.info;

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
    const map = jsonMaps.maps.find(map => map.id === mapId);
    const point = map.locations.find(point => point.id === pointId);

    point.reviewScores.push(newScore);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "locations.json", { type: blob.type });

    await updateData(fichero, webIdPar, session);

  } catch (error) {
    console.log(error);
  }
  return newScore;
}


//Añade una foto a un punto
export async function addPicture(mapId,pointId,pictureUrl,session,webIdPar){

  let url = urlCreator(webIdPar);

  try {
    let solidFile = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    const { webId } = session.info;

    let author = await getNameFromPod(webId);

    var newPicture = {
      author:author,
      pictureUrl:pictureUrl,
    }

    let mapsString = await solidFile.text();
    var jsonMaps = JSON.parse(mapsString);
    const map = jsonMaps.maps.find(map => map.id === mapId);
    const point = map.locations.find(point => point.id === pointId);

    point.pictures.push(newPicture);

    const blob = new Blob([JSON.stringify(jsonMaps, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "locations.json", { type: blob.type });

    await updateData(fichero, webIdPar, session);

  } catch (error) {
    console.log(error);
  }
  return newPicture;
}


/**
 * ----------------------------------------------------------------------------------------------------
 * Funciones varias de ayuda
 * ----------------------------------------------------------------------------------------------------
 */


//Devuelve la url para poder acceder al json
export function urlCreator(webId){
  let url = webId.replace("profile/card#me","");
  url = url+"lomap/locations.json";
  return url; 
}


//Devuelve la información del perfil
export async function getProfile(webId){ 
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let myDataset = await solid.getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  return solid.getThing(myDataset, webId); // we obtain the thing we are looking for from the dataset
}


//Devuelve el nombre del usuario logeado
export async function getNameFromPod(webId) {
  try{
    if (webId === "" || webId === undefined) return "Name not found"; // we return the empty string
    let name = solid.getStringNoLocale(await getProfile(webId), FOAF.name);
    return name !== null ? name : "NoName";
  
  }catch(error){
    console.log(error);
  }
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


