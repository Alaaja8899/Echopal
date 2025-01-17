import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../Context/Context'
import { useRoomContext } from './RoomContext/RoomContextProvider'
import Users from './Users'
import Profile from './Profile'
import { CheckAndCloseRoom, RemoveUserFromRoom, getRoomTitle } from '../database'
import Chatts from './Chatts'

function MainRoom() {
    const {setRooming , user} = useAuthContext()
    const {mic , setMic , ProfileOpen , LeaveChanel , initRtc , chatting , setChatting} = useRoomContext()
    const [RoomTitle , setTitle] = useState('')
    const LeaveRoom=()=>{
        LeaveChanel()
        const roomId = localStorage.getItem('RoomID')
        RemoveUserFromRoom(user.uid , roomId)
        localStorage.removeItem('RoomID')
        setRooming(!!localStorage.getItem('RoomID') ? true:false )
        CheckAndCloseRoom(roomId)
    }



    useEffect(()=>{
    // console.log(RoomTitle);
    // location.reload()
    getRoomTitle(localStorage.getItem('RoomID')).then(title=>{
        setTitle(title)
        console.log('room set to :' ,title );
        
      })
      initRtc()
    
    },[])
  return (
    <div className='relative p-6 container mx-auto bg-[#353535] h-dvh  rounded-t-[1rem] flex-col flex gap-4'>
                {/* header */}
            <header className='flex items-center justify-between '>
            <h2 className="logo font-medium text-2xl">
                Echo<span className='text-red-500'>Pal</span><box-icon name='podcast' color={'white'}></box-icon>
            </h2>
            <div className="live-indicator">
            🔴 Live Now
            </div>
            </header>

                {/* title-of-the-room  */}
            <h2 className="title flex items-center font-medium gap-3">
            
            <span className='border-l-4 px-2 border-red-500 font-medium'>
                {RoomTitle && RoomTitle}
                </span>
            </h2>


                {/* audince and speakers user icons  */}
                <Users/>

                {/* user-menue happen operations here  */}
        <div className="menue absolute h-[100px] bg-black bottom-0 w-full left-0 rounded-t-[1rem] p-6 flex items-center justify-between">
            
            <div className="left">

            <button onClick={()=> LeaveRoom()}
             className='text-red-500  p-3 rounded'>

                <img
                className='w-[50px] h-[50px] rounded-full'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZ_cZ6cdJ5D3Eq1euwXiqPpYLdLBzuPvw_g&s"  />
                
            </button>

            </div>

            <div className="mid">
                <button className='bg-red-500 w-[50px] h-[50px] rounded-full p-3 flex items-center justify-center'
                onClick={()=> setChatting(true)}
                >
                <box-icon name='message-dots' color={'#ffff'}></box-icon>
                </button>
            </div>

            <div className="right">

                <div onClick={()=> setMic(!mic)}
                 className="mute-btn w-[40px] h-[40px] rounded-full bg-[#252525] flex items-center justify-center cursor-pointer">
                <box-icon name={mic ? 'microphone':'microphone-off'} color={'white'}></box-icon>
                </div>

            </div>


        </div>




            {ProfileOpen && <Profile/>}

            {chatting && <Chatts title={RoomTitle}/>}


    </div>
  )
}

export default MainRoom
