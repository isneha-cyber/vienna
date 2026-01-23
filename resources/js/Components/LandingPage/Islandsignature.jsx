import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Islandsignature = () => {
  const firstImageRef = useRef(null)
  const secondImageRef = useRef(null)

  useEffect(() => {
    if (!firstImageRef.current || !secondImageRef.current) return

    // First image animation
    const firstAnimation = gsap.fromTo(firstImageRef.current, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0.7
    }, {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: firstImageRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        toggleActions: 'play none none reverse',
        onEnter: () => {
          if (window.innerWidth < 768) {
            firstAnimation.duration(1.2)
          }
        }
      }
    })

    // Second image animation - slightly delayed for staggered effect
    const secondAnimation = gsap.fromTo(secondImageRef.current, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0.7
    }, {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: secondImageRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: true,
        toggleActions: 'play none none reverse',
        onEnter: () => {
          if (window.innerWidth < 768) {
            secondAnimation.duration(1.2)
          }
        }
      }
    })

    // Cleanup function
    return () => {
      firstAnimation.scrollTrigger?.kill()
      secondAnimation.scrollTrigger?.kill()
    }
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 py-12 sm:py-24 gap-6 sm:gap-12 px-4 sm:px-0">
      {/* First image - spans 4 columns on large, full width on smaller */}
      <div className="lg:col-span-4 w-full overflow-hidden">
        <img 
          ref={firstImageRef}
          src="/images/img1.jpg" 
          alt="image3" 
          className="w-full h-auto object-cover"
          style={{
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0.7
          }}
        />
      </div>
      
      {/* Second column - spans 2 columns on large, full width on smaller */}
      <div className="lg:col-span-2 w-full flex flex-col">
        {/* Second image */}
        <div className="w-full overflow-hidden">
          <img 
            ref={secondImageRef}
            src="/images/img2.jpg" 
            alt="image4" 
            className="w-full h-auto object-cover"
            style={{
              clipPath: 'inset(0 100% 0 0)',
              opacity: 0.7
            }}
          />
        </div>
        
        {/* Text content */}
        <div className="py-6 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-full">
          <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight'>
            Island Signature
          </h2>
          <p className='text-base sm:text-lg lg:text-xl pt-4 sm:pt-6 lg:pt-8 leading-relaxed text-gray-700'>
            That premium feel you've been searching for. Dive into the lap of luxury with the most elegant vibes, the most refined gastronomy, and the most pampering spa treatments.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Islandsignature