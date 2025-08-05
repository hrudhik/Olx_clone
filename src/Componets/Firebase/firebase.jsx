
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDshoY5BSNVpQAwO8Nn-zZoKPWjmUEWFVs",
  authDomain: "olx-clone-27824.firebaseapp.com",
  projectId: "olx-clone-27824",
  storageBucket: "olx-clone-27824.firebasestorage.app",
  messagingSenderId: "74560838712",
  appId: "1:74560838712:web:848ea1f4d297e688d2dacd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app); // ✅ pass app
const firestore = getFirestore(app); // ✅ pass app


const fetchfromFirestore= async () => {
    try {
        const productCollection =collection(firestore,'products')
        const productSnapshot =await getDocs(productCollection)
        const productList= productSnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
           
        }))
         console.log("fetch data from firestore",productList)
         return productList
    } catch (error) {
        console.log("error fetching products from firestore",error)
        return []
    }
}

export{
    auth,
    storage,
    provider,
    firestore,
    fetchfromFirestore
}