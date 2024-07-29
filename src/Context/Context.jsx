import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchIPLocation } from '../extraFunctions'
const authContext = createContext()
function Context({children}) {
    const [authenticated , setAuth] = useState(localStorage.getItem('user') ? true:false)
    const [CreatingRoom , setCreating] = useState(false)
    const [Rooming , setRooming] = useState(!!localStorage.getItem('RoomID') ? true:false)
    const [user , setUser] = useState(authenticated ? JSON.parse(localStorage.getItem('user')) :{})
    const [location , setLocation] = useState(localStorage.getItem('location') ? JSON.parse(localStorage.getItem('location')):null)


    useEffect(()=>{
        if (!location){
          fetchIPLocation()
        }else{
          console.log("userLocation : " , location);
        }
    } , [])

    const value ={authenticated , CreatingRoom , setCreating , Rooming , setRooming , user}
  return (
    <authContext.Provider value={value}>
        {children}
    </authContext.Provider>
  )
}

export default Context


export const  useAuthContext=()=>{
            return useContext(authContext)
}