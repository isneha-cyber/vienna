import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sample data for 6 cards
const cardsData = [
  {
    id: 1,
    image: '/images/w1.jpg',
    title: 'Creative Buffet',
    cuisine: 'International',
    dressCode: 'Breakfast & Lunch: Resort casual<br/>Dinner: Casual Elegant',
    number: '02',
  },
  {
    id: 2,
    image: '/images/w2.jpg',
    title: 'Sunset Grill',
    cuisine: 'Mediterranean',
    dressCode: 'Casual',
    number: '03',
  },
  {
    id: 3,
    image: '/images/w3.jpg',
    title: 'Ocean Breeze',
    cuisine: 'Seafood',
    dressCode: 'Resort Casual',
    number: '04',
  },
  {
    id: 4,
    image: '/images/w4.jpg',
    title: 'Garden Terrace',
    cuisine: 'Vegetarian',
    dressCode: 'Smart Casual',
    number: '05',
  },
  {
    id: 5,
    image: '/images/w5.jpg',
    title: 'Spice Route',
    cuisine: 'Asian Fusion',
    dressCode: 'Casual Elegant',
    number: '06',
  },
  {
    id: 6,
    image: '/images/w6.jpg',
    title: 'Rooftop Lounge',
    cuisine: 'Cocktail Bar & Tapas',
    dressCode: 'Elegant Evening Wear',
    number: '07',
  },
];

const Winedinecard = () => {
  const cardRefs = useRef([]);
  const numberRefs = useRef([]);
  const numberContainerRefs = useRef([]);
  const panelsRef = useRef([]);
  const innerPanelsRef = useRef([]);

  useEffect(() => {
    // Only run the panel animations on large screens
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // Setup number animations first (similar to your original)
      numberRefs.current.forEach((numberEl, index) => {
        if (!numberEl) return;
        
        const containerEl = numberContainerRefs.current[index];
        if (!containerEl) return;
        
        gsap.set(containerEl, {
          y: 80,
          opacity: 0,
          scale: 0.8,
        });
        
        numberEl.textContent = "00";
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardRefs.current[index],
            start: 'top 85%',
            end: 'top 25%',
            scrub: 1,
            toggleActions: 'play reverse play reverse',
          },
        });
        
        tl.to(containerEl, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        }, 0);
        
        const targetNumber = parseInt(cardsData[index].number);
        tl.to({}, {
          duration: 1,
          ease: 'power2.out',
          onUpdate: function() {
            const progress = this.progress();
            const currentValue = Math.floor(progress * targetNumber);
            const displayValue = Math.min(currentValue, targetNumber);
            numberEl.textContent = displayValue.toString().padStart(2, '0');
          },
          onComplete: function() {
            numberEl.textContent = targetNumber.toString().padStart(2, '0');
          }
        }, 0.2);
        
        tl.to(containerEl, {
          scale: 1.15,
          duration: 0.3,
          ease: 'power2.inOut',
        }, 0.4);
        
        tl.to(containerEl, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        }, 0.7);
      });
      
      // Now setup the panel scroll animations (the effect you provided)
      const panels = gsap.utils.toArray(panelsRef.current);
      // Remove the last panel if needed, but in our case we want all panels
      // panels.pop(); // Uncomment if you don't want the last panel to animate
      
      panels.forEach((panel, i) => {
        if (!panel) return;
        
        // Get the element holding the content inside the panel
        let innerpanel = innerPanelsRef.current[i];
        if (!innerpanel) return;
        
        // Get the Height of the content inside the panel
        let panelHeight = innerpanel.offsetHeight;
        
        // Get the window height
        let windowHeight = window.innerHeight;
        
        let difference = panelHeight - windowHeight;
        
        // ratio (between 0 and 1) representing the portion of the overall animation that's for the fake-scrolling
        let fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;
        
        // if we need to fake scroll, add the appropriate amount of margin to the bottom
        if (fakeScrollRatio) {
          panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
        }
        
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () => fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",
            pinSpacing: false,
            pin: true,
            scrub: true,
            anticipatePin: 1,
          }
        });
        
        // fake scroll
        if (fakeScrollRatio) {
          tl.to(innerpanel, {
            yPercent: -100, 
            y: window.innerHeight, 
            duration: 1 / (1 - fakeScrollRatio) - 1, 
            ease: "none"
          });
        }
        
        // Add the scale and fade animation
        tl.fromTo(panel, 
          {scale: 1, opacity: 1}, 
          {scale: 0.7, opacity: 0.5, duration: 0.9}
        )
        .to(panel, {opacity: 0, duration: 0.1});
      });
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.matchMedia().clear();
    };
  }, []);

  return (
    <div className="space-y-6 md:space-y-0 px-4 md:px-0">
      {cardsData.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => {
            panelsRef.current[index] = el;
            cardRefs.current[index] = el;
          }}
          className="card-section md:section relative flex flex-col md:flex-row items-center bg-white py-6 md:py-0 rounded-lg md:rounded-none shadow-lg md:shadow-none overflow-hidden"
        >
          {/* Wrapper div for the fake-scroll effect */}
          <div 
            ref={(el) => innerPanelsRef.current[index] = el}
            className="section-inner w-full flex flex-col md:flex-row"
          >
            {/* Left Image Section */}
            <div className="w-full  relative overflow-hidden h-[250px] sm:h-[350px] md:h-screen">
              <img
                src={card.image}
                alt={`${card.title} Restaurant`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Number - Animated Container */}
              <div 
                ref={(el) => (numberContainerRefs.current[index] = el)}
                className="absolute bottom-4 left-4 pointer-events-none z-10"
              >
                {/* Shadow/Background effect for better visibility */}
                <div className="absolute -inset-2 bg-black/20 blur-md rounded-lg"></div>
                
                {/* Main number container with styling */}
                <div className="relative p-3 md:p-4 lg:p-6">
                  <span
                    ref={(el) => (numberRefs.current[index] = el)}
                    className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    00
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 md:space-y-6">
              {/* Logo */}
              <div className="flex justify-center md:justify-start mb-4 md:mb-6">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-16 md:h-16 lg:w-20 lg:h-20"
                >
                  <path
                    d="M10 20C20 10 30 30 40 20C50 10 60 30 70 20"
                    stroke="#5A5A5A"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 30C20 20 30 40 40 30C50 20 60 40 70 30"
                    stroke="#5A5A5A"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 40C20 30 30 50 40 40C50 30 60 50 70 40"
                    stroke="#5A5A5A"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-lg md:text-xl lg:text-3xl font-serif font-bold text-gray-800 mb-2">
                  KIMATA
                </h1>
                <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mb-4 md:mb-6">
                  Creative Buffet
                </p>
              </div>

              {/* Title */}
              <h2 className="text-base md:text-lg lg:text-2xl font-serif font-bold text-gray-800 mb-3 md:mb-4 border-b pb-2">
                {card.title}
              </h2>

              {/* Details */}
              <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                <div>
                  <strong className="font-semibold">Cuisine</strong>
                  <br />
                  {card.cuisine}
                </div>
                <div>
                  <strong className="font-semibold">Dress Code</strong>
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: card.dressCode }} />
                </div>
              </div>

              {/* Button */}
              <button className="mt-4 md:mt-6 border border-gray-400 px-4 md:px-6 py-2 text-sm font-medium hover:bg-gray-50 transition-colors w-full md:w-auto">
                MORE INFO
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Winedinecard;