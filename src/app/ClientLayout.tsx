'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [showPreloader, setShowPreloader] = useState(isHome);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    if (showPreloader && isHome) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [showPreloader, isHome]);

  return (
    <>
      {showPreloader && isHome && <Preloader onComplete={() => setShowPreloader(false)} />}
      <div className={`main-layout-wrapper ${showPreloader && isHome ? 'hidden-content' : ''}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
