import { saveFileInContainer,getFile,overwriteFile } from "@inrupt/solid-client";
import {PointStruct} from "../entities/Entities";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";

async function getProfileInfo(){
  return [FOAF.name.iri.value, VCARD.organization_name.iri.value, VCARD.role.iri.value, VCARD.hasPhoto.iri.value];
}


async function readData(url,session) {
  try {
    let file = await getFile(
      url,
      { fetch: session.fetch }
    );

    printContents(file);
  } catch (error) {
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
    let file = await getFile(
      url,
      { fetch: session.fetch }
    );
      
    exist = true;

    return exist;
    
  } catch (error) {
    return exist;
  }
}
  
  
export async function createPoints(name,x,y,z,comment, webId, session) {

    var dates =[{latitud:x,altitud:y,longitud:z,comment:comment}];

    var r = {
    points: []
    };

    for(var i in dates) {    
      var item = dates[i];   
      var v1 = item.latitud;
      var v2 = item.altitud;
      var v3 = item.longitud;
      var v4 = item.comment;
      r.points.push({ 
          "x" : v1,
          "y"  : v2,
          "z" : v3,
          "comment" : v4
      });
    }
  
      const blob = new Blob([JSON.stringify(r, null, 2)], {
        type: "application/json",
      });
  
      var file = new File([blob], name, { type: blob.type });
      //return file;
      await createData(webId, file, session);
  }
  
export async function createData(url, file, session) {
  try {
    let savedFile = await saveFileInContainer(
      url,
      file,
      { slug: file.name, contentType: file.type, fetch: session.fetch }
      
    );
    printContents(savedFile);

  } catch (error) {
    console.log(error);
  }

  }

const randomId = function(length) {
  return (Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)).substring(0, length);
};


export async function deletePoints(){

  let id = randomId(20);
  console.log(id);

}

 
export async function updatePoints(x,y,z,comment,session,webId){

  let url = webId.replace("profile/card#me","");
  let urlContainer = url+"private/";
  url = url+"private/puntosMapa.json"; 

  try {
    let file = await getFile(
      url,
      { fetch: session.fetch }
    );

    var dates =[{latitud:x,altitud:y,longitud:z,comment:comment}];

    let oldPoints = await file.text();

    var dataset = JSON.parse(oldPoints);

    for(var i in dates) {    
      var item = dates[i];   
      var v1 = item.latitud;
      var v2 = item.altitud;
      var v3 = item.longitud;
      var v4 = item.comment;
      dataset.points.push({ 
          "x" : v1,
          "y"  : v2,
          "z" : v3,
          "comment" : v4
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
    updatePoints(x, y, z , comment, session , webId);
  }

}

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


export async function updateData(file,webId,session) {

  let url = webId.replace("profile/card#me","");
  url = url+"private/puntosMapa.json"; 

   try {
    var savedFile = await overwriteFile(
      url,
      file,
      { contentType: file.type, fetch: session.fetch }
    );

    printContents(savedFile);
  } catch (error) {
    console.log(error);
  } 
}

  
async function stringJson(x,y){
  
     return {latitud:x,altitud:y};
  }


