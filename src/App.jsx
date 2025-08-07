import React from 'react'
import Home from './Componets/Pages/home'
import { Route, Routes } from 'react-router-dom'
import Details from './Componets/Details/Details'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/details' element={<Details/>} />
    </Routes>
    </>
  )
}

export default App
