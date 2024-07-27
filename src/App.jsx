import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import { useAuthContext } from './Context/Context'
import Header from './components/Header'
import Home from './components/Home'
import MainRoom from './mainRoomComponents/MainRoom'
import RoomContextProvider from './mainRoomComponents/RoomContext/RoomContextProvider'
import AboutMe from './components/AboutMe'
import { Route , BrowserRouter as Router , Routes } from 'react-router-dom'
function App() {
    const {authenticated , Rooming , setRooming } = useAuthContext()
    return (
    <div className='bg-mainBg min-h-screen text-white'>
      {/*app got started here*/}
        
    
          <Router>

            <Routes>


              <Route path='/' element={<RealApp/>} />
              <Route path='/info' element={<AboutMe/>}   />


            </Routes>


          </Router>
    </div>
  )
}

const RealApp = ()=>{
  const {authenticated , Rooming , setRooming } = useAuthContext()
  return (
    <>
      {authenticated ? (
  !Rooming ? <Home /> : <RoomContextProvider> <MainRoom /></RoomContextProvider>
) : (
  <Login />
)}

    </>
  )
}


export default App
