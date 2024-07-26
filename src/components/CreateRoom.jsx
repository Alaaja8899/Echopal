import React from 'react'
import { useAuthContext } from '../Context/Context'

function CreateRoom() {
  const {CreatingRoom , setCreating } = useAuthContext()
  return (
        


        <div className="bottom bg-black w-full p-6 rounded fixed left-0 flex items-center justify-center  bottom-0">
        <button
        onClick={()=> setCreating(!CreatingRoom)}
        className='relative bg-red-500 w-[60px] h-[60px] rounded-full flex items-center justify-center top-[-50px] border-8 border-black'>


        <box-icon name={CreatingRoom ? 'x':'plus-circle'} size={'40px'} color={'white'}></box-icon>
        </button>

        </div>
  )
}

export default CreateRoom
