

import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth"; 
import {getStorage} from 'firebase/storage'
import { collection, getDocs, getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyDshoY5BSNVpQAwO8Nn-zZoKPWjmUEWFVs",
  authDomain: "olx-clone-27824.firebaseapp.com",
  projectId: "olx-clone-27824",
  storageBucket: "olx-clone-27824.firebasestorage.app",
  messagingSenderId: "74560838712",
  appId: "1:74560838712:web:848ea1f4d297e688d2dacd"
};  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const fireStore = getFirestore(app);


const fetchFromFirestore = async () => {
    try {
      const productsCollection = collection(fireStore, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) 
      console.log("Fetched products from Firestore:", productList);
      return productList;
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
      return [];
    }
  };
  

  export {
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFirestore
  }
