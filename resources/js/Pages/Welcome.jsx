import Banner from '@/Components/LandingPage/Banner'
import CustomCursor from '@/Components/LandingPage/Customcursor'
import Escape from '@/Components/LandingPage/Escape'
import Experience from '@/Components/LandingPage/Experience'
import Hero from '@/Components/LandingPage/Hero'
import Island from '@/Components/LandingPage/island'
import Islandsignature from '@/Components/LandingPage/Islandsignature'
import Navbar from '@/Components/LandingPage/Navbar'
import Oasis from '@/Components/LandingPage/Oasis'
import Registernow from '@/Components/LandingPage/Registernow'
import Reviving from '@/Components/LandingPage/Reviving'
import Test from '@/Components/LandingPage/test'

import React from 'react'


const Welcome = () => {
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
 
  </>
  )
}

export default Welcome;