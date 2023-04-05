import * as solid from '@inrupt/solid-client';
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import {getProfile,getNameFromPod} from './PodHelper';

/**
 * ----------------------------------------------------------------------------------------------------
 * AMIGOS POD
 * ----------------------------------------------------------------------------------------------------
 */



//Se encarga de crear el primer acl del json, dándole permisos de owner al propietario
export async function ownAclPermission(webId,session) {

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
  
  
  export async function addFriend(webID, session, friend) {
    let profile = webID.split("#")[0]; 
    let friendWebId = "https://"+friend+".inrupt.net/profile/card#me";
    console.log(friendWebId);
    let dataSet = await solid.getSolidDataset(profile);  
  
    let dataSetThing = solid.getThing(dataSet, webID);
  
    try {
      let existsFriend = solid.getUrlAll(dataSetThing, FOAF.knows)
      if (existsFriend.some((url) => url === friendWebId)){
        console.log("Este usuario ya es amigo");
      }
      else{
        // We create the friend
      let newFriend = solid.buildThing(dataSetThing)
      .addUrl(FOAF.knows, friendWebId)
      .build();
  
      // insert friend in dataset
      dataSet = solid.setThing(dataSet, newFriend);
      dataSet = await solid.saveSolidDatasetAt(webID, dataSet, {fetch: session.fetch})
      alert('Nuevo amigo, \"' + friend + '\" añadido.');
      console.log("Usuario añadido a lista de Amigos");
      }
    } catch (error){
      console.log(error);
    } 
  }
  
  