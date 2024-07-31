import React, { useEffect, useState } from 'react'
import { getRoomTitle } from '../database'
import 'boxicons'
import { useRoomContext } from './RoomContext/RoomContextProvider'
function Chatts(prop) {
    // const [title , setTitle] = useState('')
    const {setChatting} = useRoomContext()

        // useEffect(()=>{        
        // } ,[])
  return (
    <div className='bg-[#353535] h-dvh  absolute top-0  bottom-[100px] right-0 rounded-t-[1rem] md:w-1/2 w-full'>
       
        <header className='fixed md:relative  bg-black  right-0 left-0 h-[70px] p-3 flex items-center justify-between'>

            <p
            className='border-l-4  border-red-500 px-3'
            >
                {prop.title}
            </p>

            <button onClick={()=> setChatting(false)}
            className='bg-[#252525] p-3 flex items-center justify-center rounded'
            >
            <box-icon name='x' color={'#ffff'}></box-icon>
            </button>

        </header>
        {/* where message going to display  */}
        <div className="messages-body border border-green-400">

        </div>




        <form action="" onSubmit={(e)=> e.preventDefault()}
        className=' h-[100px w-full h-[60px] absolute bottom-0 right-0 left-0 flex'
        >
            <input 
            className='w-full outline-none text-black rounded p-3'
            type="text" placeholder='Write a message ! ....' />
            <button>
                Send
            </button>
        </form>




    </div>
  )
}

export default Chatts
