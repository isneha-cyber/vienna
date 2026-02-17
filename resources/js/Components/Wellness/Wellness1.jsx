import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Wellness1 = () => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const mobileLeftImageRef = useRef(null);
  const mobileRightImageRef = useRef(null);
  const mobileDescriptionRef = useRef(null);

  // Treatment description text (shared for consistency)
  const treatmentDescription = `Techniques from around the world are designed to release tension and restoring body and mind to a natural state of harmony. The pampering treatment menu features complete lines of restorative therapies by Elemis, designed to invigorate the body, enliven the senses and soothe the mind after a day of enjoying the sun and the sea. In the same area guests can enjoy a great variety of services such as Sauna, Hammam, Jacuzzi, indoor heated pool, Massage rooms and Fitness room, along with the magnificent sea & pool views.`;

  useEffect(() => {
    // Desktop animations (for screens >= 768px)
    if (window.innerWidth >= 768) {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

   
      // Animate left image (slide in from left)
      if (leftImageRef.current) {
        gsap.fromTo(leftImageRef.current,
          {
            x: -100,
            opacity: 0,
            clipPath: 'inset(0 0 0 100%)'
          },
          {
            x: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0 0%)',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftImageRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              scrub: 0.5,
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animate right image (slide in from right)
      if (rightImageRef.current) {
        gsap.fromTo(rightImageRef.current,
          {
            x: 100,
            opacity: 0,
            clipPath: 'inset(0 0 0 100%)'
          },
          {
            x: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0 0%)',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightImageRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              scrub: 0.5,
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

    } else {
      // Mobile animations (for screens < 768px)
      
      // Animate title for mobile
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 90%',
              end: 'bottom 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // REMOVED: Main image animation for mobile too

      // Animate mobile top image
      if (mobileLeftImageRef.current) {
        gsap.fromTo(mobileLeftImageRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mobileLeftImageRef.current,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animate mobile bottom image
      if (mobileRightImageRef.current) {
        gsap.fromTo(mobileRightImageRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: mobileRightImageRef.current,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animate mobile description
      if (mobileDescriptionRef.current) {
        gsap.fromTo(mobileDescriptionRef.current,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mobileDescriptionRef.current,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* First section - already responsive */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 md:py-24">
        <h3 
          ref={titleRef} 
          className="text-4xl sm:text-5xl md:text-6xl text-center font-bold mb-8"
        >
          Wellness
        </h3>
       <img
  className="w-full max-w-[500px] mx-auto pt-8 sm:pt-12 md:pt-24 mb-8 sm:mb-12 sm:max-w-none sm:w-auto md:max-w-4xl"
  src="/images/well1.jpg"
  alt="Wellness sanctuary"
  loading="lazy"
/>
        <p
          ref={descriptionRef}
          className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto text-center leading-relaxed"
        >
          Experience a true sanctuary of pampering and wellness, where genuine
          warmth and hospitality are unique to this enchanting land. Immerse
          yourself in the world of Elemis as you indulge in our spa treatments,
          crafted to leave you feeling refreshed, revitalized, and truly
          pampered.
        </p>
      </div>

      {/* Responsive section: Mobile-first stacked layout */}
      <div className="relative w-full px-4 py-8 sm:py-12 md:hidden">
        <img
          ref={mobileLeftImageRef}
          className="w-full h-auto object-cover mb-6"
          src="/images/well2.jpg"
          alt="Wellness treatment room"
          loading="lazy"
        />
        <img
          ref={mobileRightImageRef}
          className="w-full h-auto object-cover mb-8"
          src="/images/well3.jpg"
          alt="Spa treatment details"
          loading="lazy"
        />
        <p 
          ref={mobileDescriptionRef}
          className="text-base sm:text-lg max-w-4xl mx-auto text-center leading-relaxed"
        >
          {treatmentDescription}
        </p>
      </div>

      {/* Desktop layout (MD and above) - Original design preserved with fixes */}
      <div className="hidden md:block relative min-h-[1000px] w-full overflow-hidden px-4">
        <img
          ref={leftImageRef}
          className="absolute left-0 top-0 h-[650px] w-1/2 object-cover object-left"
          src="/images/well2.jpg"
          alt="Wellness treatment room"
          loading="lazy"
        />
        <img
          ref={rightImageRef}
          className="absolute right-0 top-24 h-[650px] w-[40%] object-cover object-right"
          src="/images/well3.jpg"
          alt="Spa treatment details"
          loading="lazy"
        />
        <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-lg max-w-5xl w-full text-center px-4 leading-relaxed">
          {treatmentDescription}
        </p>
      </div>
    </>
  );
};

export default Wellness1;