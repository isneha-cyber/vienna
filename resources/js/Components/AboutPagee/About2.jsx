import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const About2 = () => {
  const mainImageRef = useRef(null)
  const overlayImageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Don't run on server side
    if (typeof window === 'undefined') return

    // Cleanup function
    const cleanups = []

    // Animation for main image
    if (mainImageRef.current) {
      const animation = gsap.fromTo(mainImageRef.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0.7
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mainImageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (window.innerWidth < 768) {
                animation.duration(1.2)
              }
            }
          }
        }
      )
      cleanups.push(() => animation.scrollTrigger?.kill())
    }

    // Animation for overlay image (delayed start)
    if (overlayImageRef.current) {
      const animation = gsap.fromTo(overlayImageRef.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0.5,
          x: 50
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          x: 0,
          duration: 2,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: overlayImageRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: true,
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (window.innerWidth < 768) {
                animation.duration(1.5)
              }
            }
          }
        }
      )
      cleanups.push(() => animation.scrollTrigger?.kill())
    }

    // Animation for text content
    if (textRef.current) {
      const animation = gsap.fromTo(textRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true,
            toggleActions: 'play none none reverse'
          }
        }
      )
      cleanups.push(() => animation.scrollTrigger?.kill())
    }

    // Cleanup animations on unmount
    return () => {
      cleanups.forEach(cleanup => cleanup())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
        
        {/* Left side - Main image container */}
        <div className="relative w-full lg:w-2/3">
          {/* First/main image */}
          <img 
            ref={mainImageRef}
            className="w-full h-auto object-cover"
            src="/images/ab2.jpg" 
            alt="Main resort view" 
          />
          
          {/* Text content */}
          <div 
            ref={textRef}
            className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 lg:px-24 lg:pt-24 lg:pe-36 pt-8"
          >
            <p className="text-sm md:text-base lg:text-md text-gray-800 font-light leading-relaxed">
              Our stunning rooms, bungalows, and villas are designed to be your absolute retreat to unwind and disconnect. Experience a slice of paradise where dreams reify into a realm of luxurious living, where time's grasp gently fades away. Comfort, elegance, and luxury intertwine to create a magical retreat.
            </p>
          </div>
          
          {/* Second/overlay image - Responsive positioning */}
          {/* Mobile: Below text, Desktop: Overlay on right side */}
          <div className="lg:absolute lg:top-24 lg:-right-96 lg:transform lg:translate-x-1/4 lg:w-1/3 mt-6 lg:mt-0 overflow-hidden">
            <img 
              ref={overlayImageRef}
              className="w-full h-full object-cover"
              src="/images/ab3.jpg" 
              alt="Room detail" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About2