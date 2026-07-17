'use client';

import React, { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Philosophy from '@/components/Philosophy';
import Projects from '@/components/Projects';
import { AlertsForm, EnquiryModal } from '@/components/EnquiryForms';
import Footer from '@/components/Footer';
import Lenis from 'lenis';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Set up Lenis smooth scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis to requestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Disable body scroll when preloader is running
    if (showPreloader) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [showPreloader]);

  return (
    <>
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      <div className={`main-layout-wrapper ${showPreloader ? 'hidden-content' : ''}`}>
        <Header />
        
        <main>
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Philosophy & Advisory Section */}
          <Philosophy />

          {/* Projects Section */}
          <Projects onSelectProject={(name) => setSelectedProject(name)} />

          {/* Testimonials Section */}
          <section className="testimonials-section light-section">
            <div className="container">
              <span className="section-label">Client Reviews</span>
              <h2 className="section-title">Testimonials</h2>
              
              <div className="testimonials-placeholder-container">
                {/* Big Media Text Overlay as requested by user */}
                <div className="media-placeholder-overlay">
                  [TESTIMONIALS VIDEO CLIPS & CLIENT REVIEWS HERE]
                </div>
                
                <div className="testimonials-content-box">
                  <p className="testimonial-text">
                    "Arham Estate is an obvious choice for any organization that believes in quality and integrity. Their team made our commercial leasing process completely seamless. The air of professional transparency was unlike any other real estate partner we worked with in the region."
                  </p>
                  <div className="testimonial-author">
                    <span className="author-name">Bharat Anand</span>
                    <span className="author-role">Partner, Corporate Advisory Firm</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services & Alerts Section */}
          <section id="services" className="services-alerts-section">
            <div className="container">
              <div className="services-alerts-grid">
                
                {/* Services Block */}
                <div className="services-content-block">
                  <span className="section-label">Our Capabilities</span>
                  <h2 className="section-title">Real Estate Services</h2>
                  <p className="section-desc">
                    We deliver customized, end-to-end solutions for property buying, selling, leasing, and strategic advisory.
                  </p>

                  <div className="services-cards-stack">
                    <div id="services-residential" className="service-small-card">
                      <div className="service-card-icon">🏠</div>
                      <div className="service-card-text">
                        <h4>Residential Services</h4>
                        <p>We bring you the best residential properties in Kolkata to choose from, matching your precise specifications, layout needs, and financial brackets.</p>
                      </div>
                    </div>

                    <div id="services-commercial" className="service-small-card">
                      <div className="service-card-icon">🏢</div>
                      <div className="service-card-text">
                        <h4>Commercial & Office Spaces</h4>
                        <p>Access premier Grade-A corporate towers, co-working environments, retail outlets, and workspaces tailored for productivity and brand value.</p>
                      </div>
                    </div>

                    <div id="services-others" className="service-small-card">
                      <div className="service-card-icon">🗺️</div>
                      <div className="service-card-text">
                        <h4>Other Asset Services</h4>
                        <p>We provide exclusive investment options in industrial land, warehouses, logistics centers, alongside comprehensive relocation services.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerts Form Panel */}
                <div className="alerts-column-wrapper">
                  <AlertsForm />
                  
                  {/* Decorative Glassmorphic Card */}
                  <div className="finance-promo-card">
                    <span className="promo-badge">Financial Advisory</span>
                    <h4>Need Property Finance?</h4>
                    <p>We offer integrated financial advisory services, connecting buyers with prime lending institutions for home and commercial capital loans.</p>
                    <a href="#contact" className="promo-link">Speak with Financial Advisors →</a>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact-us-section light-section">
            <div className="container">
              <div className="contact-grid">
                <div className="contact-info">
                  <span className="section-label">Get in Touch</span>
                  <h2 className="section-title">Let's Discuss Your Needs</h2>
                  <p className="contact-desc">
                    Whether you are an investor, developer, landlord, or home-buyer, our dedicated experts are here to secure the perfect deal for you.
                  </p>
                  
                  <div className="contact-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📍</span>
                      <p>2 Ram Lochan Mullick Street, 1st Floor, Kolkata 700073</p>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">✉️</span>
                      <a href="mailto:info@arhamestate.com">info@arhamestate.com</a>
                    </div>
                  </div>
                </div>

                <div className="contact-form-panel">
                  {/* Display an enquiry modal trigger or inline copy */}
                  <div className="inline-contact-promo">
                    <p>Ready to move forward with a property or advisory service?</p>
                    <button 
                      onClick={() => setSelectedProject('General Advisory')} 
                      className="btn btn-primary"
                      style={{ marginTop: '1.5rem', width: '100%' }}
                    >
                      Open General Enquiry Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Property Enquiry Modal Popup */}
        <EnquiryModal 
          projectName={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>

      <style jsx>{`
        .main-layout-wrapper {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .hidden-content {
          opacity: 0;
          height: 100vh;
          overflow: hidden;
        }

        .section-label {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--brand-green);
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          margin-bottom: 1.5rem;
          color: var(--text-main);
        }

        .section-desc {
          color: var(--text-muted);
          font-size: 1.05rem;
          margin-bottom: 3rem;
          max-width: 600px;
        }

        /* Testimonials Styles */
        .testimonials-section {
          padding: 8rem 0;
          background: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .testimonials-placeholder-container {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.04);
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          min-height: 380px;
        }

        @media (max-width: 991px) {
          .testimonials-placeholder-container {
            grid-template-columns: 1fr;
          }
        }

        .media-placeholder-overlay {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: rgba(15, 23, 42, 0.15);
          text-transform: uppercase;
          text-align: center;
          padding: 3rem;
          border-right: 1px solid var(--border-main);
        }

        @media (max-width: 991px) {
          .media-placeholder-overlay {
            border-right: none;
            border-bottom: 1px solid var(--border-main);
            aspect-ratio: 16/9;
          }
        }

        .testimonials-content-box {
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 576px) {
          .testimonials-content-box {
            padding: 2rem;
          }
        }

        .testimonial-text {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-main);
          font-style: italic;
          margin-bottom: 2rem;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--brand-green);
        }

        .author-role {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Services & Alerts grid */
        .services-alerts-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .services-alerts-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 6rem;
          align-items: start;
        }

        @media (max-width: 991px) {
          .services-alerts-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .services-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .service-small-card {
          display: flex;
          gap: 2rem;
          padding: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          transition: var(--transition-smooth);
        }

        .service-small-card:hover {
          border-color: rgba(11, 170, 220, 0.3);
          transform: translateX(6px);
        }

        .service-card-icon {
          font-size: 2.5rem;
          line-height: 1;
        }

        .service-card-text h4 {
          font-size: 1.25rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .service-card-text p {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .alerts-column-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .finance-promo-card {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.02) 0%, rgba(15, 23, 42, 0.01) 100%);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          padding: 2.5rem;
        }

        .promo-badge {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--brand-blue);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 1px solid rgba(11, 170, 220, 0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          display: inline-block;
          margin-bottom: 1.25rem;
        }

        .finance-promo-card h4 {
          font-size: 1.35rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
        }

        .finance-promo-card p {
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .promo-link {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.95rem;
          color: var(--brand-green);
          font-weight: 500;
        }

        .promo-link:hover {
          color: var(--brand-blue);
        }

        /* Contact us section styling */
        .contact-us-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .contact-meta {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .meta-item {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }

        .meta-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .meta-item p,
        .meta-item a {
          font-size: 1.05rem;
          color: var(--text-main);
          font-weight: 500;
        }

        .meta-item a:hover {
          color: var(--brand-blue);
        }

        .inline-contact-promo {
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          padding: 3rem;
          box-shadow: 0 10px 35px rgba(0,0,0,0.04);
          text-align: center;
        }

        .inline-contact-promo p {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--text-main);
          line-height: 1.5;
        }
      `}</style>
    </>
  );
}
