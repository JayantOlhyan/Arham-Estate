'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial animations states
    gsap.set(logoImgRef.current, {
      opacity: 0,
      scale: 0.65,
      filter: 'blur(12px)',
    });

    gsap.set(wordmarkRef.current, {
      opacity: 0,
      x: 30,
      scale: 0.9,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: onComplete
          });
        }, 500);
      }
    });

    // 1. Reveal and pulse the actual Arham Estate Logo
    tl.to(logoImgRef.current, {
      opacity: 1,
      scale: 1.05,
      filter: 'blur(0px)',
      duration: 1.0,
      ease: 'power3.out'
    })
    .to(logoImgRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    })

    // 2. Shift logo left while revealing wordmark
    .to(logoWrapRef.current, {
      x: -85,
      duration: 0.75,
      ease: 'power3.inOut'
    })

    // 3. Reveal the text "ARHAM ESTATE"
    .to(wordmarkRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.75,
      ease: 'power3.out'
    }, '-=0.55');

  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader-container">
      <div ref={logoWrapRef} className="preloader-logo-wrapper">
        
        {/* Real Arham Estate Brand Logo Image */}
        <img 
          ref={logoImgRef}
          src="/images/logo.png" 
          alt="Arham Estate Logo" 
          className="preloader-logo-img" 
        />

        {/* Wordmark appearing beside the logo */}
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
          background-color: var(--bg-dark, #0f172a);
          z-index: 99999;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .preloader-logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .preloader-logo-img {
          width: 90px;
          height: 90px;
          object-fit: contain;
          position: absolute;
          filter: drop-shadow(0 4px 20px rgba(89, 165, 44, 0.4));
        }

        .preloader-wordmark {
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 65px; /* positioned right next to the logo image after shift */
          white-space: nowrap;
        }

        .wordmark-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 2.25rem;
          font-weight: 750;
          letter-spacing: 0.15em;
          color: #ffffff;
          line-height: 1;
        }

        .wordmark-sub {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.45em;
          color: var(--brand-green, #59a52c);
          margin-top: 6px;
        }

        @media (max-width: 480px) {
          .preloader-logo-img {
            width: 72px;
            height: 72px;
          }
          .wordmark-title {
            font-size: 1.75rem;
          }
          .wordmark-sub {
            font-size: 0.8rem;
          }
          .preloader-wordmark {
            left: 55px;
          }
        }
      `}</style>
    </div>
  );
}
