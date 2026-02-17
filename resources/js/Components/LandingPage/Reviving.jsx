import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Reviving = () => {
  const leftImageRef = useRef(null)
  const rightImageRef = useRef(null)
  const leftTextRef = useRef(null)
  const rightTextRef = useRef(null)

  useEffect(() => {
    if (!leftImageRef.current || !rightImageRef.current) return

    // Animation for left side image
    const leftAnimation = gsap.fromTo(leftImageRef.current, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0.7
    }, {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: leftImageRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        toggleActions: 'play none none reverse',
        onEnter: () => {
          if (window.innerWidth < 768) {
            leftAnimation.duration(1.2)
          }
        }
      }
    })

    // Animation for right side image
    const rightAnimation = gsap.fromTo(rightImageRef.current, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0.7
    }, {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: rightImageRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        toggleActions: 'play none none reverse',
        onEnter: () => {
          if (window.innerWidth < 768) {
            rightAnimation.duration(1.2)
          }
        }
      }
    })

    // Text animations
    gsap.fromTo(leftTextRef.current, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: leftTextRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.fromTo(rightTextRef.current, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: rightTextRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      leftAnimation.scrollTrigger?.kill()
      rightAnimation.scrollTrigger?.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:py-24 py-12 sm:px-0 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
        {/* Left side - lowered with pt-8 md:pt-12 */}
        <div className="pt-8 md:pt-12 lg:pt-16">
          <h3 
            ref={leftTextRef}
            className='text-3xl sm:text-4xl md:text-5xl font-light from-neutral-50 leading-tight sm:leading-[32px] tracking-wide sm:tracking-3px mb-8 md:mb-12'
          >
            Reviving Wellness
          </h3>
          <div className="overflow-hidden ">
            <img 
              ref={leftImageRef}
              className='w-[750px] h-auto object-cover transition-transform duration-300 hover:scale-105' 
              src="/images/img3.jpg" 
              alt="Reviving Wellness"
              style={{ opacity: 0.7 }} // Initial opacity for animation
            />
          </div>
        </div>
        
        {/* Right side */}
        <div className="relative">
          <div className="relative mb-8 md:mb-12">
            <h3 
              ref={rightTextRef}
              className='text-3xl sm:text-4xl md:text-5xl font-light from-neutral-50 leading-tight sm:leading-[32px] tracking-wide sm:tracking-3px text-center'
            >
              The Island 
              
            </h3>
          </div>
          <div className="overflow-hidden ">
            <img 
              ref={rightImageRef}
              src="/images/img4.jpg" 
              className='w-full h-[600px] max-w-full object-cover transition-transform duration-300 hover:scale-105' 
              alt="Island Gastronomy"
              style={{ opacity: 0.7 }} // Initial opacity for animation
            />
          </div>
         <h3> <span className='text-3xl sm:text-4xl md:text-5xl z-20 block md:absolute md:top-20 md:left-1/2 md:transform md:-translate-x-1/2 lg:left-auto lg:transform-none lg:top-14 lg:left-32 mt-2 '>
                Gastronomy
              </span>
              </h3>
        </div>
      </div>
    </>
  )
}

export default Reviving