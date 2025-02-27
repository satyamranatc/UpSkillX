import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home as HomeIcon } from "lucide-react"

import NavBar from "./Components/NavBar.jsx"
import SideBar from "./Components/SideBar.jsx"

import Home from "./Pages/Home.jsx"
import Courses from "./Pages/Courses.jsx"
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
          <Route 
            path="/" 
            element={<MainLayout><Home /></MainLayout>} 
          />
          
          <Route 
            path="/courses" 
            element={<MainLayout><Courses /></MainLayout>} 
          />

          <Route 
            path="/about" 
            element={<MainLayout><About /></MainLayout>} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

// Create a layout component to avoid repetition
function MainLayout({ children }) {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="flex flex-col flex-1">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}