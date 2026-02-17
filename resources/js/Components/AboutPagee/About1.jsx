import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const About1 = () => {
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

    // Animation for main image - ONLY ON MOBILE
    if (imageRef.current && isMobile) {
      const animation = gsap.fromTo(imageRef.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0.7
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            toggleActions: 'play none none reverse'
          }
        }
      )
      cleanups.push(() => animation.scrollTrigger?.kill())
    }

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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 py-4 md:py-8">
        {/* Content section - takes 1/3 on desktop, FIRST on mobile */}
        <div className="px-4 md:px-8 lg:px-12 xl:ps-20 order-1 lg:order-1 lg:col-span-1 pt-8">
          <h3 
            ref={headingRef}
            className='text-3xl md:text-4xl lg:text-5xl font-light text-gray-800'
          >
            ​Stella Island Luxury Resort & Spa, where luxury meets enchantment.
          </h3>
          <p 
            ref={el => paragraphsRef.current[0] = el}
            className='text-base md:text-md mt-4 md:mt-6 text-gray-600'
          >
            Our adults-only (15+) resort is a paradise inspired for couples in love and honeymooners seeking an idyllic getaway. Get ready to immerse in a world of opulence, surrounded by stunning lagoon-style pools that weave through our entire resort, offering countless scenic spots to capture your most cherished moments.
          </p>
          <p 
            ref={el => paragraphsRef.current[1] = el}
            className='text-base md:text-md mt-3 md:mt-4 text-gray-600'
          >
            At Stella Island, we invite you to welcome new sensations and spoil yourselves in a world of extraordinary hospitality experiences. Indulge in every aspect of 5-star elegance and unpretentious luxury, relishing every unfolding moment along your journey.
          </p>
        </div>
        
        {/* Image section - takes 2/3 on desktop, SECOND on mobile */}
        <div className='order-2 md:mt-0 mt-8 lg:order-2 lg:col-span-2 h-[300px] md:h-[400px] lg:h-[500px] xl:h-[800px]'>
          <img 
            ref={imageRef}
            className='w-full h-full object-cover' 
            src="/images/ab1.jpg" 
            alt="Stella Island Luxury Resort" 
          />
        </div>
      </div>
  
      <div className=" text-center from-neutral-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 tracking-3px leading-52px">
        <h3 
          ref={bottomHeading1Ref}
          className='text-5xl mb-8'
        >
          ​Every foodie' s paradise with 5 unique à la carte restaurants.
        </h3>
        <h3 
          ref={bottomHeading2Ref}
          className='text-4xl max-w-5xl mx-auto font-light'
        >
          Let us tempt you to a flavor-filled ride where each sip and bite is a playful explosion of deliciousness.
        </h3>
      </div>
    

    </>
  )
}

export default About1