import React from 'react'
import heroImg from '../assets/imgs/hero.svg'
import logo from '../assets/imgs/logo.png'
import 'boxicons'
import roomImg from '../assets/imgs/Room.png'
import { authenticateUser } from '../Auth'
function Login() {
  return (
    <div className='flex items-center justify-center py-6 gap-2 h-screen flex-col text-center p-3 container mx-auto  md:w-[40rem] w-full  rounded-[1rem] '>

                {/* <div className="logo-img w-[200px]">
                  <img src={logo} alt="Echopal-logo" />
                </div> */}


                    <h2 className='font-bold text-3xl'>Log in</h2>

            <h2 className=' font-bold text-2xl'>Welcome 👋 to <span className='text-red-500'>EchoPal</span><box-icon name='podcast' color={'white'}></box-icon></h2>

                Create an Account To continue 

              <div className="roomImg">
                <img src={roomImg} />
              </div>

            <p className='underline color text-blue-500'>
            Do Not Violate Community Guidelines
            </p>

            <button onClick={()=> authenticateUser()}
            className='w-9/12 bg-white border border-red-500 flex text-black p-3 rounded items-center justify-center gap-3 mt-5'>
                <img className='w-[30px] h-[30px]' src="data:image/png;base64,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"  />
                Continue with 
                <span className='font-bold'>
                Google
                </span>
            </button>

    </div>
  )
}

export default Login
