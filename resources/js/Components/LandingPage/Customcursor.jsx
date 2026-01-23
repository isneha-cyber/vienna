import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Add event listeners to detect hover states
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button, [role="button"]');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => setLinkHover(true));
      link.addEventListener('mouseleave', () => setLinkHover(false));
    });
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => setButtonHover(true));
      button.addEventListener('mouseleave', () => setButtonHover(false));
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', () => setLinkHover(true));
        link.removeEventListener('mouseleave', () => setLinkHover(false));
      });
      
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', () => setButtonHover(true));
        button.removeEventListener('mouseleave', () => setButtonHover(false));
      });
    };
  }, []);

  // Don't render cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  const cursorClasses = `
    fixed pointer-events-none z-50
    w-24 h-24 rounded-full
    border-2 border-gray-300
    transition-all duration-150 ease-out
    ${hidden ? 'opacity-0' : 'opacity-100'}
    ${clicked ? 'scale-90 bg-gray-300' : 'scale-100'}
    ${linkHover ? 'scale-150 border-gray-300' : ''}
    ${buttonHover ? 'scale-125 bg-gray-300' : ''}
    mix-blend-difference
  `;

  const dotClasses = `
    fixed pointer-events-none z-50
    w-1 h-1 rounded-full bg-white
    transition-all duration-75 ease-out
    ${hidden ? 'opacity-0' : 'opacity-100'}
  `;

  return (
    <>
      {/* Outer circle */}
      <div
        className={cursorClasses.trim()}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Inner dot */}
      <div
        className={dotClasses.trim()}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
// import React, { useState, useEffect, useRef } from 'react';

// const CustomCursor = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [hidden, setHidden] = useState(false);
//   const [clicked, setClicked] = useState(false);
//   const [linkHover, setLinkHover] = useState(false);
//   const [buttonHover, setButtonHover] = useState(false);
  
//   // Refs for smooth animation
//   const cursorRef = useRef(null);
//   const dotRef = useRef(null);
//   const requestRef = useRef();
//   const previousTimeRef = useRef();
  
//   // Current positions for smooth animation
//   const cursorX = useRef(0);
//   const cursorY = useRef(0);
//   const dotX = useRef(0);
//   const dotY = useRef(0);
  
//   // Target positions (where mouse actually is)
//   const targetX = useRef(0);
//   const targetY = useRef(0);

//   // Smooth animation parameters
//   const cursorSmoothness = 0.15; // Lower = smoother but slower
//   const dotSmoothness = 0.3;     // Inner dot is faster

//   useEffect(() => {
//     // First, hide the default cursor
//     document.body.style.cursor = 'none';
    
//     const handleMouseMove = (e) => {
//       // Update target positions
//       targetX.current = e.clientX;
//       targetY.current = e.clientY;
//     };

//     const handleMouseEnter = () => setHidden(false);
//     const handleMouseLeave = () => setHidden(true);
//     const handleMouseDown = () => setClicked(true);
//     const handleMouseUp = () => setClicked(false);

//     // Add event listeners to detect hover states
//     const handleLinkEnter = () => setLinkHover(true);
//     const handleLinkLeave = () => setLinkHover(false);
//     const handleButtonEnter = () => setButtonHover(true);
//     const handleButtonLeave = () => setButtonHover(false);

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleMouseEnter);
//     document.addEventListener('mouseleave', handleMouseLeave);
//     document.addEventListener('mousedown', handleMouseDown);
//     document.addEventListener('mouseup', handleMouseUp);

//     // Smooth animation loop using requestAnimationFrame
//     const animate = (time) => {
//       if (previousTimeRef.current !== undefined) {
//         // Calculate delta time for consistent animation speed
//         const deltaTime = time - previousTimeRef.current;
//         const speedFactor = Math.min(deltaTime / 16, 2); // Normalize to 60fps
        
//         // Smooth interpolation for cursor (outer circle)
//         cursorX.current += (targetX.current - cursorX.current) * cursorSmoothness * speedFactor;
//         cursorY.current += (targetY.current - cursorY.current) * cursorSmoothness * speedFactor;
        
//         // Update state for the outer cursor
//         setPosition({
//           x: cursorX.current,
//           y: cursorY.current
//         });

//         // Smooth interpolation for dot (faster than cursor)
//         dotX.current += (targetX.current - dotX.current) * dotSmoothness * speedFactor;
//         dotY.current += (targetY.current - dotY.current) * dotSmoothness * speedFactor;
//       }
      
//       previousTimeRef.current = time;
//       requestRef.current = requestAnimationFrame(animate);
//     };

//     // Start animation loop
//     requestRef.current = requestAnimationFrame(animate);

//     // Add hover listeners after a short delay to ensure DOM is ready
//     const timeoutId = setTimeout(() => {
//       const links = document.querySelectorAll('a');
//       const buttons = document.querySelectorAll('button, [role="button"]');
      
//       links.forEach(link => {
//         link.addEventListener('mouseenter', handleLinkEnter);
//         link.addEventListener('mouseleave', handleLinkLeave);
//         link.style.cursor = 'none'; // Hide default cursor on links
//       });
      
//       buttons.forEach(button => {
//         button.addEventListener('mouseenter', handleButtonEnter);
//         button.addEventListener('mouseleave', handleButtonLeave);
//         button.style.cursor = 'none'; // Hide default cursor on buttons
//       });
//     }, 100);

//     return () => {
//       // Cleanup event listeners
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       document.removeEventListener('mousedown', handleMouseDown);
//       document.removeEventListener('mouseup', handleMouseUp);
      
//       // Restore default cursor
//       document.body.style.cursor = 'auto';
      
//       // Remove hover listeners
//       const links = document.querySelectorAll('a');
//       const buttons = document.querySelectorAll('button, [role="button"]');
      
//       links.forEach(link => {
//         link.removeEventListener('mouseenter', handleLinkEnter);
//         link.removeEventListener('mouseleave', handleLinkLeave);
//         link.style.cursor = ''; // Restore default cursor
//       });
      
//       buttons.forEach(button => {
//         button.removeEventListener('mouseenter', handleButtonEnter);
//         button.removeEventListener('mouseleave', handleButtonLeave);
//         button.style.cursor = ''; // Restore default cursor
//       });
      
//       // Clear timeout and animation
//       clearTimeout(timeoutId);
//       cancelAnimationFrame(requestRef.current);
//     };
//   }, []);

//   // Don't render cursor on touch devices
//   if (typeof window !== 'undefined' && 'ontouchstart' in window) {
//     return null;
//   }

//   const cursorClasses = `
//     fixed pointer-events-none z-50
//     w-20 h-20 rounded-full
//     border-2 border-black
//     transition-all duration-100 ease-out
//     ${hidden ? 'opacity-0' : 'opacity-100'}
//     ${clicked ? 'scale-75' : 'scale-100'}
//     ${linkHover ? 'scale-150 border-gray-600 bg-gray-600/20' : ''}
//     ${buttonHover ? 'scale-125 border-gray-600 bg-gray-600/20' : ''}
//     mix-blend-difference
//     will-change-transform
//     hidden md:block
//   `;

//   const dotClasses = `
//     fixed pointer-events-none z-50
//     w-1 h-1 rounded-full bg-white
//     transition-all duration-75 ease-out
//     ${hidden ? 'opacity-0' : 'opacity-100'}
//     will-change-transform
//     hidden md:block
//   `;

//   return (
//     <>
//       {/* Outer circle with smooth movement */}
//       <div
//         ref={cursorRef}
//         className={cursorClasses.trim()}
//         style={{
//           left: `${position.x}px`,
//           top: `${position.y}px`,
//           transform: 'translate(-50%, -50%)',
//         }}
//       />
      
//       {/* Inner dot with faster smooth movement */}
//       <div
//         ref={dotRef}
//         className={dotClasses.trim()}
//         style={{
//           left: `${dotX.current}px`,
//           top: `${dotY.current}px`,
//           transform: 'translate(-50%, -50%)',
//         }}
//       />
//     </>
//   );
// };

// export default CustomCursor;


// /* Hide default cursor on the entire page */
// * {
//   cursor: none !important;
// }

// /* Show default cursor on form elements for better UX */
// input,
// textarea,
// select,
// [contenteditable] {
//   cursor: auto !important;
// }

// /* On mobile/touch devices, show default cursor */
// @media (max-width: 768px) {
//   * {
//     cursor: auto !important;
//   }
// }