import * as solid from '@inrupt/solid-client';
import {getNameFromPod} from './PodHelper';


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
  export async function createPointsFile(webId, mapName="Primer mapa") {
    let author = await getNameFromPod(webId);
  
    var r = {
      maps: [{
        id: "1",
        name: mapName,
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
  