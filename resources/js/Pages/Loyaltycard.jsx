import { Link } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '@/Components/LandingPage/Navbar';

const Loyaltycard = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const lineRef = useRef(null);
  const socialRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Sequence animations
    tl.fromTo(heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 }
    )
    .fromTo(logoRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.8"
    )
    .fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    )
    .fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, transformOrigin: "left center" },
      "-=0.3"
    )
    .fromTo(formRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(socialRef.current.children,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );

    // Add hover animation for social links
    const socialLinks = socialRef.current?.querySelectorAll('a');
    socialLinks?.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.1, duration: 0.3 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      // Cleanup
      socialLinks?.forEach(link => {
        link.removeEventListener('mouseenter', () => {});
        link.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    // Animate button on submit
    const button = e.target.querySelector('button[type="submit"]');
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        alert(`Thank you! We'll notify ${email} when we launch.`);
        e.target.reset();
      }
    });
  };

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
          Loyalty Cards
            </li>
          </ol>
        </nav>
      </div>
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-4 sm:right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-neutral-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 sm:w-120 sm:h-120 bg-neutral-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div ref={heroRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 opacity-0">
        
        {/* Logo with animation */}
        <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4">
          <div ref={logoRef} className="text-center opacity-0">
            <Link href="/" className="inline-block group">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wider transition-all duration-500 group-hover:tracking-widest">
                Stella Island
              </h2>
              <div className="w-0 group-hover:w-full h-px bg-neutral-900 transition-all duration-500 mx-auto mt-1"></div>
            </Link>
          </div>
        </div>

        {/* Main content centered */}
        <div className="text-center max-w-4xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12 px-4">
          
          {/* Main heading with enhanced typography */}
          <div className="space-y-4 sm:space-y-6">
            <h1 
              ref={titleRef} 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-tight opacity-0"
            >
              Coming Soon
            </h1>
            
            <div ref={subtitleRef} className="space-y-4 opacity-0">
              <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-light tracking-wide px-4">
                Something extraordinary is on the horizon
              </p>
              
              {/* Animated divider line */}
              <div className="flex justify-center">
                <div 
                  ref={lineRef}
                  className="w-32 h-px bg-gradient-to-r from-transparent via-neutral-900 to-transparent transform scale-x-0"
                ></div>
              </div>
            </div>
          </div>

          {/* Email form with enhanced styling */}
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="opacity-0 max-w-md mx-auto pt-4 sm:pt-6"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-neutral-200 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all text-neutral-900 placeholder-neutral-400 text-sm sm:text-base tracking-wide rounded-none sm:rounded-l-lg"
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-900 transition-all text-sm sm:text-base tracking-widest font-light rounded-none sm:rounded-r-lg cursor-pointer"
              >
                NOTIFY ME
              </button>
            </div>
            <p className="text-xs text-neutral-400 mt-3 tracking-wide">
              Be the first to know when we launch
            </p>
          </form>

          {/* Launch date */}
          <div className="pt-8 sm:pt-12">
            <p className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
              Launching <span className="text-neutral-900">2026</span>
            </p>
          </div>
        </div>

        {/* Social links with enhanced styling */}
        <div ref={socialRef} className="absolute bottom-6 sm:bottom-8 left-0 right-0">
          <div className="flex flex-wrap gap-4 sm:gap-8 justify-center items-center">
            <a 
              href="#" 
              className="group relative text-neutral-500 hover:text-neutral-900 transition-colors text-xs tracking-widest px-2 py-1"
            >
              <span className="relative z-10">INSTAGRAM</span>
              <div className="absolute inset-0 bg-neutral-100 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
            <div className="hidden sm:block w-1 h-1 bg-neutral-300 rounded-full"></div>
            
            <a 
              href="#" 
              className="group relative text-neutral-500 hover:text-neutral-900 transition-colors text-xs tracking-widest px-2 py-1"
            >
              <span className="relative z-10">FACEBOOK</span>
              <div className="absolute inset-0 bg-neutral-100 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
            <div className="hidden sm:block w-1 h-1 bg-neutral-300 rounded-full"></div>
            
            <a 
              href="#" 
              className="group relative text-neutral-500 hover:text-neutral-900 transition-colors text-xs tracking-widest px-2 py-1"
            >
              <span className="relative z-10">TWITTER</span>
              <div className="absolute inset-0 bg-neutral-100 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Loyaltycard;