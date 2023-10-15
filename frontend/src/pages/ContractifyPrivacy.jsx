import React from 'react'
import { NavBar } from '../components/NavBar'
import Github from '../assets/github.png'
import Stack from '../assets/stack.png'

export function ContractifyPrivacy() {

    return (
        <>
            <div id='#contractify-privacy' className="w-screen h-screen flex flex-col justify-center items-center gap-[5rem]">
                <div className="flex flex-col justify-center items-center w-[70%]">
                    <h1>Contractly Privacy</h1>
                    {/* <h2>Privacy at your fingertips</h2> */}
                    <p className="text-center">In an age of digital connections, safeguarding your personal data is crucial. Discover the significance of website privacy: from protecting your information to building trust, staying compliant with laws, and safeguarding your reputation. Explore the world of online safety and make informed choices for a secure digital experience.</p>
                </div>
                <div className="flex gap-[8rem]">
                    <img className="border-1 h-[20rem] border-black rounded-[1rem]" src={Github}/>
                    <img className="border-1 h-[20rem] border-black rounded-[1rem]" src={Stack}/>
                    {/* <img className="border-1 h-[5rem] w-[5rem] border-black rounded-[1rem]" /> */}
                </div>
            </div>
        </>
    )
}