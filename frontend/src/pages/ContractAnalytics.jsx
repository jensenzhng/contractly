import React from 'react'
import { NavBar } from '../components/NavBar'
import Chart from '../assets/chart.png'

export function ContractAnalytics() {

    return (
        <>
            <div className="h-screen w-screen flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-[3rem]">
                    <h1>Contract Analytics</h1>
                    <div className="w-[75rem] h-[25rem] card-radial-gradient rounded-[5rem] grid grid-cols-2">
                    </div>
                    <div className="w-[70rem] h-[25rem] mt-[10rem] z-[20] absolute grid grid-cols-2 items-center">
                        <img className="rounded-[2rem] h-[19rem]" src={Chart} />
                        <p className="text-center">Discover the transformative power of Contract AI—a cutting-edge technology revolutionizing the way businesses manage contracts. Employing advanced artificial intelligence algorithms, Contractly enhances contract management processes, offering unmatched efficiency, accuracy, and time savings by automating tedious tasks, extracting key contract data, and generating valuable insights.</p>
                    </div>
                </div>
            </div>
        </>
    )
}