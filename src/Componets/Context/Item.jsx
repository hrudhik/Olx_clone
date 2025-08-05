import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../Firebase/firebase";

const context=createContext(null)
export const Itemcontext=()=> useContext(context);

export const ItemcontextPorvider=({children})=>{
    const [items,setitems]=useState(null);

    useEffect(()=>{
        const fetchItemsfromFirestore=async ()=>{
            try {
                const productsCollection=collection(firestore,'products')
                const productSnapshot= await getDocs(productsCollection)
                const productList= productSnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setitems(productList)
            } catch (error) {
                console.log(error)
                alert(" faild fetch items for firebase")
            }
        }
        fetchItemsfromFirestore()
    },[])
    return (
        <>
        <context.Provider value={{items,setitems}}>
            {children}
        </context.Provider>
        </>
    )
      
}