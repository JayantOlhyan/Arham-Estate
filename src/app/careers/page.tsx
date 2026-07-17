'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const jobsList = [
  {
    title: 'Real Estate Consultant',
    department: 'Advisory',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '3-5 Years',
  },
  {
    title: 'Investment Analyst',
    department: 'Investments',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '2-4 Years',
  },
  {
    title: 'Marketing Executive',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '2-3 Years',
  },
  {
    title: 'Graphic Designer',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '2-4 Years',
  },
  {
    title: 'Client Relationship Manager',
    department: 'Client Relations',
    type: 'Full-time',
    location: 'Kolkata',
    experience: '3-6 Years',
  },
];

export default function CareersPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    gsap.from('.careers-hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // Values reveal
    gsap.from('.value-node', {
      scrollTrigger: {
        trigger: '.values-section',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out'
    });

    // Why join sections
    gsap.from('.why-join-image-wrap', {
      scrollTrigger: {
        trigger: '.why-join-section',
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.why-join-text', {
      scrollTrigger: {
        trigger: '.why-join-section',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: 'power3.out'
    });

    // Jobs reveal
    gsap.from('.job-row-item', {
      scrollTrigger: {
        trigger: '.jobs-list-section',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleApply = (jobTitle: string) => {
    alert(`Thank you for your interest in the ${jobTitle} role! Please send your resume to careers@arhamestate.com with the subject line containing "${jobTitle}".`);
  };

  return (
    <div ref={scrollContainerRef} className="main-layout-wrapper">
      <Header />

      {/* Hero Section */}
      <section className="careers-hero-section">
        <div className="careers-hero-bg-wrap">
          {/* We can use boardroom interior as background reflecting careers/team context */}
          <img src="/images/boardroom_interior.jpg" alt="Careers at Arham Estate" className="careers-hero-bg" />
          <div className="careers-hero-overlay"></div>
        </div>
        <div className="container pf-hero-box">
          <div className="careers-hero-content">
            <span className="section-label text-green">Careers</span>
            <h1 className="careers-hero-title">
              Build your career. <br />
              <span className="text-highlight">Shape the future of real estate.</span>
            </h1>
            <p className="careers-hero-desc">
              At Arham Estate, we combine market intelligence, expertise and integrity to create long-term value. Join a team that's redefining real estate in India.
            </p>
            <div className="careers-hero-actions">
              <a href="#positions" className="btn btn-primary hero-btn">
                View Open Positions &nbsp;→
              </a>
              <button onClick={() => alert('Watch video: [Life at Arham Estate film placeholder]')} className="btn-watch-video">
                <span className="play-icon">▶</span> Life at Arham Estate (Watch Video)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values-section">
        <div className="container">
          <span className="section-label center">Our Values</span>
          <div className="values-grid">
            <div className="value-node">
              <span className="val-icon">🛡</span>
              <h5>Integrity</h5>
              <p>We do what's right, always.</p>
            </div>
            <div className="value-node">
              <span className="val-icon">⭐</span>
              <h5>Excellence</h5>
              <p>High standards in everything we do.</p>
            </div>
            <div className="value-node">
              <span className="val-icon">💡</span>
              <h5>Innovation</h5>
              <p>We embrace new ideas and smarter solutions.</p>
            </div>
            <div className="value-node">
              <span className="val-icon">🤝</span>
              <h5>Collaboration</h5>
              <p>We win together as one team.</p>
            </div>
            <div className="value-node">
              <span className="val-icon">🎯</span>
              <h5>Impact</h5>
              <p>We create long-term value for all.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Arham Estate */}
      <section className="why-join-section">
        <div className="container why-join-grid">
          <div className="why-join-image-wrap">
            <img src="/images/luxury_living_room.jpg" alt="Arham Estate Premium Reception" className="why-join-image" />
            <div className="reception-logo-overlay">
              <span>ae</span>
              <p>ARHAM ESTATE</p>
            </div>
          </div>
          <div className="why-join-text">
            <span className="section-label">Why Join Arham Estate?</span>
            <h3>More than a job. It's a purpose.</h3>
            
            <ul className="why-checklist">
              <li>
                <span className="chk-mark">✓</span>
                <p>Work on exciting projects that shape skylines and communities in Kolkata.</p>
              </li>
              <li>
                <span className="chk-mark">✓</span>
                <p>Learn from seasoned industry leaders and accelerate your career expertise.</p>
              </li>
              <li>
                <span className="chk-mark">✓</span>
                <p>Enjoy a collaborative, inclusive, and performance-driven workplace culture.</p>
              </li>
              <li>
                <span className="chk-mark">✓</span>
                <p>Take charge of opportunities to innovate, lead, and make a real impact.</p>
              </li>
              <li>
                <span className="chk-mark">✓</span>
                <p>Benefit from highly competitive compensation with clear long-term growth.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section id="positions" className="jobs-list-section">
        <div className="container">
          <div className="jobs-list-header">
            <div className="left-header">
              <span className="section-label">Open Positions</span>
              <h2>Explore opportunities with us</h2>
            </div>
            <a href="#positions" onClick={() => alert('You are viewing all active open positions in Kolkata.')} className="view-all-jobs-link">
              View All Positions &nbsp;→
            </a>
          </div>

          <div className="jobs-list-stack">
            {jobsList.map((job) => (
              <div key={job.title} className="job-row-item">
                <div className="job-meta-left">
                  <h4>{job.title}</h4>
                  <div className="job-labels-row">
                    <span className="job-label">{job.department}</span>
                    <span className="job-dot">•</span>
                    <span className="job-label">{job.type}</span>
                  </div>
                </div>
                
                <div className="job-meta-middle">
                  <span className="job-location">📍 {job.location}</span>
                  <span className="job-exp">💼 {job.experience}</span>
                </div>

                <div className="job-actions-right">
                  <button className="btn btn-outline apply-job-btn" onClick={() => handleApply(job.title)}>
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can expect grid */}
      <section className="benefits-section">
        <div className="container">
          <span className="section-label center">What you can expect</span>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">💵</span>
              <h6>Competitive Salary</h6>
              <p>Performance-based incentives and bonuses purely aligned to target results.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🏥</span>
              <h6>Health Insurance</h6>
              <p>Comprehensive medical and health coverage plans for you and your family.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📈</span>
              <h6>Learning & Growth</h6>
              <p>Active professional development programs, industry training, and certifications.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⚖</span>
              <h6>Work-Life Balance</h6>
              <p>Flexible schedules, leaves management, and robust health & wellness activities.</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🎉</span>
              <h6>Team Engagement</h6>
              <p>Regular team outings, awards recognition, and collaborative celebration events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Don't see right role card */}
      <section className="careers-resume-section">
        <div className="container">
          <div className="resume-callout-card">
            <div className="resume-text">
              <h3>Don't see the right role?</h3>
              <p>Share your profile with us. We are always looking for passionate, driven talent to join our expanding team.</p>
            </div>
            <div className="resume-actions">
              <a href="mailto:careers@arhamestate.com" className="btn btn-primary resume-btn">
                Send Your Resume &nbsp;→
              </a>
              <span className="resume-email-text">careers@arhamestate.com</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* Hero Section */
        .careers-hero-section {
          position: relative;
          padding: 14rem 0 10rem 0;
          overflow: hidden;
          background: #090b0e;
        }

        .careers-hero-bg-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .careers-hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
        }

        .careers-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(9, 11, 14, 0.95) 40%, rgba(9, 11, 14, 0.5) 100%);
          z-index: 2;
        }

        .pf-hero-box {
          position: relative;
          z-index: 3;
        }

        .careers-hero-title {
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 1.5rem;
        }

        .text-highlight {
          color: var(--brand-green);
          font-family: var(--font-outfit), sans-serif;
          font-style: italic;
          font-weight: 600;
        }

        .careers-hero-desc {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.6;
          margin-bottom: 3.5rem;
          max-width: 580px;
        }

        .careers-hero-actions {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .careers-hero-actions {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }
        }

        .hero-btn {
          padding: 1.1rem 3rem;
          display: inline-block;
          text-align: center;
        }

        .btn-watch-video {
          background: none;
          border: none;
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: var(--transition-fast);
        }

        .btn-watch-video:hover {
          color: var(--brand-green);
        }

        .play-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: #ffffff;
        }

        .btn-watch-video:hover .play-icon {
          background: var(--brand-green);
          border-color: var(--brand-green);
        }

        /* Values Row Section */
        .values-section {
          padding: 6rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .center {
          text-align: center;
          margin-bottom: 4rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          text-align: center;
        }

        @media (max-width: 991px) {
          .values-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 576px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }

        .value-node {
          padding: 2.25rem 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          transition: var(--transition-smooth);
        }

        .value-node:hover {
          transform: translateY(-4px);
          border-color: rgba(11, 170, 220, 0.25);
        }

        .val-icon {
          font-size: 2.25rem;
          margin-bottom: 1.25rem;
          display: block;
        }

        .value-node h5 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.1rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .value-node p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Why Join Section */
        .why-join-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .why-join-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        @media (max-width: 991px) {
          .why-join-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }

        .why-join-image-wrap {
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 16/11;
          border: 1px solid var(--border-main);
          position: relative;
          box-shadow: 0 15px 40px rgba(0,0,0,0.02);
        }

        .why-join-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reception-logo-overlay {
          position: absolute;
          left: 3rem;
          top: 3rem;
          background: rgba(250, 249, 246, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-main);
          padding: 1.5rem 2rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .reception-logo-overlay span {
          font-family: var(--font-outfit), sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: var(--brand-green);
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .reception-logo-overlay p {
          font-family: var(--font-outfit), sans-serif;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          color: var(--text-main);
        }

        .why-join-text h3 {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--text-main);
          margin-bottom: 2rem;
        }

        .why-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .why-checklist li {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .chk-mark {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(89, 165, 44, 0.1);
          color: var(--brand-green);
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .why-checklist p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Open Positions section */
        .jobs-list-section {
          padding: 8rem 0;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-main);
        }

        .jobs-list-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
        }

        .jobs-list-header h2 {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--text-main);
        }

        .view-all-jobs-link {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--brand-green);
          transition: var(--transition-fast);
        }

        .view-all-jobs-link:hover {
          padding-left: 4px;
        }

        .jobs-list-stack {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .job-row-item {
          background: var(--bg-main);
          border: 1px solid var(--border-main);
          border-radius: 16px;
          padding: 2rem 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          transition: var(--transition-smooth);
        }

        .job-row-item:hover {
          transform: translateY(-3px);
          border-color: rgba(11, 170, 220, 0.25);
          box-shadow: 0 8px 25px rgba(0,0,0,0.01);
        }

        @media (max-width: 768px) {
          .job-row-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }

        .job-meta-left h4 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.25rem;
          color: var(--text-main);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .job-labels-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .job-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .job-dot {
          color: var(--border-main);
        }

        .job-meta-middle {
          display: flex;
          gap: 2rem;
          font-size: 0.92rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .apply-job-btn {
          padding: 0.75rem 2rem;
          border-radius: 50px;
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
        }

        /* What to expect */
        .benefits-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-main);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          text-align: center;
        }

        @media (max-width: 1200px) {
          .benefits-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .benefit-card {
          padding: 2.5rem 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          transition: var(--transition-smooth);
        }

        .benefit-card:hover {
          transform: translateY(-4px);
          border-color: rgba(89, 165, 44, 0.25);
        }

        .benefit-icon {
          font-size: 2.25rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .benefit-card h6 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.05rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .benefit-card p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Don't see right role */
        .careers-resume-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
        }

        .resume-callout-card {
          background-color: #faf9f6;
          border: 1px solid var(--border-main);
          border-radius: 24px;
          padding: 4.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4rem;
          box-shadow: 0 15px 45px rgba(0,0,0,0.02);
        }

        @media (max-width: 991px) {
          .resume-callout-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
            padding: 3rem;
          }
        }

        .resume-text h3 {
          font-family: var(--font-outfit), sans-serif;
          font-size: 2rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
          font-weight: 700;
        }

        .resume-text p {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.5;
          max-width: 600px;
        }

        .resume-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        @media (max-width: 991px) {
          .resume-actions {
            align-items: flex-start;
            width: 100%;
          }
        }

        .resume-btn {
          padding: 1.1rem 3.5rem;
          border-radius: 50px;
        }

        @media (max-width: 991px) {
          .resume-btn {
            width: 100%;
            text-align: center;
          }
        }

        .resume-email-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--brand-green);
        }
      `}</style>
    </div>
  );
}
