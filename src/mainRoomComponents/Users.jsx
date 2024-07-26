import React, { useEffect, useState } from 'react'
import User from './User'
import { useRoomContext } from './RoomContext/RoomContextProvider.jsx'
import {database} from '../database.js'

import {useObject} from 'react-firebase-hooks/database'
import { ref , query , orderByChild } from 'firebase/database'

function Users() {

  const roomID = localStorage.getItem('RoomID')
  const RoomsRef = ref(database, `Rooms/${roomID}/users`);
  const queryRef = query(RoomsRef, orderByChild('timestamp'));
  const [snapshot, loading, error] = useObject(queryRef);

  const {mic} = useRoomContext()  

  const snapshotToArray = (snapshot) => {
    const array = [];
    snapshot.forEach((childSnapshot) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      array.push(item);
    });
    return array;
  };
  const   users= snapshot && snapshotToArray(snapshot)


    useEffect(()=>{


        // console.log(users);

    } , [])

  return (
    <div className='flex flex-wrap gap-2 overflow-y-scroll pb-[110px] md:justify-start justify-between'>
        {/* <User type='super'/> */}
        


        {users && users.map(data=>{
        return  <User data={data} type={data.role} />
        })}


    </div>
  )
}

export default Users
