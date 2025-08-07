// import React from 'react'
// import Home from './Componets/Pages/home'
// import { Route, Routes } from 'react-router-dom'
// import Details from './Componets/Details/Details'


// const App = () => {
//   return (
//     <>
//     <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/details' element={<Details/>} />
//     </Routes>
//     </>
//   )
// }

// export default App


import { Route, Routes } from "react-router-dom"
import Home from "./Componets/Pages/home"
import Details from "./Componets/Details/Details"
import Signin from "./Componets/SignIn/Signin"  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  
  return (
    <>
    <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/details" element={<Details/>}/>
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </>
  )
}

export default App