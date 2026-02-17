// import React, { useRef, useEffect } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger)

// const About3 = () => {
//   // Create refs for each image section
//   const serenityRef = useRef(null)
//   const lagoonRef = useRef(null)
//   const paradiseRef = useRef(null)
  
//   // Refs for desktop images
//   const desktopSerenityRef = useRef(null)
//   const desktopLagoonRef = useRef(null)
//   const desktopParadiseRef = useRef(null)

//   useEffect(() => {
//     // Mobile/Tablet animations
//     const serenityImg = serenityRef.current
//     const lagoonImg = lagoonRef.current
//     const paradiseImg = paradiseRef.current
    
//     // Desktop animations
//     const desktopSerenityImg = desktopSerenityRef.current
//     const desktopLagoonImg = desktopLagoonRef.current
//     const desktopParadiseImg = desktopParadiseRef.current

//     // Animation for Serenity Oasis (Mobile/Tablet)
//     if (serenityImg) {
//       gsap.fromTo(serenityImg,
//         {
//           opacity: 0,
//           y: 100,
//           scale: 0.8
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 1.2,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: serenityImg,
//             start: "top 80%", // When top of image hits 80% of viewport
//             end: "bottom 20%",
//             toggleActions: "play none none reverse"
//           }
//         }
//       )
//     }

//     // Animation for Lagoon Escape (Mobile/Tablet)
//     if (lagoonImg) {
//       gsap.fromTo(lagoonImg,
//         {
//           opacity: 0,
//           x: -100
//         },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.2,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: lagoonImg,
//             start: "top 80%",
//             end: "bottom 20%",
//             toggleActions: "play none none reverse"
//           }
//         }
//       )
//     }

//     // Animation for Unveiling Paradise (Mobile/Tablet)
//     if (paradiseImg) {
//       gsap.fromTo(paradiseImg,
//         {
//           opacity: 0,
//           x: 100
//         },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.2,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: paradiseImg,
//             start: "top 80%",
//             end: "bottom 20%",
//             toggleActions: "play none none reverse"
//           }
//         }
//       )
//     }

//     // Desktop Animations
//     if (desktopSerenityImg) {
//       gsap.fromTo(desktopSerenityImg,
//         {
//           opacity: 0,
//           y: 150,
//           scale: 0.9
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 1.5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: desktopSerenityImg,
//             start: "top 75%",
//             end: "bottom 25%",
//             scrub: 1 // Smooth scrubbing effect
//           }
//         }
//       )
//     }

//     if (desktopLagoonImg) {
//       gsap.fromTo(desktopLagoonImg,
//         {
//           opacity: 0,
//           x: -200
//         },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: desktopLagoonImg,
//             start: "top 75%",
//             end: "bottom 25%",
//             scrub: 1
//           }
//         }
//       )
//     }

//     if (desktopParadiseImg) {
//       gsap.fromTo(desktopParadiseImg,
//         {
//           opacity: 0,
//           x: 200
//         },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.5,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: desktopParadiseImg,
//             start: "top 75%",
//             end: "bottom 25%",
//             scrub: 1
//           }
//         }
//       )
//     }

//     // Clean up ScrollTrigger instances on unmount
//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill())
//     }
//   }, [])

//   return (
//     <>
//       <div className="block sm:hidden">
//         {/* Section 1: Serenity Oasis */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 pt-24 pb-12 text-center">
//           <img 
//             ref={serenityRef}
//             src="/images/ab4.jpg" 
//             alt="Serenity Oasis" 
//             className="w-full h-auto" 
//           />
//           <div className="max-w-5xl mx-auto mt-8">
//             <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Serenity Oasis</h3>
//             <p className="text-sm sm:text-base mt-4 px-4 sm:px-16 md:px-32 lg:ps-72 lg:pe-0">
//               Immerse yourself in a world of rejuvenation and calm at Anassa Spa, a sanctuary of pampered well-being. 
//               Indulge in multisensory techniques and Elemis therapies that restore harmony to your body and mind. 
//               Every moment is a playful escape into bliss, complemented by breathtaking views.
//             </p>
//           </div>
//         </div>

//         {/* Section 2: Lagoon Escape */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 pb-12">
//           <img 
//             ref={lagoonRef}
//             src="/images/ab5.jpg" 
//             alt="Lagoon Escape" 
//             className="w-full h-auto mb-6 sm:mb-8"
//           />
//           <div className="text-center">
//             <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6">Lagoon Escape</h3>
//             <p className="text-sm sm:text-base mt-4 px-4 sm:px-16 md:px-32 lg:px-48">
//               The massive lagoon pools wrap around the resort, creating an endless and soothing sensation of the element of water.
//             </p>
//           </div>
//         </div>

//         {/* Section 3: Unveiling Paradise */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 pb-24">
//           <img 
//             ref={paradiseRef}
//             src="/images/ab6.jpg" 
//             alt="Unveiling Paradise" 
//             className="w-full h-auto mb-6 sm:mb-8"
//           />
//           <div className="text-center">
//             <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-8">Unveiling Paradise</h3>
//             <p className="text-sm sm:text-base mt-4 px-4 sm:px-16 md:px-32 lg:px-48">
//               A magical luxurious escape that will leave you captivated, where the sun- and the moonlight reveal every moment a new aspect of its beauty. 
//               Capture mesmerizing, dreamy snapshots that beam pure bliss in one of our countless photogenic spots.
//             </p>
//           </div>
//         </div>
//       </div>
      
//       <div className="hidden sm:block">
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 pt-24 pb-12 text-center">
//           <img 
//             ref={desktopSerenityRef}
//             src="/images/ab4.jpg" 
//             alt="Serenity Oasis" 
//           />
//           <div className="max-w-5xl mx-auto">
//             <h3 className='text-7xl mt-8'>Serenity Oasis</h3>
//             <p className='text-md mt-4 ps-72'>
//               Immerse yourself in a world of rejuvenation and calm at Anassa Spa, a sanctuary of pampered well-being. 
//               Indulge in multisensory techniques and Elemis therapies that restore harmony to your body and mind. 
//               Every moment is a playful escape into bliss, complemented by breathtaking views.
//             </p>
//           </div>
//         </div>
        
//         <div className="l">
//           <img 
//             ref={desktopLagoonRef}
//             className='ps-52' 
//             src="/images/ab5.jpg" 
//             alt="Lagoon Escape" 
//           />
//           <div className="max-w-7xl mx-auto px-48">
//             <h3 className='text-7xl mt-6'>Lagoon Escape</h3>
//             <p className='text-md mb-8 mt-4'>
//               The massive lagoon pools wrap around the resort, creating an endless and soothing sensation of the element of water.
//             </p>
//           </div>
//         </div> 
         
//         <div className="l">
//           <img 
//             ref={desktopParadiseRef}
//             className='pe-52' 
//             src="/images/ab6.jpg" 
//             alt="Unveiling Paradise" 
//           />
//           <div className="max-w-7xl mx-auto px-48">
//             <h3 className='text-7xl mt-8'>Unveiling Paradise</h3>
//             <p className='text-md mt-4'>
//               A magical luxurious escape that will leave you captivated, where the sun- and the moonlight reveal every moment a new aspect of its beauty. 
//               Capture mesmerizing, dreamy snapshots that beam pure bliss in one of our countless photogenic spots.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default About3




import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const About3 = () => {
  // Create refs for each image section
  const serenityRef = useRef(null)
  const lagoonRef = useRef(null)
  const paradiseRef = useRef(null)
  
  // Refs for desktop images
  const desktopSerenityRef = useRef(null)
  const desktopLagoonRef = useRef(null)
  const desktopParadiseRef = useRef(null)

  useEffect(() => {
    // Mobile/Tablet animations
    const serenityImg = serenityRef.current
    const lagoonImg = lagoonRef.current
    const paradiseImg = paradiseRef.current
    
    // Desktop animations
    const desktopSerenityImg = desktopSerenityRef.current
    const desktopLagoonImg = desktopLagoonRef.current
    const desktopParadiseImg = desktopParadiseRef.current

    // Animation for Serenity Oasis (Mobile/Tablet) - Keep original animation
    if (serenityImg) {
      gsap.fromTo(serenityImg,
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: serenityImg,
            start: "top 80%", // When top of image hits 80% of viewport
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Animation for Lagoon Escape (Mobile/Tablet) - New clipPath animation
    if (lagoonImg) {
      gsap.fromTo(lagoonImg,
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
            trigger: lagoonImg,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (window.innerWidth < 768) {
                gsap.to(lagoonImg, { duration: 1.2 })
              }
            }
          }
        }
      )
    }

    // Animation for Unveiling Paradise (Mobile/Tablet) - New clipPath animation
    if (paradiseImg) {
      gsap.fromTo(paradiseImg,
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
            trigger: paradiseImg,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (window.innerWidth < 768) {
                gsap.to(paradiseImg, { duration: 1.2 })
              }
            }
          }
        }
      )
    }

    // Desktop Animations - Serenity keeps original animation
    if (desktopSerenityImg) {
      gsap.fromTo(desktopSerenityImg,
        {
          opacity: 0,
          y: 150,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: desktopSerenityImg,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1 // Smooth scrubbing effect
          }
        }
      )
    }

    // Desktop Animation for Lagoon Escape - New clipPath animation
    if (desktopLagoonImg) {
      const lagoonAnimation = gsap.fromTo(desktopLagoonImg,
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
            trigger: desktopLagoonImg,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Desktop Animation for Unveiling Paradise - New clipPath animation
    if (desktopParadiseImg) {
      const paradiseAnimation = gsap.fromTo(desktopParadiseImg,
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
            trigger: desktopParadiseImg,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <div className="block sm:hidden">
        {/* Section 1: Serenity Oasis */}
        <div className="max-w-7xl mx-auto px-4 sm:px-0 pt-24 pb-12  text-center">
          <img 
            ref={serenityRef}
            src="/images/ab4.jpg" 
            alt="Serenity Oasis" 
            className="w-full h-auto" 
          />
          <div className="max-w-5xl mx-auto mt-8">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Serenity Oasis</h3>
            <p className="text-sm sm:text-base mt-4 px-4 sm:px-16 md:px-32 lg:ps-72 lg:pe-0">
              Immerse yourself in a world of rejuvenation and calm at Anassa Spa, a sanctuary of pampered well-being. 
              Indulge in multisensory techniques and Elemis therapies that restore harmony to your body and mind. 
              Every moment is a playful escape into bliss, complemented by breathtaking views.
            </p>
          </div>
        </div>

        {/* Section 2: Lagoon Escape */}
        <div className="max-w-7xl mx-auto px-4 sm:px-0 pb-12">
          <img 
            ref={lagoonRef}
            src="/images/ab5.jpg" 
            alt="Lagoon Escape" 
            className="w-full h-auto mb-6 sm:mb-8"
          />
          <div className="text-center">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6">Lagoon Escape</h3>
            <p className="text-sm sm:text-base mt-4 px-4 sm:px-16 md:px-32 lg:px-48">
              The massive lagoon pools wrap around the resort, creating an endless and soothing sensation of the element of water.
            </p>
          </div>
        </div>

        {/* Section 3: Unveiling Paradise */}
        <div className="max-w-7xl mx-auto px-4 sm:px-0 pb-24">
          <img 
            ref={paradiseRef}
            src="/images/ab6.jpg" 
            alt="Unveiling Paradise" 
            className="w-full h-auto mb-6 sm:mb-8"
          />
          <div className="text-center">
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-8">Unveiling Paradise</h3>
            <p className="text-sm sm:text-base mt-4 px-4 sm:px-16 md:px-32 lg:px-48">
              A magical luxurious escape that will leave you captivated, where the sun- and the moonlight reveal every moment a new aspect of its beauty. 
              Capture mesmerizing, dreamy snapshots that beam pure bliss in one of our countless photogenic spots.
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-0 pt-24 pb-12 text-center">
          <img 
            ref={desktopSerenityRef}
            src="/images/ab4.jpg" 
            alt="Serenity Oasis" 
          />
          <div className="max-w-5xl mx-auto">
            <h3 className='text-7xl mt-8'>Serenity Oasis</h3>
            <p className='text-md mt-4 ps-72'>
              Immerse yourself in a world of rejuvenation and calm at Anassa Spa, a sanctuary of pampered well-being. 
              Indulge in multisensory techniques and Elemis therapies that restore harmony to your body and mind. 
              Every moment is a playful escape into bliss, complemented by breathtaking views.
            </p>
          </div>
        </div>
        
        <div className="l">
          <img 
            ref={desktopLagoonRef}
            className='ps-52' 
            src="/images/ab5.jpg" 
            alt="Lagoon Escape" 
          />
          <div className="max-w-7xl mx-auto px-48">
            <h3 className='text-7xl mt-6'>Lagoon Escape</h3>
            <p className='text-md mb-8 mt-4'>
              The massive lagoon pools wrap around the resort, creating an endless and soothing sensation of the element of water.
            </p>
          </div>
        </div> 
         
        <div className="l">
          <img 
            ref={desktopParadiseRef}
            className='pe-52' 
            src="/images/ab6.jpg" 
            alt="Unveiling Paradise" 
          />
          <div className="max-w-7xl mx-auto px-48">
            <h3 className='text-7xl mt-8'>Unveiling Paradise</h3>
            <p className='text-md mt-4'>
              A magical luxurious escape that will leave you captivated, where the sun- and the moonlight reveal every moment a new aspect of its beauty. 
              Capture mesmerizing, dreamy snapshots that beam pure bliss in one of our countless photogenic spots.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About3