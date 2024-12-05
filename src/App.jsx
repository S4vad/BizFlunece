import React from 'react'
import UserLogin from './components/Auth/UserLogin'
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import About from './pages/About'
import Contact from './pages/Contact'
import Ourworks from './pages/Ourworks'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} /> 
        <Route path='/ourWorks' element={<Ourworks />} /> 
      </Routes>
    </>
  )
}

export default App;