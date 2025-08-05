import { useEffect, useState } from "react"
import Navbar from "../NavBar/navbar"
import Login from "../Modal/login"
import Sell from "../Modal/Sell"
import Card from "../Card/Card"
import { Itemcontext } from "../Context/Item"
import { fetchfromFirestore } from "../Firebase/firebase"
const Home=()=>{

    const [openmodal,setmodal]=useState(false)
    const [openSellmodal,setSellmodal]=useState(false)


    const togglemodal=()=>{setmodal(!openmodal)}
    const toggleSellmodal=()=>{setSellmodal(!openSellmodal)}

    const contextItem= Itemcontext();

    useEffect(()=>{
        const getItems= async ()=>{
            const data = await fetchfromFirestore()
            contextItem?.setItems(data)
        }
        getItems();
    },[])

    useEffect(()=>{
        console.log("Updated Item",contextItem.items)
    },[contextItem.items])

    return (
        <div>
            <Navbar togglemodal={togglemodal} toggleSellmodal={toggleSellmodal}/>
            <Login togglemodal={togglemodal} status={openmodal}/>
            <Sell setItems={(contextItem).setItems} toggleSellmodal={toggleSellmodal} status={openSellmodal}/>

            <Card items={(contextItem).items||[]}/>
        </div>
    )
}

export default Home