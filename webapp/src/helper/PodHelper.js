/*import { saveFileInContainer,getFile,overwriteFile, getThing, getStringNoLocale, getSolidDataset, getThingAll, getUrlAll, getStringEnglish} from "@inrupt/solid-client";*/
import * as solid from '@inrupt/solid-client';
import {Point} from "../entities/Entities";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";

async function getProfile(webId){
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let myDataset = await solid.getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  return solid.getThing(myDataset, webId); // we obtain the thing we are looking for from the dataset
}

export async function getNameFromPod(webId) {
  if (webId === "" || webId === undefined) return "Name not found"; // we return the empty string
  let name = solid.getStringNoLocale(await getProfile(webId), FOAF.name);
  return name !== null ? name : "No name :(";
}

async function getProfileInfo(){
  return [FOAF.name.iri.value, VCARD.organization_name.iri.value, VCARD.role.iri.value, VCARD.hasPhoto.iri.value];
}


async function readData(url,session) {
  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );

/*     printContents(file);
 */  } catch (error) {
    console.log(error);
  }
}


export async function printContents(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      console.log(event.target.result);
    }
    reader.readAsText(file);
  }



async function existFile(webId,session){

  let url = webId.replace("profile/card#me","");
  url = url+"private/puntosMapa.js"; 

  let exist = false;
  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );
      
    exist = true;

    return exist;
    
  } catch (error) {
    return exist;
  }
}
  

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


//Función que devuelve una id random para poder distinguir los puntos
const randomId = function(length) {
  return (Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)).substring(0, length);
};


export async function deletePoints(session, webId, id){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntosMapa.json"; 

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );

    let oldPoints = await file.text();
    var dataset = JSON.parse(oldPoints);
    var allPointsJsonArray = dataset.points;

    var result = allPointsJsonArray.filter(item => item.id !== id);

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });

    var fichero = new File([blob], "puntosMapa.json", { type: blob.type });

    await updateData(fichero, webId, session);


  } catch (error) {
    console.log(error);
  }
}

//Devuelve un array con la lista de puntos filtrados
export async function filterPoints(session, webId, categories){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntosMapa.json"; 

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
  url = url+"private/puntoMapa.json"; 

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );

    let autor = await getNameFromPod(webId);


    var dates =[{id:randomId(20),autor:autor,latitud:latitud,longitud:longitud,name:name,comment:comment,category:category}];

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

    var fichero = new File([blob], "puntosMapa.json", { type: blob.type });

    await updateData(fichero, webId, session)
  
  } catch (error) {

    const file = await createPointsFile();
    await createData(urlContainer, file, session);
    updatePoints(latitud,longitud,name,comment,category,session,webId);
  }

}

export async function createFirstFile(session, webId){
  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntosMapa.json"; 

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );

  } catch (error) {
    const file = await createPointsFile();
    await createData(urlContainer, file, session);
  }
}


//Se encarga de cear el archivos JSON en el POD
export async function createPointsFile() {


  var r = {
  points: []
  };

    const blob = new Blob([JSON.stringify(r, null, 2)], {
      type: "application/json",
    });

    var file = new File([blob], "puntosMapa.json", { type: blob.type });
    return file;

}



//Se encarga de actualizar el JSON ya existente en el POD
export async function updateData(file,webId,session) {

  let url = webId.replace("profile/card#me","");
  url = url+"private/puntosMapa.json"; 

   try {
    var savedFile = await solid.overwriteFile(
      url,
      file,
      { contentType: file.type, fetch: session.fetch }
    );

/*     printContents(savedFile);
 */  } catch (error) {
    console.log(error);
  } 
}

export function prueba(){
  return [[43.402301,-5.808376]];
}


//Devolverá todos los puntos dentro del Pod
export async function getAllPoints(session,webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntosMapa.json"; 

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
  url = url+"private/puntosMapa.json"; 

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

  
async function stringJson(x,y){
  
     return {latitud:x,altitud:y};
  }


/**
 * ----------------------------------------------------------------------------------------------------
 * AMIGOS POD
 */



//Obtiene las webId de los amigos del POD
export async function getFriendWebId(webId,session) {

  let friendsURL = solid.getUrlAll(await getProfile(webId), FOAF.knows);
  let d = friendsURL[0];
  console.log(d);

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntosMapa.json"; 

  try {
    let file = await solid.getFile(
      url,
      { fetch: session.fetch }
    );

/*     let l = solid.createAcl(file);

    let o = await solid.getFallbackAcl(file );

    console.log(o); */

 /*    let l = solid.createAcl(file);

    try {
      let savedFile = await solid.saveFileInContainer(
        urlContainer, 
        l,
        { slug: l.name, contentType: l.type, fetch: session.fetch }
        
      );
  
    } catch (error) {
      console.log(error);
    } */

  } catch (error) {
    console.log(error);
  }
}

