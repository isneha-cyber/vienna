// resources/js/Components/Welcome.js (or wherever your Welcome component is)
import Banner from '@/Components/LandingPage/Banner'
import CustomCursor from '@/Components/LandingPage/Customcursor'
import Escape from '@/Components/LandingPage/Escape'
import Experience from '@/Components/LandingPage/Experience'
import Footer from '@/Components/LandingPage/Footer'
import Hero from '@/Components/LandingPage/Hero'
import Island from '@/Components/LandingPage/island'
import Islandsignature from '@/Components/LandingPage/Islandsignature'
import Navbar from '@/Components/LandingPage/Navbar'
import Oasis from '@/Components/LandingPage/Oasis'
import Registernow from '@/Components/LandingPage/Registernow'
import Reviving from '@/Components/LandingPage/Reviving'
import Social from '@/Components/LandingPage/Social'
import Test from '@/Components/LandingPage/test'
import React from 'react'
import useSmoothScroll from '../Hooks/Usesmoothscroll' // Adjust path based on your structure

const Welcome = () => {
  // Use the smooth scroll hook
  useSmoothScroll();

  return (
    <>
      <CustomCursor/>
      <Navbar/>
      <Hero/>
      <Island/>
      <Islandsignature/>
      <Reviving/>
      <Experience/>
      <Banner/>
      <Test/>
      <Escape/>
      <Registernow/>
      <Oasis/>
      <Social/>
      <Footer/>
    </>
  )
}

export default Welcome;