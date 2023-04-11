import {
    LOCATIONS_BUCKET,
    storage,
  } from "../config/firebase.config";

  import {uploadBytes, ref, getDownloadURL } from "firebase/storage";

  import {randomId} from './PodHelper';
  import { addPicture } from "./PodHelper";

  export async function saveImages(mapId, pointId, image, session, webId, callback){

    const imgExtension = image.name.split(".").slice().pop();
    const imgId = randomId();
  
    try {
    uploadBytes(
        ref(storage, `${LOCATIONS_BUCKET}/${imgId}.${imgExtension}`),
        image
    ).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          console.log(downloadUrl);
          addPicture(mapId,pointId,downloadUrl,session,webId).then((savedPicture) =>{
            callback(savedPicture);
          });
        });
    })
    } catch (err) {
    console.log(err);
    }
 
  };
