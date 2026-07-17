'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoCircleGreenRef = useRef<SVGPathElement>(null);
  const logoCircleBlueRef = useRef<SVGPathElement>(null);
  const textARef = useRef<SVGTextElement>(null);
  const textERef = useRef<SVGTextElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const fillARef = useRef<SVGRectElement>(null);
  const fillERef = useRef<SVGRectElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get the length of circle arcs for dash animations
    const greenArc = logoCircleGreenRef.current;
    const blueArc = logoCircleBlueRef.current;
    
    let greenLength = 125.6; // fallback approximate semicircle length for r=40 (2 * pi * 40 / 2)
    let blueLength = 125.6;

    if (greenArc && blueArc) {
      try {
        greenLength = greenArc.getTotalLength();
        blueLength = blueArc.getTotalLength();
        
        // Initialize stroke dash properties
        gsap.set([greenArc, blueArc], {
          strokeDasharray: greenLength,
          strokeDashoffset: greenLength,
        });
      } catch (e) {
        console.warn("Could not get path lengths", e);
      }
    }

    // Set initial animations states
    gsap.set(wordmarkRef.current, {
      opacity: 0,
      x: 30,
      scale: 0.9,
    });
    
    gsap.set([fillARef.current, fillERef.current], {
      attr: { height: 0, y: 100 }
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Delay slightly then trigger completion
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: onComplete
          });
        }, 600);
      }
    });

    // 1. Fill the letters "a" and "e" from bottom to top
    tl.to(fillARef.current, {
      attr: { height: 100, y: 0 },
      duration: 1.0,
      ease: 'power2.inOut'
    })
    .to(fillERef.current, {
      attr: { height: 100, y: 0 },
      duration: 1.0,
      ease: 'power2.inOut'
    }, '-=0.5') // overlap

    // 2. Draw the circle border lines
    .to(logoCircleGreenRef.current, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.8')
    .to(logoCircleBlueRef.current, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.8')

    // 3. Shift the logo left and scale
    .to(logoWrapRef.current, {
      x: -100,
      duration: 0.8,
      ease: 'power3.inOut'
    })

    // 4. Reveal the text "ARHAM ESTATE"
    .to(wordmarkRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');

  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader-container">
      <div ref={logoWrapRef} className="preloader-logo-wrapper">
        
        {/* SVG Arham Estate Symbol */}
        <svg 
          viewBox="0 0 100 100" 
          className="preloader-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Clipping paths for letter fills */}
            <clipPath id="clip-a">
              <text 
                x="33" 
                y="63" 
                fontFamily="var(--font-outfit)" 
                fontSize="38" 
                fontWeight="400"
                textAnchor="middle"
              >
                a
              </text>
            </clipPath>
            <clipPath id="clip-e">
              <text 
                x="65" 
                y="63" 
                fontFamily="var(--font-outfit)" 
                fontSize="38" 
                fontWeight="400"
                textAnchor="middle"
              >
                e
              </text>
            </clipPath>
          </defs>

          {/* Background letters (faint outline or light gray fill before coloring) */}
          <text 
            x="33" 
            y="63" 
            fontFamily="var(--font-outfit)" 
            fontSize="38" 
            fontWeight="400"
            textAnchor="middle"
            fill="rgba(15, 23, 42, 0.03)"
          >
            a
          </text>
          <text 
            x="65" 
            y="63" 
            fontFamily="var(--font-outfit)" 
            fontSize="38" 
            fontWeight="400"
            textAnchor="middle"
            fill="rgba(15, 23, 42, 0.03)"
          >
            e
          </text>

          {/* Animating Fill Rectangles inside clipped text paths */}
          <g clipPath="url(#clip-a)">
            <rect ref={fillARef} x="0" y="100" width="100" height="0" fill="var(--brand-green)" />
          </g>
          <g clipPath="url(#clip-e)">
            <rect ref={fillERef} x="0" y="100" width="100" height="0" fill="var(--brand-blue)" />
          </g>

          {/* Border circle halves */}
          {/* Green Top-Right Arc: Starts at (50, 93) goes CCW to (50, 7) */}
          <path
            ref={logoCircleGreenRef}
            d="M 50 93 A 43 43 0 0 0 50 7"
            fill="none"
            stroke="var(--brand-green)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Blue Bottom-Left Arc: Starts at (50, 7) goes CCW to (50, 93) */}
          <path
            ref={logoCircleBlueRef}
            d="M 50 7 A 43 43 0 0 0 50 93"
            fill="none"
            stroke="var(--brand-blue)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        {/* Wordmark appearing beside the symbol */}
        <div ref={wordmarkRef} className="preloader-wordmark">
          <span className="wordmark-title">ARHAM</span>
          <span className="wordmark-sub">ESTATE</span>
        </div>

      </div>

      <style jsx global>{`
        .preloader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--bg-dark);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .preloader-logo-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 500px;
          height: 150px;
        }

        .preloader-svg {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }

        .preloader-wordmark {
          position: absolute;
          left: calc(50% + 75px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
          pointer-events: none;
        }

        .wordmark-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: 0.05em;
        }

        .wordmark-sub {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--brand-blue);
          letter-spacing: 0.28em;
          margin-top: 0.15rem;
        }

        @media (max-width: 550px) {
          .preloader-logo-wrapper {
            width: 100%;
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
}
