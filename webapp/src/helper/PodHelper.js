/*import { saveFileInContainer,getFile,overwriteFile, getThing, getStringNoLocale, getSolidDataset, getThingAll, getUrlAll, getStringEnglish} from "@inrupt/solid-client";*/
import * as solid from '@inrupt/solid-client';
import {Point} from "../entities/Entities";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";



/**
 * ----------------------------------------------------------------------------------------------------
 * Funciones sobre ficheros
 * ----------------------------------------------------------------------------------------------------
 */


//Guarda el archivo pasado por parámetro en el pod
export async function createData(url, file, session) {

  try {

    let savedFile = await solid.saveFileInContainer(
        url,
        file,
        { slug: file.name, contentType: file.type, fetch: session.fetch }

    );
    
  } catch (error) {
    console.log(error);
  }

}


//Se encarga de cear el archivos JSON en el POD
export async function createPointsFile(webId) {
  let author = await getNameFromPod(webId);

  var r = {
    maps: [{
      id: "1",
      name: "Primer mapa",
      author: author,
      locations: []
    }
    ]
  };

  const blob = new Blob([JSON.stringify(r, null, 2)], {
    type: "application/json",
  });

  var file = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });
  return file;

}



//Se encarga de actualizar el JSON ya existente en el POD
export async function updateData(file,webId,session) {

  let url = webId.replace("profile/card#me","");
  url = url+"private/puntoPrueba3Mapa.json";

   try {
    var savedFile = await solid.overwriteFile(
      url,
      file,
      { contentType: file.type, fetch: session.fetch }

    );

      } catch (error) {
    console.log(error);
  }
}



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

  //   const extractedMaps = [];

  //   for (let i = 0; i < maps.length; i++) {
  //     const map = maps[i];
  //     const extractedMap = {
  //       "id": map.id,
  //       "name": map.name
  //     };

  //   extractedMaps.push(extractedMap);

  // }

  // return extractedMaps;

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
    console.log(error);
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

}


/**
 * ----------------------------------------------------------------------------------------------------
 * AMIGOS POD
 * ----------------------------------------------------------------------------------------------------
 */



//Se encarga de crear el primer acl del json, dándole permisos de owner al propietario
async function ownAclPermission(webId,session) {

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json"; 

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );

      let resourceAcl = solid.createAcl(file);

     const updatedAcl = solid.setAgentResourceAccess(
      resourceAcl,
      webId,
      { read: true, append: true, write: true, control: true }
    );

    await solid.saveAclFor(file, updatedAcl, { fetch: session.fetch }); 

  } catch (error) {
    console.log(error);
  }
}


//Se encarga de darle permisos de lectura y escritura a los amigos del pod
export async function friendsAclPermission(webId,session) {

  let friendsURL = solid.getUrlAll(await getProfile(webId), FOAF.knows);

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json"; 

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );

    for(var i in friendsURL){
      let resourceAcl = solid.createAcl(file);

      const updatedAcl = solid.setAgentResourceAccess(
        resourceAcl,
        friendsURL[i],
        { read: true, append: false, write: true, control: false }
      );
 
     await solid.saveAclFor(file, updatedAcl, { fetch: session.fetch }); 
    }

  } catch (error) {
    console.log(error);
  }
}

//Devuevle los amigos de usuario registrado
export async function getAllFriendsFromPod(webId) {

  let friendsURL = solid.getUrlAll(await getProfile(webId), FOAF.knows);

  let friends = [];

  for(var i in friendsURL){

    let name = await getNameFromPod(friendsURL[i]);
    var friend = {
      friendURL:friendsURL[i],
      friendName:name,
    }
    friends.push(friend);
  }

  return friends;

}

//Devuelve los mapas del amigo que se pasa por parámetro
export async function getAllFriendMaps(webId) {

  let friendsURL = solid.getUrlAll(await getProfile(webId), FOAF.knows);

  let friends = [];

  for(var i in friendsURL){

    let name = await getNameFromPod(friendsURL[i]);
    var friend = {
      friendURL:friendsURL[i],
      friendName:name,
    }
    friends.push(friend);
  }

  return friends;

}



/**
 * ----------------------------------------------------------------------------------------------------
 * Funciones varias de ayuda
 * ----------------------------------------------------------------------------------------------------
 */


//Devuelve la información del perfil
async function getProfile(webId){ 
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let myDataset = await solid.getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  return solid.getThing(myDataset, webId); // we obtain the thing we are looking for from the dataset
}


//Devuelve el nombre del usuario logeado
async function getNameFromPod(webId) {
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
const randomId = function(length) {
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


