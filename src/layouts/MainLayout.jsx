import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-1 mt-16 p-6">
        {children}
      </main>
      <Footer/>
    </div>
  )
}
