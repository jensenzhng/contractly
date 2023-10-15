import React, {useRef, useState} from 'react'
import { NavBar } from '../components/NavBar'
import { Link } from 'react-router-dom'
import { ContractAnalysis } from './ContractAnalysis'
import { ContractAnalytics } from './ContractAnalytics'
import { ContractifyPrivacy } from './ContractifyPrivacy'
import logo from '../assets/logo.png'

export function Home() {

    const privacy = useRef(null)
    const tool = useRef(null)
    const info = useRef(null)
    const home = useRef(null)

    const [curr, setCurr] = useState("home")

    return (
        <>
            <div className="fixed top-0 left-0 flex justify-between w-full items-center h-[12%] z-100">
                <Link to="/" className="text-white ml-[2rem] text-[2rem] w-[7rem]"><img src={logo} /></Link>
                <div className="flex justify-between w-[40%] mr-[2rem]">
                    <Link className={`${curr === "home" ? "text-[#9b28ed]" : "text-white"}`} onClick={() => {home.current.scrollIntoView();
                                setCurr("home")}} to="/">Home</Link>
                    <Link className={`${curr === "tool" ? "text-[#9b28ed]" : "text-white"}`} onClick={() => {tool.current.scrollIntoView();
                                setCurr("tool")}} to="">Contract Tool</Link>
                    <Link className={`${curr === "info" ? "text-[#9b28ed]" : "text-white"}`} onClick={() => {info.current.scrollIntoView();
                                setCurr("info")}} to="/">About our Tool</Link>
                    <Link className={`${curr === "privacy" ? "text-[#9b28ed]" : "text-white"}`} onClick={() => {privacy.current.scrollIntoView();
                                setCurr("privacy")}} to="#contractify-privacy">Privacy Extension</Link>
                </div>
            </div>
            <div ref={home} className="w-screen h-screen flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-[1rem] w-[75%] text-center">
                    <h1 className="text-center">Transform <span className="text-[#9b28ed]">Contract Analytics</span> and your <br /><span className="text-[#9b28ed]">Privacy</span> With Contractly</h1>
                    <p classname="text-center">Drastically reduce contract analysis time using complex AI models and summarize privacy statements in <br />real-time at the drop of a hat</p>
                </div>
                <div className="mt-[4rem] flex gap-[5rem]">
                    <button>&lt; <span className="underline" >Download Contractly Privacy</span> &gt;</button>
                    <Link onClick={() => {tool.current.scrollIntoView();
                                setCurr("tool")}} to="">&lt; <span className="underline" >Use our Contract Analytics AI</span> &gt;</Link>
                </div>
            </div>
            <h1 ref={tool}></h1>
            <ContractAnalysis />
            <h1 ref={info}></h1>
            <ContractAnalytics />
            <h1 ref={privacy}></h1>
            <ContractifyPrivacy ref={privacy}/>
        </>
    )
}