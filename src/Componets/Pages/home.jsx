// import { useEffect, useState } from "react"
// import Navbar from "../NavBar/navbar"
// import Login from "../Modal/login"
// import Sell from "../Modal/Sell"
// import Card from "../Card/Card"
// import { Itemcontext } from "../Context/Item"
// import { fetchfromFirestore } from "../Firebase/firebase"
// const Home = () => {
//   const [openmodal, setmodal] = useState(false);
//   const [openSellmodal, setSellmodal] = useState(false);

//   const togglemodal = () => setmodal(!openmodal);
//   const toggleSellmodal = () => setSellmodal(!openSellmodal);

//   const { items, setItems } = Itemcontext();  // ✅ correct

//   useEffect(() => {
//     const getItems = async () => {
//       const data = await fetchfromFirestore();
//       setItems(data);   // ✅ lowercase "setitems"
//     };
//     getItems();
//   }, []);

//   useEffect(() => {
//     console.log("Updated Item", items);
//   }, [items]);

//   return (
//     <div>
//       <Navbar togglemodal={togglemodal} toggleSellmodal={toggleSellmodal} />
//       <Login togglemodal={togglemodal} status={openmodal} />
//       <Sell setItems={setItems} toggleSellmodal={toggleSellmodal} status={openSellmodal} />
//       <Card items={items || []} />
//     </div>
//   );
// };


// export default Home


import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login'
import Sell from '../Modal/Sell'
import Card from '../Card/Card'
import { ItemsContext } from '../Context/Item'
import { fetchFromFirestore } from '../Firebase/Firebase'


function Home() {
    const [openModal, setModal] = useState(false) 
    const [openSell, setSell] = useState(false)

    function togglemodal() {
        setModal(!openModal) 
    }

    function toggmodalSell() {         
        setSell(!openSell)     
    }      

    const ItemsCtx = ItemsContext()      

    useEffect(() => {         
        const getItems = async () => {             
            const datas = await fetchFromFirestore()             
            ItemsCtx?.setItems(datas)         
        }         
        getItems()     
    }, [])      

    useEffect(() => {         
        console.log("updated items:", ItemsCtx.items);              
    }, [ItemsCtx.items])          

    return (         
        <>             
            <Navbar togglemodal={togglemodal} toggmodalSell={toggmodalSell} />             
            <Login toggleModal={togglemodal} status={openModal} />              
            <Sell setItems={ItemsCtx?.setItems} toggmodalSell={toggmodalSell} status={openSell} />             
            <Card items={ItemsCtx?.items || []}/>    
           
        </>     
    ) 
}  

export default Home