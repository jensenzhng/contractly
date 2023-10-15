import React from 'react'
import { Link } from 'react-router-dom'

export function NavBar() {

    return (
        <div className="fixed top-0 left-0 flex justify-between w-full items-center h-[10%] z-100">
            <Link to="/" className="ml-[2rem] text-[2rem]">Contractify</Link>
            <div className="flex justify-between w-[30%] mr-[2rem]">
                <Link to="/">Home</Link>
                <Link to="#contractify-privacy">Contractify Privacy</Link>
                <Link to="/contract-analytics/info">Contract Tool</Link>
                <button onClick={(e) => {e.preventDefault();
                window.location.replace("/#contractify-privacy")}}>
                    <span>go to about</span>
                </button>
            </div>
        </div>
    )
}