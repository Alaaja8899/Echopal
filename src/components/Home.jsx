import React, { useEffect } from 'react'
import Header from './Header'
import Rooms from './Rooms'
import CreateRoom from './CreateRoom'
function Home() {

  return (
    <div className=' relative flex flex-col gap-2 h-dvh  container mx-auto'>
      
        <Header/>


        <Rooms/>
        <CreateRoom/>

    </div>
  )
}

export default Home
