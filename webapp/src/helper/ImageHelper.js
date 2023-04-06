import {
    LOCATIONS_BUCKET,
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
  } from "../config/firebase.config";

  import {randomId} from './PodHelper';
  import imagenLogo from '../images/lomapLogo.png';

  export async function saveImages(image){

    image = new Image();
    image.src = 'https://images.unsplash.com/photo-1547005327-ef75a6961556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b2NlYW58ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60';
    console.log(image);

    const imgExtension = 'png';
    const imgId = randomId();
  
    try {
    uploadBytes(
        ref(storage, `${LOCATIONS_BUCKET}/${imgId}.${imgExtension}`),
        image
    ).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          console.log(downloadUrl);
        });
    })
     
    } catch (err) {
    console.log(err);
    }
 
  };
