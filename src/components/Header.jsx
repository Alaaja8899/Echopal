import React, { useState } from 'react'
import { useAuthContext } from '../Context/Context'
import { Link } from 'react-router-dom'
function Header() {
    const {authenticated , user} = useAuthContext()

    const logout = ()=>{
        localStorage.clear()
        location.reload()
    }
  return (
    <header className=' fixed bg-mainBg z-10 shadow righ-0 left-0 w-full top-0 py-3 px-2'>
        <div className="container mx-auto flex justify-between items-center  rounded  p-3    h-[64px] ">
            <h2 className="logo font-medium text-2xl">
                Echo<span className='text-red-500'>Pal</span><box-icon name='podcast' color={'white'}></box-icon>
            </h2>

            <div className="backMenue flex gap-3 items-center justify-between">
               <Link to={'/info'}> 
                <span className='cursor-pointer flex items-center'

                >
                <box-icon size={'35px'} name='info-circle' color={'#ef4444'}></box-icon>
                </span>
                </Link>

                <div onClick={()=> logout()}
                 className="photo w-[40px] h-[40px] rounded-full overflow-hidden cursor-pointer border border-red-500">
                <img src={user.photoURL}  />
                </div>

            </div>
        </div>
    </header>
  )
}

export default Header
