import React, { useEffect, useState } from 'react'
import Room from './Room'
import { useAuthContext } from '../Context/Context'
import { CheckAndCloseRoom, CloseRoom, CreateNewRoom, JoinUserToRoom } from '../database'
import {database} from '../database.js'
import {useObject , useObjectVal} from 'react-firebase-hooks/database'
import { ref , query , orderByChild } from 'firebase/database'
import Authusers from './AuthUsers.jsx'





function Rooms() {
  const {CreatingRoom , setCreating} = useAuthContext()
  const RoomsRef = ref(database, `Rooms`);
  const queryRef = query(RoomsRef, orderByChild('timestamp'));
  const [snapshot, loading, error] = useObject(queryRef);
  

  const snapshotToArray = (snapshot) => {
    const array = [];
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      array.push(item);
    });
    return array;
  };



    useEffect(()=>{


    } , [])

  return (
    <div className='  container mx-auto flex flex-wrap gap-3 justify-around items-center   overflow-y-scroll px-3 py-6 pb-[150px]'>

        <Authusers/>

        {
          snapshot && snapshotToArray(snapshot).reverse().map(room=>{
            return <Room data={room}/>
          })
        }


        {/* Room-like-box-for-creating-new-room */}

        {
          snapshot && snapshotToArray(snapshot).length >=1 &&         <div onClick={()=> setCreating(!CreatingRoom)}
          className="relative h-[150px] border-dashed border md:w-[30rem] w-full rounded-[1rem] p-3 flex items-center justify-center hover:border-red-500 cursor-pointer">
             
         <span className='Room absolute top-[-8px] left-[-5px]   rounded-full bg-mainBg w-[30px] h-[30px] flex items-center justify-center'>
         <box-icon type='solid' name='home' color={'green'}></box-icon>
         </span>
   
           <h2><box-icon name='plus' color={'white'}></box-icon>Create new Room</h2>
         </div>
 
        }


        {CreatingRoom && <CreateRoomNow/>}


    </div>
  )
}



    const CreateRoomNow=()=>{
      const {setRooming , setCreating} = useAuthContext()
      const [textValue , setValue] = useState('')
      const {user} = useAuthContext()
      const logout = ()=>{
        localStorage.clear()
        location.reload()
    }
      const  handleCreatingRoom= async (e)=>{
            e.preventDefault()
            if (textValue.length >0 && !user.isGuest){

              await CreateNewRoom(textValue , user)

              await JoinUserToRoom(user.photoURL , user.uid ,user.displayName , user.uid)
              localStorage.setItem('RoomID' , user.uid)
              setRooming(localStorage.getItem('RoomID') ? true:false)
              setCreating(false)
            }
      }

      return(
        <div className=" absolute formCreateRoom  h-dvh bg-mainBg top-[88px] left-0   flex items-start justify-center   py-3 w-full p-3">

            <form onSubmit={(e)=> handleCreatingRoom(e)}
             className='relative flex flex-col bg-[#353535] md:w-[30rem] w-full rounded-[1rem] p-4  gap-4 text-center'>
            
            <span className='Room absolute top-[-8px] left-[-5px]   rounded-full bg-mainBg w-[30px] h-[30px] flex items-center justify-center'>
                  <box-icon type='solid' name='home' color={'green'}></box-icon>
            </span>



              <h2 className='font-medium text-2xl'>Live SetUp <box-icon name='wrench' color={'white'}></box-icon></h2>

              {
                user.isGuest && <div className='flex flex-col gap-2'>
                                <p>
              Create an Account To continue
              </p>
              <p className='error text-red-500 bg-[rgb(255,0,0,0.2)] p-3 rounded'>
              In GuestMode  You can't create Room !
              </p>
                </div>
              }

              <input onChange={(e)=> setValue(e.target.value)} 
              className=' bg-transparent border-red-400 border  outline-none rounded-[0.5rem] p-3 text-white' type="text" placeholder='Room Title ' />
              <button
              className={`bg-red-500 p-3 rounded-[0.5rem] ${user.isGuest &&  'cursor-not-allowed bg-transparent border'}`}
              >
                Go live now <box-icon name='podcast' color={'white'}></box-icon>
              </button>


              {
                user.isGuest &&               <button onClick={()=> logout()}
                className='bg-gray-500 rounded p-3 flex items-center justify-center gap-3'
                >
                  LogOut & Create an Account
                  <box-icon type='solid' name='left-arrow-square' color={'#ffff'}></box-icon>
                </button>
  
              }

            </form>


        </div>

      )
    }




export default Rooms
