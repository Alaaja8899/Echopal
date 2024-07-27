import React from 'react'
import myIMG from '../assets/imgs/me.jpeg'
import { Link } from 'react-router-dom'


function AboutMe() {
  return (
    <div className='h-screen flex items-center justify-center  container mx-auto'>


        <div className="card bg-[#353535] md:w-9/12 w-full p-3 rounded flex flex-col items-center justify-center ">

            <div className="header flex items-center justify-between border rounded border-red-500 p-3 w-full">
            <Link to={'/'}>
                <span className='text-center'>
                    Back
                </span>
            </Link>
            <Link to={'/'}>
                <span>

                </span>
            </Link>

            </div>


            <div className="sec-1 flex flex-col gap-2">


                <div className="img-container w-[300px] rounded-[30%] overflow-hidden border border-red-500">
                    <img src={myIMG} alt="CEO of echopal alaaja" />
                </div>
                <div className="socials flex items-center justify-center gap-3">

                    <a href="https://instagram.com/abdirizak.alaaja"
                    className='p-1  rounded bg-red-500 flex items-center justify-center'
                    >
                    <box-icon color={'#ffff'} type='logo' name='instagram-alt'></box-icon>
                    </a>
                    <a href="https://facebook.com/abdirizak.alaaja"
                                        className='p-1  rounded bg-red-500 flex items-center justify-center'

                    >
                    <box-icon color={'#ffff'} type='logo' name='facebook-circle'></box-icon>                    </a>
                    <a href="https://github.com/alaaja8899"
                                        className='p-1  rounded bg-red-500 flex items-center justify-center'
>
                    <box-icon color={'#ffff'} name='github' type='logo' ></box-icon>                    </a>
                    <a 
                    href="https://wa.me/+252611430930" target='_blank'
                    className='p-1  rounded bg-red-500 flex items-center justify-center'

                    >
                    <box-icon color={'#ffff'} name='whatsapp' type='logo' ></box-icon>                    </a>

                </div>
            </div>
            <div className="sec-2">


                <h2 className='text-center font-bold text-2xl'>
                Abdirizak abdullahi hussein(Alaaja)
                </h2>

                <h2 className='text-2xl text-center'>
                CEO & Founder of <span className='text-red-500 font-bold'> EchoPal</span>
                </h2>
                <p className='text-center flex items-center justify-center'>
                Echopal is a live audio streaming web application where users can create and join various rooms to chat with friends or meet new people. It helps communities discuss their interests, whether it's anime (for otaku people), for developers , for family & freind or classmates discussion ,
                i'm Abdirizak computer science Student , passionate about coding , anime , creating new things taking challanges and overall developing my skills .
                </p>

                <button>

                </button>



            </div>



        </div>





    </div>
  )
}

export default AboutMe
