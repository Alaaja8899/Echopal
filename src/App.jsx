import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import { useAuthContext } from './Context/Context'
import Header from './components/Header'
import Home from './components/Home'
import MainRoom from './mainRoomComponents/MainRoom'
import RoomContextProvider from './mainRoomComponents/RoomContext/RoomContextProvider'

function App() {
    const {authenticated , Rooming , setRooming } = useAuthContext()
    return (
    <div className='bg-mainBg min-h-screen text-white'>
      {/*app got started here*/}
        
      {authenticated ? (
  !Rooming ? <Home /> : <RoomContextProvider> <MainRoom /></RoomContextProvider>
) : (
  <Login />
)}



    </div>
  )
}

export default App
