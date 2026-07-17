'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial animations
    gsap.from('.about-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    gsap.from('.about-hero-image-wrap', {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Scroll Animations for Philosophy
    gsap.from('.philosophy-card', {
      scrollTrigger: {
        trigger: '.philosophy-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Scroll Animation for Rooted in Kolkata
    gsap.from('.rooted-card', {
      scrollTrigger: {
        trigger: '.rooted-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Timeline steps animation
    gsap.from('.process-step-node', {
      scrollTrigger: {
        trigger: '.process-timeline-wrap',
        start: 'top 80%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    });

    // Counter anims
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach((counter) => {
      const targetVal = counter.getAttribute('data-target');
      if (!targetVal) return;
      const isPercent = targetVal.includes('%');
      const isPlus = targetVal.includes('+');
      const isRupee = targetVal.includes('₹') || targetVal.includes('Cr');
      
      let numericString = targetVal.replace(/[^0-9]/g, '');
      const finalVal = parseInt(numericString, 10);
      
      const countObj = { val: 0 };
      
      gsap.to(countObj, {
        val: finalVal,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
        },
        duration: 2,
        ease: 'power3.out',
        onUpdate: () => {
          let prefix = isRupee && targetVal.startsWith('₹') ? '₹' : '';
          let suffix = '';
          if (isPercent) suffix = '%';
          if (isPlus) suffix = '+';
          if (targetVal.endsWith('Cr+')) suffix = 'Cr+';
          else if (targetVal.endsWith('+')) suffix = '+';
          
          counter.textContent = prefix + Math.floor(countObj.val) + suffix;
        }
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="main-layout-wrapper">
      <Header />

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container hero-grid">
          <div className="about-hero-content">
            <span className="section-label">Our Story</span>
            <h1 className="about-hero-title">About Arham Estate</h1>
            <h3 className="about-hero-tagline">Advisory. Integrity. Insight.</h3>
            <p className="about-hero-desc">
              Arham Estate is a Kolkata-based real estate advisory and investment firm delivering bespoke solutions that create enduring value for clients and communities.
            </p>
            <a href="#philosophy" className="btn btn-primary hero-btn">
              Our Approach &nbsp;→
            </a>
          </div>
          <div className="about-hero-image-wrap">
            <img src="/images/classical_facade.jpg" alt="Arham Estate Headquarters" className="about-hero-image" />
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section id="philosophy" className="philosophy-section">
        <div className="container">
          <div className="philosophy-header">
            <span className="section-label">Our Philosophy</span>
            <h2 className="philosophy-title">
              We don't just find spaces. <br />
              <span className="text-highlight">We find the right ones.</span>
            </h2>
            <p className="philosophy-desc-intro">
              Real estate is more than bricks and mortar. It is about people, purpose and potential. Our role is to bring clarity to complex decisions, uncover opportunities others overlook and guide you with insight you can trust.
            </p>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="phi-card-icon">🔍</div>
              <h4>Client First</h4>
              <p>Every recommendation is aligned with your objectives, preferences, and long-term financial success.</p>
            </div>
            <div className="philosophy-card">
              <div className="phi-card-icon">🛡️</div>
              <h4>Integrity</h4>
              <p>We uphold the highest standards of honesty and transparency in every transaction and partnership.</p>
            </div>
            <div className="philosophy-card">
              <div className="phi-card-icon">💡</div>
              <h4>Insight</h4>
              <p>Deep micro-market intelligence and research drive better real estate acquisitions and investments.</p>
            </div>
            <div className="philosophy-card">
              <div className="phi-card-icon">👥</div>
              <h4>Impact</h4>
              <p>We build sustainable value that benefits our clients, developers, and local Kolkata communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooted in Kolkata Section */}
      <section className="rooted-section">
        <div className="rooted-bg-overlay">
          <img src="/images/hooghly_bridge_sunset.jpg" alt="Hooghly River at Sunset" className="rooted-bg-image" />
          <div className="gradient-fade"></div>
        </div>
        <div className="container rooted-content-grid">
          <div className="rooted-text-box">
            <span className="section-label text-white">Our City, Our Expertise</span>
            <h2 className="rooted-title">Rooted in Kolkata. Focused on what matters.</h2>
            <p className="rooted-desc">
              From heritage neighborhoods to emerging corridors, our deep understanding of Kolkata's real estate landscape helps us identify opportunities that are resilient, relevant and rewarding.
            </p>
          </div>
          <div className="rooted-cards-stack">
            <div className="rooted-card">
              <h5>Micro-market Intelligence</h5>
              <p>Detailed analysis of neighborhood growth rates, upcoming metro connectivity, and pricing dynamics.</p>
            </div>
            <div className="rooted-card">
              <h5>Strong Developer Network</h5>
              <p>Trusted partnerships built over 15 years with Kolkata's leading A-grade developers like PS Group.</p>
            </div>
            <div className="rooted-card">
              <h5>End-to-End Advisory</h5>
              <p>Bespoke consultancy across premium residential properties, commercial leasing, and land parcel sales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="process-section">
        <div className="container">
          <div className="process-header">
            <span className="section-label">Our Process</span>
            <h2 className="process-title">A thoughtful process. Better decisions.</h2>
          </div>

          <div className="process-timeline-wrap">
            <div className="timeline-horizontal-line"></div>
            <div className="process-steps">
              <div className="process-step-node">
                <div className="step-number-bubble">01</div>
                <h5>Understand</h5>
                <p>We begin by understanding your goals, preferences and investment horizon.</p>
              </div>
              <div className="process-step-node">
                <div className="step-number-bubble">02</div>
                <h5>Research</h5>
                <p>Our team conducts deep market research and shortlists the right options.</p>
              </div>
              <div className="process-step-node">
                <div className="step-number-bubble">03</div>
                <h5>Advise</h5>
                <p>Clear comparative analysis and financial valuations you can rely on.</p>
              </div>
              <div className="process-step-node">
                <div className="step-number-bubble">04</div>
                <h5>Execute</h5>
                <p>We handle negotiations, legal diligence, documentation and transaction closing.</p>
              </div>
              <div className="process-step-node">
                <div className="step-number-bubble">05</div>
                <h5>Beyond</h5>
                <p>Ongoing relationship support and portfolio-level reviews for future wealth growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Impact Section */}
      <section ref={statsRef} className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-target="15+">0</div>
            <div className="stat-label">Years of Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-target="500+">0</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-target="₹250Cr+">0</div>
            <div className="stat-label">Worth of Advisory</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-target="100+">0</div>
            <div className="stat-label">Projects Advised</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-target="20+">0</div>
            <div className="stat-label">Developer Partners</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Boardroom Section */}
      <section className="choose-section">
        <div className="container choose-grid">
          <div className="choose-text-content">
            <span className="section-label">Why Choose Us</span>
            <h2 className="choose-title">Local knowledge. Institutional mindset.</h2>
            <p className="choose-desc">
              We combine the agility and personalization of a boutique advisory firm with the discipline, process, and transparency of institutional standards.
            </p>
            <ul className="choose-checklist">
              <li>
                <span className="check-icon">✓</span>
                <strong>Independent advice:</strong> Unbiased recommendations purely aligned with your best interests.
              </li>
              <li>
                <span className="check-icon">✓</span>
                <strong>Off-market inventory:</strong> Exclusive access to early-stage pricing and off-market premium assets.
              </li>
              <li>
                <span className="check-icon">✓</span>
                <strong>Transparent transactions:</strong> Strict compliance, clear HIRA verification, and documented processes.
              </li>
              <li>
                <span className="check-icon">✓</span>
                <strong>Long-term partnerships:</strong> Building wealth portfolios that grow across generations.
              </li>
            </ul>
          </div>
          <div className="choose-image-wrap">
            <img src="/images/boardroom_interior.jpg" alt="Arham Estate Conference Boardroom" className="choose-image" />
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="cta-banner-section">
        <div className="cta-backdrop-wrap">
          <img src="/images/victoria_memorial.jpg" alt="Victoria Memorial at Twilight" className="cta-backdrop" />
          <div className="cta-overlay-screen"></div>
        </div>
        <div className="container cta-content-box">
          <h2 className="cta-title">Let's build value together.</h2>
          <p className="cta-desc">Schedule a personalized portfolio consultation with our senior wealth advisors today.</p>
          <Link href="/#contact" className="btn btn-secondary cta-btn">
            Schedule a Consultation &nbsp;→
          </Link>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* Hero Styling */
        .about-hero-section {
          padding: 12rem 0 7rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .about-hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .about-hero-title {
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          line-height: 1.1;
          color: var(--text-main);
          margin-bottom: 1rem;
        }

        .about-hero-tagline {
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(1.25rem, 2vw, 1.75rem);
          font-weight: 500;
          color: var(--brand-green);
          margin-bottom: 1.5rem;
        }

        .about-hero-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 580px;
        }

        .about-hero-image-wrap {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border-main);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.03);
          aspect-ratio: 4/3;
        }

        .about-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Our Philosophy Section */
        .philosophy-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .philosophy-header {
          max-width: 800px;
          margin-bottom: 5rem;
        }

        .philosophy-title {
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          margin-bottom: 1.5rem;
          color: var(--text-main);
          line-height: 1.2;
        }

        .text-highlight {
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
        }

        .philosophy-desc-intro {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
        }

        @media (max-width: 991px) {
          .philosophy-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
          }
        }

        .philosophy-card {
          padding: 2.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          transition: var(--transition-smooth);
        }

        .philosophy-card:hover {
          transform: translateY(-5px);
          border-color: rgba(89, 165, 44, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
        }

        .phi-card-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .philosophy-card h4 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.25rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .philosophy-card p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Rooted in Kolkata Section */
        .rooted-section {
          position: relative;
          padding: 10rem 0;
          overflow: hidden;
          background: #090b0e;
        }

        .rooted-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .rooted-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }

        .gradient-fade {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(9, 11, 14, 0.95) 30%, rgba(9, 11, 14, 0.4) 100%);
        }

        @media (max-width: 991px) {
          .gradient-fade {
            background: linear-gradient(to bottom, rgba(9, 11, 14, 0.95) 40%, rgba(9, 11, 14, 0.7) 100%);
          }
        }

        .rooted-content-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .rooted-content-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .text-white {
          color: var(--brand-green) !important;
        }

        .rooted-text-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .rooted-title {
          font-size: clamp(2rem, 3.5vw, 3rem);
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .rooted-desc {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .rooted-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .rooted-card {
          padding: 2.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          transition: var(--transition-smooth);
        }

        .rooted-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(11, 170, 220, 0.3);
          transform: translateX(5px);
        }

        .rooted-card h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .rooted-card p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        /* Our Process Section */
        .process-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .process-header {
          text-align: center;
          margin-bottom: 6rem;
        }

        .process-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--text-main);
        }

        .process-timeline-wrap {
          position: relative;
          width: 100%;
          padding: 2rem 0;
        }

        .timeline-horizontal-line {
          position: absolute;
          top: 45px;
          left: 5%;
          right: 5%;
          height: 2px;
          background: var(--border-main);
          z-index: 1;
        }

        @media (max-width: 991px) {
          .timeline-horizontal-line {
            display: none;
          }
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 991px) {
          .process-steps {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .process-step-node {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1rem;
        }

        @media (max-width: 991px) {
          .process-step-node {
            text-align: left;
            flex-direction: row;
            align-items: flex-start;
            gap: 1.5rem;
            padding: 0;
          }
        }

        .step-number-bubble {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 2px solid var(--brand-green);
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
          transition: var(--transition-smooth);
        }

        .process-step-node:hover .step-number-bubble {
          background: var(--brand-green);
          color: #ffffff;
          transform: scale(1.05);
        }

        @media (max-width: 991px) {
          .step-number-bubble {
            margin-bottom: 0;
            flex-shrink: 0;
          }
        }

        .process-step-node h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.15rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .process-step-node p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Stats Section */
        .stats-section {
          padding: 6rem 0;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-main);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          text-align: center;
        }

        @media (max-width: 991px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
          }
        }

        @media (max-width: 576px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .stat-number {
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, var(--brand-green), var(--brand-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        /* Why Choose Us Section */
        .choose-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .choose-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .choose-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .choose-text-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .choose-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          margin-bottom: 1.5rem;
          color: var(--text-main);
        }

        .choose-desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .choose-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .choose-checklist li {
          display: flex;
          gap: 1rem;
          font-size: 0.98rem;
          color: var(--text-main);
          line-height: 1.5;
        }

        .check-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(89, 165, 44, 0.1);
          color: var(--brand-green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.75rem;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .choose-image-wrap {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border-main);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
          aspect-ratio: 16/10;
        }

        .choose-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* CTA Banner */
        .cta-banner-section {
          height: 380px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          background: #090b0e;
        }

        .cta-backdrop-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .cta-backdrop {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.4;
        }

        .cta-overlay-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, transparent 40%, rgba(9, 11, 14, 0.8) 95%),
                      linear-gradient(to bottom, rgba(9, 11, 14, 0.3) 0%, rgba(9, 11, 14, 0.9) 100%);
        }

        .cta-content-box {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 700px;
          padding: 0 1.5rem;
        }

        .cta-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .cta-desc {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
