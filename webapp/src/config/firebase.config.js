// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvy8J-O4xtTmmRJhVLX8mLFAPC9ulhjCg",
  authDomain: "lomapes4b.firebaseapp.com",
  projectId: "lomapes4b",
  storageBucket: "lomapes4b.appspot.com",
  messagingSenderId: "970144092078",
  appId: "1:970144092078:web:c7a139710adc34f1ef823f",
  measurementId: "G-N3VBC8X3SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Icializamos Storage
const storage = getStorage(app);

// Obtenemos la URL con las locations
const LOCATIONS_BUCKET = `gs://${firebaseConfig.storageBucket}/locations`;

const locationsRef = ref(storage, LOCATIONS_BUCKET);

export {
  app,
  storage,
  locationsRef,
  getDownloadURL,
  uploadBytes,
  ref,
  LOCATIONS_BUCKET,
};