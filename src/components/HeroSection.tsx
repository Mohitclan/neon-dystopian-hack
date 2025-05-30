
import React, { useEffect, useRef } from 'react';
import CountdownTimer from './CountdownTimer';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only enable the mousemove effect on non-mobile devices
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 20 - 10;
      const y = (clientY / window.innerHeight) * 10 - 5;
      
      gridRef.current.style.transform = `perspective(500px) rotateX(60deg) translateY(${y}px) translateX(${x}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Improved Devfolio initialization
  useEffect(() => {
    // Check if Devfolio script is loaded
    const checkDevfolioAndInit = () => {
      if (window.devfolio) {
        window.devfolio.init();
        console.log('Devfolio SDK initialized successfully');
      } else {
        console.log('Waiting for Devfolio SDK to load...');
        setTimeout(checkDevfolioAndInit, 500);
      }
    };

    // Start checking once the component is mounted
    checkDevfolioAndInit();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex flex-col items-center justify-center pt-16 pb-8 overflow-hidden px-4">
      <div ref={gridRef} className="grid-background animate-grid-fade"></div>
      
      <div className="container mx-auto z-10 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="mb-10 md:mb-12 animate-float">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display tracking-wider text-center">
              <span className="neon-text block">HACK</span>
              <span className="neon-text-cyan block mt-2">QUANTA</span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl block mt-6 chrome-text">DATA. DYSTOPIA. DOMINANCE</span>
            </h1>
          </div>

          <p className="max-w-2xl text-center mb-6 md:mb-8 text-gray-300 text-sm md:text-base px-2 sm:px-0">
            Join the ultimate coding experience where innovation meets technology.
            Push your limits and build the future.
          </p>

          <div className="mb-10 md:mb-12 w-full max-w-2xl">
            <div className="text-center mb-4">
              <p className="text-base md:text-lg font-display text-neon-cyan">SEPT 5th-6th, 2025</p>
            </div>
            <CountdownTimer targetDate="2025-09-05T09:00:00" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-6 w-full justify-center items-center">
            {/* Updated Apply Button with inline styles to ensure visibility */}
            <div 
              id="devfolio-apply-now"
              className="apply-button cursor-pointer shadow-glow-sm bg-white rounded-md flex items-center justify-center"
                 href="https://hack-quanta.devfolio.co/" 
              data-hackathon-slug="hack-quanta" 
              data-button-theme="dark-inverted"
              style={{ height: "44px", width: "312px", minHeight: "44px", minWidth: "312px" }}
            >
              {/* Fallback content in case button doesn't load */}
              <span className="text-center font-bold text-black">Apply with Devfolio</span>
            </div>
            
            <a href="#about" className="px-4 sm:px-6 py-3 border border-neon-cyan/30 text-center hover:border-neon-cyan hover:scale-105 transition-all duration-300 font-display">
              LEARN MORE
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse hidden sm:block">
        <p className="text-neon-pink text-sm">SCROLL DOWN</p>
        <div className="mt-2 w-6 h-6 mx-auto border-b-2 border-r-2 border-neon-pink transform rotate-45"></div>
      </div>
    </section>
  );
};

// Add TypeScript interface for the Devfolio SDK
declare global {
  interface Window {
    devfolio?: {
      init: () => void;
    }
  }
}

export default HeroSection;
