import * as solid from '@inrupt/solid-client';
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import {getProfile,getNameFromPod,urlCreator} from './PodHelper';

/**
 * ----------------------------------------------------------------------------------------------------
 * AMIGOS POD
 * ----------------------------------------------------------------------------------------------------
 */



//Se encarga de crear el primer acl del json, dándole permisos de owner al propietario
export async function ownAclPermission(webId,session) {

      let url = urlCreator(webId);
  
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
  
    let url = urlCreator(webId);

  
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
  
  //Añade un amigo a lista de amigos del usuario que está iniciado en sesión
  export async function addFriend(webID, session, friendWebId) {
    let profile = webID.split("#")[0]; 
    let dataSet = await solid.getSolidDataset(profile);  
  
    let dataSetThing = solid.getThing(dataSet, webID);
  
    try {
      let friendName = await getNameFromPod(friendWebId);
      let existsFriend = solid.getUrlAll(dataSetThing, FOAF.knows)

      if (existsFriend.some((url) => url === friendWebId)){
        alert('El usuario "' + friendWebId + '" ya es amigo.');
        console.log("Este usuario ya es amigo");
      
      }else if(typeof friendName === 'undefined'){
        alert('No existe este usuario.');
        console.log("Este usuario no existe");
      }else{
        // We create the friend
      let newFriend = solid.buildThing(dataSetThing)
      .addUrl(FOAF.knows, friendWebId)
      .build();
  
      // insert friend in dataset
      dataSet = solid.setThing(dataSet, newFriend);
      dataSet = await solid.saveSolidDatasetAt(webID, dataSet, {fetch: session.fetch})
      alert('Nuevo amigo, "' + friendWebId + '" añadido.');
      console.log("Usuario añadido a lista de Amigos");
      }
    } catch (error){
      console.log(error);
    } 
  }
  

  //Elimina un amigo de la lista de amigos
  export async function deleteFriend(webID, session, friendWebId) {
    let profile = webID.split("#")[0]; 
    let dataSet = await solid.getSolidDataset(profile);  
  
    let dataSetThing = solid.getThing(dataSet, webID);
  
    try {
      let friendName = await getNameFromPod(friendWebId);
      let existsFriend = solid.getUrlAll(dataSetThing, FOAF.knows)

      if (!existsFriend.some((url) => url === friendWebId)){
        alert('El usuario "' + friendWebId + '" no es amigo.');
        console.log("Este usuario no es amigo");
      
      }else if(typeof friendName === 'undefined'){
        alert('No existe este usuario.');
        console.log("Este usuario no existe");
      }else{
        // We create the friend
      let newFriend = solid.buildThing(dataSetThing)
      .removeUrl(FOAF.knows, friendWebId)
      .build();
  
      // insert friend in dataset
      dataSet = solid.setThing(dataSet, newFriend);
      dataSet = await solid.saveSolidDatasetAt(webID, dataSet, {fetch: session.fetch})
      alert('Usuario, "' + friendWebId + '" borrado de la lista de amigos.');
      console.log("Usuario borrado de la lista de Amigos");
      }
    } catch (error){
      console.log(error);
    } 
  }
  