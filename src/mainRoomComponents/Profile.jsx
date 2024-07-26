import React from 'react'
import { useAuthContext } from '../Context/Context'
import 'boxicons'
import { useRoomContext } from './RoomContext/RoomContextProvider'
function Profile() {
    const {user} = useAuthContext()
    const {setProfile , PopProfile} = useRoomContext()

  return (
    <div className='absolute bottom-0 bg-mainBg w-full left-0  h-fit rounded-t-[1rem] p-6 items-center justify-center flex flex-col'>
        <div className="header w-full justify-end flex items-center">

                <div onClick={()=>setProfile(false)}
                 className='cursor-pointer bg-[#353535] p-3 w-[40px] h-[40px] flex items-center justify-center rounded'>
                <box-icon name='x' color={'white'} size={'30px'}></box-icon>        
                </div>

        </div>



            <div className=" flex flex-col gap-3 items-center justify-center">


                    

                    <div className="img  rounded-[1rem] overflow-hidden relative">

                        <div 
                        className="badge-indicator absolute bg-mainBg rounded-[1rem] ">
                                🛡️
                        </div>

                                <img src={PopProfile && PopProfile.photo}  />
                    </div>



                    <h2
                    className='text-gray-400'
                    >
                        {
                            PopProfile && PopProfile.name
                        }
                    </h2>
                    

                    <h2
                    className='text-gray-400'
                    >
                        {
                            `UID : ${PopProfile && PopProfile.uid}`
                        }
                    </h2>
                    


                    {/* mod Controls */}
                    {/* <div className="controls  flex flex-col items-center justify-center text-center">

                        <button 
                        className="kick bg-red-500 p-2 rounded flex items-center justify-center gap-2">
                            <box-icon name='exit' color={'white'}></box-icon>
                            Remove from the room 
                            
                        </button>


                        <div className="badge flex flex-col gap-2 mt-4">
                            <p
                            className=' flex items-center justify-center'
                            >
                            <box-icon name='info-square' color={'white'} ></box-icon>
                                Give a badge only whom you trust
                            </p>
                            <button
                            className='border border-green-500 p-3 rounded'
                            >
                                Give a badge now 🛡️
                            </button>
                            <button
                            className='border border-red-500 p-3 rounded'
                            >
                                Remove a badge 🛡️
                            </button>
                        </div>

                    </div>
 */}

            </div>

    </div>
  )
}

export default Profile
