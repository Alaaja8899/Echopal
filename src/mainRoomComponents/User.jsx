import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../Context/Context';
import { useRoomContext } from './RoomContext/RoomContextProvider';

function User(props) {
    const {photo ,name , uid , muted}  = props.data
    const {authenticated , user} = useAuthContext()
    const {mic , setProfile , setPop , activeSpeakers} = useRoomContext()
    const [roles , setRoles] = useState({
        mod:false,
        super:false,
        user:false
    })
    const RolesDistinguesh=()=>{
        let updateRoles = {
            mod:false,
            super:false,
            user:false    
        }
        switch(props.type){
            case 'mod':
                updateRoles.mod=true
                break
            case 'super':
                updateRoles.super=true
                break
            default:
                updateRoles.user=true
            break  
        }
        setRoles(updateRoles)
    }



    const handleProfile=()=>{
        setPop({name:name , photo:photo , uid:uid})
        setProfile(true)
    }

    useState(()=>{
        // activeSpeakers && console.log(activeSpeakers);
    } ,[])
    useEffect(()=>{
        RolesDistinguesh()
        return(
            RolesDistinguesh()
        )
    },[props.type])
    return (
    <div className=' w-fit p-2 flex flex-col items-center justify-center gap-2 relative'>

            {/* {
                roles.super &&  <span className='badge absolute border top-0 right-0 bg-[#353535] w-[30px] h-[30px] rounded-full flex items-center justify-center' >👑</span>
            } */}
            {/* {
                roles.mod &&  <span className='badge absolute border top-0 right-0 bg-[#353535] w-[30px] h-[30px] rounded-full flex items-center justify-center' >🛡️</span>
            } */}
        <div onClick={()=> handleProfile()}
        className={`img-container cursor-pointer w-[80px] h-[80px] rounded-[30%] overflow-hidden ${(activeSpeakers && activeSpeakers.includes(uid)) ? 'border-red-500' : 'border-white'} border-2`}>
            <img src={photo} />
        </div>
        

                <div
                className="absolute bottom-9 left-0 mute-btn w-[30px] h-[30px] rounded-full bg-[#252525] flex items-center justify-center cursor-pointer">    
                <box-icon size={'20px'} name={!muted ? 'microphone':'microphone-off'} color={'white'}></box-icon>
                </div>
        

        {name && name.split(' ')[0]}
    </div>
  )
}

export default User
