import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Winedine1 = () => {
  const imageRef = useRef(null)
  const headingRef = useRef(null)
  const paragraphsRef = useRef([])
  const bottomHeading1Ref = useRef(null)
  const bottomHeading2Ref = useRef(null)

  // Initialize refs array for paragraphs
  useEffect(() => {
    paragraphsRef.current = paragraphsRef.current.slice(0, 2)
  }, [])

  useEffect(() => {
    // Don't run on server side
    if (typeof window === 'undefined') return

    // Check if screen is mobile/small (less than 768px)
    const isMobile = window.innerWidth < 768
    
    // If not mobile, don't apply any animations
    if (!isMobile) return

    const cleanups = []

  

    // Animation for heading - ONLY ON MOBILE
    if (headingRef.current && isMobile) {
      const animation = gsap.fromTo(headingRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true,
            toggleActions: 'play none none reverse'
          }
        }
      )
      cleanups.push(() => animation.scrollTrigger?.kill())
    }

    // Animations for paragraphs - ONLY ON MOBILE
    paragraphsRef.current.forEach((paragraph, index) => {
      if (paragraph && isMobile) {
        const animation = gsap.fromTo(paragraph,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.1 + (index * 0.1), // Stagger effect
            scrollTrigger: {
              trigger: paragraph,
              start: 'top 90%',
              end: 'bottom 10%',
              scrub: true,
              toggleActions: 'play none none reverse'
            }
          }
        )
        cleanups.push(() => animation.scrollTrigger?.kill())
      }
    })

    // Animation for bottom heading 1 - ONLY ON MOBILE
    if (bottomHeading1Ref.current && isMobile) {
      const animation = gsap.fromTo(bottomHeading1Ref.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bottomHeading1Ref.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true,
            toggleActions: 'play none none reverse'
          }
        }
      )
      cleanups.push(() => animation.scrollTrigger?.kill())
    }

    // Animation for bottom heading 2 - ONLY ON MOBILE
    if (bottomHeading2Ref.current && isMobile) {
      const animation = gsap.fromTo(bottomHeading2Ref.current,
        {
          opacity: 0,
          y: 25
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: bottomHeading2Ref.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true,
            toggleActions: 'play none none reverse'
          }
        }
      )
      cleanups.push(() => animation.scrollTrigger?.kill())
    }

    // Handle window resize - remove animations if screen becomes larger
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Kill all animations if screen becomes md or larger
        cleanups.forEach(cleanup => cleanup())
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup animations on unmount
    return () => {
      cleanups.forEach(cleanup => cleanup())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 py-8 md:py-12 lg:py-16 xl:py-20 ">
        
        {/* Content Section */}
        <div className="sm:pt-20 order-1 lg:order-1 lg:col-span-1 flex flex-col justify-centerpx-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h3 
              ref={headingRef}
              className='text-3xl sm:text-4xl md:text-5xl  font-light text-gray-700 leading-tight'
            >
              Wine & Dine
            </h3>
            
            <div className="space-y-4 md:space-y-6">
              <p 
                ref={el => paragraphsRef.current[0] = el}
                className='text-base md:text-lg  text-gray-600 leading-relaxed'
              >
                A vibrant dining experience awaits you at Stella Island. The most tantalizing gastronomic destination in Crete lies within our heavenly resort.
              </p>
              
              <h2
                ref={el => paragraphsRef.current[1] = el}
                className='text-xl md:text-2xl lg:text-4xl font-medium text-gray-700 leading-tight'
              >
                Spoil me in the Island
              </h2>
              
              <h3 className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-800'>
                The all-inclusive project
              </h3>
            </div>

            <div className="pt-2">
              <button className='px-6 md:px-8 py-2 text-sm md:text-base lg:text-lg border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-colors duration-300'>
                More Info
              </button>
            </div>
          </div>
        </div>
        
        {/* Image Section */}
        <div className='order-2 lg:order-2 lg:col-span-2 h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] w-full'>
          <img 
            ref={imageRef}
            className='w-full h-full object-cover '
            src="/images/wine.jpg" 
            alt="Stella Island Luxury Resort" 
          />
        </div>
      </div>
  
     
    </div>
  )
}

export default Winedine1