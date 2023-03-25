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



/* export async function createFirstFile(session, webId){
  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {

    let file = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

  } catch (error) {
    const file = await createPointsFile();
    await createData(urlContainer, file, session);
  }
} */


//Se encarga de cear el archivos JSON en el POD
export async function createPointsFile() {
  var r = {
    points: []
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
export async function deletePoints(session, webId, id){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let oldPoints = await file.text();
    var dataset = JSON.parse(oldPoints);
    var allPointsJsonArray = dataset.points;

    var result = allPointsJsonArray.filter(item => item.id !== id);

    var jasonPoints = {
      points: []
    };

    for(var i in result){
      jasonPoints.points.push(result[i]);
    }

    const blob = new Blob([JSON.stringify(jasonPoints, null, 2)], {
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

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let oldPoints = await file.text();
    var dataset = JSON.parse(oldPoints);
    var allPointsJsonArray = dataset.points;

    var result = allPointsJsonArray.filter(item => categories.includes(item.category));

    return result;


  } catch (error) {
    console.log(error);
  }
}

//Actualiza los datos del JSON introduciéndo un nuevo punto
export async function updatePoints(latitud,longitud,name,comment,category,session,webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";

  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let file = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let autor = await getNameFromPod(webId);

    let idPunto = randomId(20);

    var dates =[{id:idPunto,autor:autor,latitud:latitud,longitud:longitud,name:name,comment:comment,category:category}];

    let oldPoints = await file.text();

    var dataset = JSON.parse(oldPoints);

    for(var i in dates) {
      var item = dates[i];
      dataset.points.push({
        "id" : item.id,
        "autor" : item.autor,
        "latitude" : item.latitud,
        "longitude"  : item.longitud,
        "name" : item.name,
        "comment" : item.comment,
        "category": item.category
      });
    }

    const blob = new Blob([JSON.stringify(dataset, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });

    await updateData(fichero, webId, session)

    return idPunto;

  } catch (error) {

    const file = await createPointsFile();
    await createData(urlContainer, file, session);
    updatePoints(latitud,longitud,name,comment,category,session,webId);
  }

}



//Devolverá todos los puntos dentro del Pod
export async function getAllPoints(session,webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {

    let file = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let oldPoints = await file.text();
    var dataset = JSON.parse(oldPoints);
    var allPointsJsonArray = dataset.points;
    var points = [];

    for(var i in allPointsJsonArray) {
      let p = new Point(allPointsJsonArray[i].id,allPointsJsonArray[i].autor,allPointsJsonArray[i].latitude,
          allPointsJsonArray[i].longitude, allPointsJsonArray[i].name, allPointsJsonArray[i].category,
          allPointsJsonArray[i].comment);
      points.push(p);
    }

    return points;

  } catch (error) {
    console.log(error);
  }

}


//Devolverá todas las coordenadas de todos los puntos dentro del Pod
export async function getAllCoordinates(session,webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {

    let file = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let oldPoints = await file.text();
    var dataset = JSON.parse(oldPoints);
    var allPointsJsonArray = dataset.points;

    var marks = [];

    for(var i in allPointsJsonArray) {
      let p =[allPointsJsonArray[i].latitude,allPointsJsonArray[i].longitude];
      marks.push(p);
    }

    console.log(marks);

    return marks;

  } catch (error) {
    console.log(error);
  }

}


//Método que devuelve el punto específico del pod
export async function getSpecificPoint(session, webId,pointId){
  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }

    );

    let oldPoints = await file.text();
    var dataset = JSON.parse(oldPoints);
    var allPointsJsonArray = dataset.points;

    var arrayPoints = allPointsJsonArray.filter(item => item.id == pointId);

    if(arrayPoints.length != 1){
      console.log("Error: No existe el punto del pod");
    }else{
      let p = arrayPoints[0];
      let specificPoint = new Point(p.id,p.autor,p.latitude,p.longitude, p.name, p.category,p.comment);
      return specificPoint;
    }

  } catch (error) {
    console.log(error);
  }
}


//Editará el punto del que se pasa la id como parámetro
export async function editPoint(pointId,latitud,longitud,name,comment,category,session,webId){
  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json";

  try {

    let file = await solid.getFile(
        url,
        { fetch: session.fetch }
    );

    let oldPoints = await file.text();
    var dataset = JSON.parse(oldPoints);
    var pointsArray = dataset.points;

    for(let i=0; i<pointsArray.length; i++){
      if(pointsArray[i].id == pointId){
        pointsArray[i].latitude=latitud;
        pointsArray[i].longitude=longitud;
        pointsArray[i].name=name;
        pointsArray[i].category=category;
        pointsArray[i].comment=comment;
        break;
      }
    }

    var jasonPoints = {
      points: []
    };

    for(var i in pointsArray){
      jasonPoints.points.push(pointsArray[i]);
    }

    const blob = new Blob([JSON.stringify(jasonPoints, null, 2)], {
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



//Obtiene las webId de los amigos del POD
export async function getFriendWebId(webId,session) {

  let friendsURL = solid.getUrlAll(await getProfile(webId), FOAF.knows);
  let d = friendsURL[0];
  console.log(d);

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json"; 

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );

    if(solid.hasAccessibleAcl(file)){
      console.log("tiene");
    }else{
      console.log("no tiene");

    }

      let resourceAcl = solid.createAcl(file);

     const updatedAcl = solid.setAgentResourceAccess(
      resourceAcl,
      d,
      { read: true, append: false, write: true, control: false }
    );

    await solid.saveAclFor(file, updatedAcl, { fetch: session.fetch }); 



  } catch (error) {
    console.log(error);
  }
}

export async function friendsPruebas(webId,session,id) {

  let friendsURL = solid.getUrlAll(await getProfile(webId), FOAF.knows);
  let d = friendsURL[1];
  console.log(d);

  let url = d.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntoPrueba3Mapa.json"; 

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
 
    );

    let oldPoints = await file.text();
    var dataset = JSON.parse(oldPoints);
    var allPointsJsonArray = dataset.points;

    var result = allPointsJsonArray.filter(item => item.id !== id);

    var jasonPoints = {
      points: []
    };

    for(var i in result){
      jasonPoints.points.push(result[i]);
    }

    const blob = new Blob([JSON.stringify(jasonPoints, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "puntoPrueba3Mapa.json", { type: blob.type });

    await updateData(fichero, d, session);


  } catch (error) {
    console.log(error);
  }

  
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
export async function getNameFromPod(webId) {
  if (webId === "" || webId === undefined) return "Name not found"; // we return the empty string
  let name = solid.getStringNoLocale(await getProfile(webId), FOAF.name);
  return name !== null ? name : "No name :(";
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


