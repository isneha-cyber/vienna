import About1 from '@/Components/AboutPagee/about1'
import About2 from '@/Components/AboutPagee/About2'
import About3 from '@/Components/AboutPagee/About3'
import StellaFooter from '@/Components/LandingPage/Footer'
import Navbar from '@/Components/LandingPage/Navbar'
import Social from '@/Components/LandingPage/Social'
import React from 'react'

const About = () => {
  return (
    <>
      <Navbar textColor="black"/>
      
      {/* Page Header/Breadcrumb Section */}
      <div className="pb-8 px-4 sm:px-6 lg:px-24 mt-24 sm:mt-28">
        <div className="border-t border-gray-300 mb-4 sm:mb-6"></div>
        <nav className="text-sm sm:text-base max-w-7xl mx-auto">
          <ol className="flex items-center space-x-1">
            <li className="text-gray-600 hover:text-gray-900 transition-colors">
              <a href="/">Home</a>
            </li>
            <li className="text-gray-400">
              <span className="mx-1 sm:mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium leading-snug">
              About
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Main Content */}
      <main>
        <About1/>
      </main>
      <About2/>
      <About3/>
      
      {/* Footer */}
      <Social/>
      <StellaFooter/>
    </>
  )
}

export default About