import React, { createContext, useContext, useState } from 'react'
const authContext = createContext()
function Context({children}) {
    const [authenticated , setAuth] = useState(localStorage.getItem('user') ? true:false)
    const [CreatingRoom , setCreating] = useState(false)
    const [Rooming , setRooming] = useState(!!localStorage.getItem('RoomID') ? true:false)
    const [user , setUser] = useState(authenticated ? JSON.parse(localStorage.getItem('user')) :{})




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