import React, { useEffect, useState } from 'react'
import '../App.css'
import { useAuthContext } from '../Context/Context'
import { JoinUserToRoom } from '../database'



function Room(props) {
  const room = props.data
  const {authenticated , setRooming , user} = useAuthContext()


    const joiningRoom=()=>{
      JoinUserToRoom(user.photoURL , user.uid ,user.displayName , room.key , 'user' )
      setRooming(true)
      localStorage.setItem('RoomID' , room.key)


    }

    // useEffect(()=>{    
    // } , [])

  return (
    <div onClick={()=> joiningRoom()} 
    className='bg-[#353535] flex flex-col p-4  rounded-[1rem] md:w-[30rem]  relative h-[150px] gap-4 hover:border hover:border-red-500 cursor-pointer w-full'>
        <span className='Room absolute top-[-8px] left-[-5px]   rounded-full bg-mainBg w-[30px] h-[30px] flex items-center justify-center'>
        <box-icon type='solid' name='home' color={'green'}></box-icon>
        </span>



        <h2 className="title font-medium truncate md:w-96 w-72">
          {room.title}
        </h2>

        <div className="lower-part flex items-center justify-between  ">
          
        <div className="indicator flex items-center gap-3 ">
    
    <div class="audio-waves">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
    </div>

    <p>Speaking Now </p>
        </div>        


          <div className="user-preview flex relative  justify-end  items-center">
        
                <div className="img-cont w-[60px] h-[60px] rounded-full overflow-hidden translate-x-[20px] ">
                  <img src={room.users && Object.values(room.users)[0].photo} />
                </div>
                <div className="img-cont w-[60px] h-[60px] rounded-full overflow-hidden   bg-[#252525] flex items-center justify-end p-2">
                  {room.users && Object.values(room.users).length}+
                </div>
        
             
             
        
          </div>


          </div>        
         
         <div className="owner">
          <p className='text-gray-400'>
            {/* Created by : @abdirizak */}
          </p>
         </div>
        
    </div>
  )
}








export default Room
