import React, { useEffect, useState } from 'react'
import 'boxicons'
// import { getAllUsers } from '../admin'






const AuthUsers = () => {

    const [users , setUsers] = useState([])

        useEffect(()=>{
            // getAllUsers().then(users => {
            //     console.log(users);
            //   });  
              
        } , [])
        

    return (
    <div className='mt-[100px]   px-6 py-3 rounded flex flex-col gap-3'>

            <h2
            className='font-bold border-l-4 border-red-500 px-3'
            >
            
            Users joinded the Echopal <br />
            <p
            className='text-[#777]'
            >
            // This feature is not available yet!
            </p>

            </h2>

    <div className="flex overflow-x-auto  gap-4">
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
        <User/>
    </div>

    </div>
  )
}


const User =()=>{
    return(
        <div className=" relative user min-w-[60px] min-h-[60px] rounded-[30%] overflow-hidden cursor-pointer">
            <img
             src="https://lh3.googleusercontent.com/a/ACg8ocKfAsmX3-btann2Wt7LkCaCMtuSHe2JAZ6zhw4peJXTINRfbnhR=s96-c"  />
            <span
            className='absolute bottom-0 right-0 bg-mainBg rounded translate-y-[4px]'
            >
            <box-icon type='solid' name='calendar' color={'white'}></box-icon>
            </span>
        </div>
    )
}

export default AuthUsers
