import { useState } from 'react'
import './App.css'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { ContractAnalysis } from './pages/ContractAnalysis'
import { ContractifyPrivacy } from './pages/ContractifyPrivacy'
import { ContractAnalytics } from './pages/ContractAnalytics'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/contract-analytics" element = {<ContractAnalysis />} />
        <Route path="/contract-analytics/info" element={<ContractAnalytics />} />
        <Route path="/contractify-privacy" element={<ContractifyPrivacy />} />
      </Routes>
    </>
  )
}

export default App
