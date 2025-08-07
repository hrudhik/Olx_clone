// import { collection, getDocs } from "firebase/firestore";
// import { createContext, useContext, useEffect, useState } from "react";
// import { firestore } from "../Firebase/firebase";

// const context=createContext(null)
// export const Itemcontext=()=> useContext(context);

// export const ItemcontextPorvider=({children})=>{
//     const [items,setItems]=useState(null);

//     useEffect(()=>{
//         const fetchItemsfromFirestore=async ()=>{
//             try {
//                 const productsCollection=collection(firestore,'products')
//                 const productSnapshot= await getDocs(productsCollection)
//                 const productList= productSnapshot.docs.map(doc=>({
//                     id:doc.id,
//                     ...doc.data()
//                 }))
//                 setItems(productList)
//             } catch (error) {
//                 console.log(error)
//                 alert(" faild fetch items for firebase")
//             }
//         }
//         fetchItemsfromFirestore()
//     },[])
//     return (
//         <>
//         <context.Provider value={{items,setItems}}>
//             {children}
//         </context.Provider>
//         </>
//     )
      
// }


import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";

const Context = createContext(null);
export const ItemsContext = () => useContext(Context); //customHook

export const ItemsContextProvider = ({ children }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(fireStore, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productsList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemsFromFireStore();
  }, []);

  return (
    <Context.Provider value={{ items, setItems, loading }}>
      {children}
    </Context.Provider>
  );
};