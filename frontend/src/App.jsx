import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home as HomeIcon } from "lucide-react"

import NavBar from "./Components/NavBar.jsx"
import SideBar from "./Components/SideBar.jsx"

import Home from "./Pages/Home.jsx"
import About from "./Pages/About.jsx"
import Login from "./Components/Auth/Login.jsx"
import SignUp from "./Components/Auth/SignUp.jsx"

export default function App() {
  return (
    <div className="h-screen bg-gray-100">
      <BrowserRouter>

        <Routes>
          {/* Auth routes without SideBar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Main routes with NavBar and SideBar */}
          <Route path="/" element={
            <>
              <SideBar />
              <div className="flex flex-col flex-1">
                <NavBar />
                <main className="flex-1 overflow-y-auto p-4">
                  <Home />
                </main>
              </div>
            </>
          } />
          
          <Route path="/about" element={
            <>
              <SideBar />
              <div className="flex flex-col flex-1">
                <NavBar />
                <main className="flex-1 overflow-y-auto p-4">
                  <About />
                </main>
              </div>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}