import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Itemcontext } from "../Context/Item"
import Navbar from "../NavBar/navbar"
import Login from "../Modal/login"
import Sell from "../Modal/Sell"


const Details=()=>{

    const location = useLocation()
    const item=location.state ||{}

    const [openmodal ,setmodal]=useState(false)
    const [openmodalsell,setmodalsell]=useState(false)

    const Itemcontext=Itemcontex()
    const togglemodal=()=>setmodal(!openmodal)
    const togglemodalsell=()=>setmodalsell(!openmodalsell)

    return(
        <div>
            <Navbar togglemodal={togglemodal} togglemodalsell={togglemodalsell}  />
            <Login togglemodal={togglemodal} status={openmodal}/>

            <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
                <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96"   >
                    <img className="onject-cover" src={item?.imageurl} alt={item.title} />
                </div>
                <div className="felx flex-col relative w-full">
                    <p className="p-1 pl-0 text-2xl font-bold">{item.price}</p>
                    <p className= "p-1 pl-0 text-xl font-bold">{item.title}</p>
                    <p className="p-1 pl-0 text-base">{item.category}</p>
                    <p className="p-1 pl-0 sm:pb-0 break-words text-elipsis overflow-hidden w-full">{item.description}</p>

                    <div className="relative w-full  sm:relative md:absolute bottom-0 flex justify-between">
                            <p className="p-1 pl-0 font-bold">Seller:{item.userName}</p>
                            <p className="p-1 pl-0 text-sm">{item.createrAt}</p>
                    </div>

                </div>
            </div>

            <Sell setItems={(Itemcontext).setItems} togglemodalsell={togglemodalsell} status={openmodalsell}/>
        </div>
    )
}

export default Details