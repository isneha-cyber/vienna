import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  
  // Refs for smooth animation
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const animationFrameRef = useRef();
  
  // For smooth interpolation
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const dotX = useRef(0);
  const dotY = useRef(0);
  
  // Target positions (where mouse actually is)
  const targetX = useRef(0);
  const targetY = useRef(0);

  // Smoothness factors (lower = smoother but slower)
  const cursorSmoothness = 0.1;    // Outer circle
  const dotSmoothness = 0.2;       // Inner dot

  // Smooth interpolation function
  const lerp = (current, target, factor) => {
    return current + (target - current) * factor;
  };

  // Animation loop
  const animate = () => {
    // Smooth interpolation for cursor (outer circle)
    cursorX.current = lerp(cursorX.current, targetX.current, cursorSmoothness);
    cursorY.current = lerp(cursorY.current, targetY.current, cursorSmoothness);
    
    // Update outer cursor position
    if (cursorRef.current) {
      cursorRef.current.style.left = `${cursorX.current}px`;
      cursorRef.current.style.top = `${cursorY.current}px`;
    }

    // Smooth interpolation for dot (faster than cursor)
    dotX.current = lerp(dotX.current, targetX.current, dotSmoothness);
    dotY.current = lerp(dotY.current, targetY.current, dotSmoothness);
    
    // Update inner dot position
    if (dotRef.current) {
      dotRef.current.style.left = `${dotX.current}px`;
      dotRef.current.style.top = `${dotY.current}px`;
    }

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Initialize cursor positions
    cursorX.current = targetX.current;
    cursorY.current = targetY.current;
    dotX.current = targetX.current;
    dotY.current = targetY.current;

    const handleMouseMove = (e) => {
      // Update target positions
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      
      // Keep state updated for other purposes
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Add event listeners to detect hover states
    const handleLinkEnter = () => setLinkHover(true);
    const handleLinkLeave = () => setLinkHover(false);
    const handleButtonEnter = () => setButtonHover(true);
    const handleButtonLeave = () => setButtonHover(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    // Add hover listeners
    const addHoverListeners = () => {
      const links = document.querySelectorAll('a');
      const buttons = document.querySelectorAll('button, [role="button"]');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', handleLinkEnter);
        link.addEventListener('mouseleave', handleLinkLeave);
      });
      
      buttons.forEach(button => {
        button.addEventListener('mouseenter', handleButtonEnter);
        button.addEventListener('mouseleave', handleButtonLeave);
      });
    };

    // Delay adding hover listeners to ensure DOM is ready
    const timeoutId = setTimeout(addHoverListeners, 100);

    return () => {
      // Cleanup event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Remove hover listeners
      const links = document.querySelectorAll('a');
      const buttons = document.querySelectorAll('button, [role="button"]');
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkEnter);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
      
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleButtonEnter);
        button.removeEventListener('mouseleave', handleButtonLeave);
      });
      
      // Clear timeout and animation frame
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameRef.current);
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
    will-change-transform
  `;

  const dotClasses = `
    fixed pointer-events-none z-50
    w-1 h-1 rounded-full bg-white
    transition-all duration-75 ease-out
    ${hidden ? 'opacity-0' : 'opacity-100'}
    will-change-transform
  `;

  return (
    <>
      {/* Outer circle with smooth movement */}
      <div
        ref={cursorRef}
        className={cursorClasses.trim()}
        style={{
          left: '0px',
          top: '0px',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Inner dot with faster smooth movement */}
      <div
        ref={dotRef}
        className={dotClasses.trim()}
        style={{
          left: '0px',
          top: '0px',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;