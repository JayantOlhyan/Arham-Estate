'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface Project {
  id: string;
  title: string;
  location: string;
  developer: string;
  price: string;
  zone: string;
  hiraLink: string;
}

const projects: Project[] = [
  {
    id: 'aurus',
    title: 'Aurus',
    location: 'Near ITC Hotel, EM Bypass',
    developer: 'PS Group',
    price: 'Available on request',
    zone: 'E M Bypass',
    hiraLink: 'https://hira.wb.gov.in'
  },
  {
    id: 'jiva',
    title: 'Jiva',
    location: 'Off EM Bypass, Kolkata',
    developer: 'PS Group',
    price: 'Available on request',
    zone: 'E M Bypass',
    hiraLink: 'https://hira.wb.gov.in'
  },
  {
    id: 'panache',
    title: 'Panache',
    location: 'Near Sec V, Salt Lake, Kolkata',
    developer: 'PS Group',
    price: 'Available on request',
    zone: 'East Kolkata',
    hiraLink: 'https://hira.wb.gov.in'
  },
  {
    id: 'the-102',
    title: 'The 102',
    location: 'Near Joka Metro, Kolkata',
    developer: 'PS Group',
    price: 'Available on request',
    zone: 'South Kolkata',
    hiraLink: 'https://hira.wb.gov.in'
  }
];

interface ProjectsProps {
  onSelectProject: (projectName: string) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="container">
        
        <div className="projects-header">
          <span className="section-label">Featured Portfolio</span>
          <h2 className="projects-title">Hot Properties</h2>
          <p className="projects-subtitle">
            Discover premier residential developments in Kolkata's most sought-after neighborhoods.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              ref={(el) => { if (el) cardRefs.current[index] = el; }}
              className="project-card"
            >
              {/* Media placeholder exactly as requested: uppercase big text */}
              <div className="project-image-placeholder">
                <span className="media-placeholder-text">[{project.title} IMAGE HERE]</span>
                <span className="project-zone-badge">{project.zone}</span>
              </div>
              
              <div className="project-details">
                <h3 className="project-card-title">{project.title}</h3>
                
                <div className="project-info-row">
                  <span className="info-label">Developer</span>
                  <span className="info-value">{project.developer}</span>
                </div>
                <div className="project-info-row">
                  <span className="info-label">Location</span>
                  <span className="info-value">{project.location}</span>
                </div>
                <div className="project-info-row">
                  <span className="info-label">Price</span>
                  <span className="info-value price-highlight">{project.price}</span>
                </div>

                <div className="hira-verification">
                  <a href={project.hiraLink} target="_blank" rel="noopener noreferrer" className="hira-link">
                    HIRA Verified : {project.hiraLink.replace('https://', '')}
                  </a>
                </div>

                <button 
                  onClick={() => onSelectProject(project.title)}
                  className="btn btn-primary card-action-btn"
                >
                  Request Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .projects-section {
          padding: 8rem 0;
          background-color: var(--bg-main);
          color: var(--text-main);
          border-bottom: 1px solid var(--border-main);
        }

        .projects-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 5rem auto;
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

        .projects-title {
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          margin-bottom: 1.25rem;
          color: var(--text-main);
        }

        .projects-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3.5rem;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .project-card {
          border-radius: 24px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-dark);
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.04);
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
          border-color: rgba(89, 165, 44, 0.3);
        }

        .project-image-placeholder {
          aspect-ratio: 16/10;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-bottom: 1px solid var(--border-dark);
          overflow: hidden;
        }

        .project-card:hover .project-image-placeholder {
          background: linear-gradient(135deg, #FAF9F6 0%, #f1f5f9 100%);
        }

        .project-image-placeholder .media-placeholder-text {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(15, 23, 42, 0.15);
          text-transform: uppercase;
          transition: var(--transition-smooth);
        }

        .project-card:hover .media-placeholder-text {
          color: rgba(15, 23, 42, 0.25);
          transform: scale(1.05);
        }

        .project-zone-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: rgba(11, 170, 220, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(11, 170, 220, 0.3);
          color: var(--brand-blue);
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 1rem;
          border-radius: 50px;
        }

        .project-details {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .project-card-title {
          font-size: 1.75rem;
          color: var(--text-main);
          margin-bottom: 1.5rem;
        }

        .project-info-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-main);
        }

        .info-label {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .info-value {
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 500;
        }

        .price-highlight {
          color: var(--brand-green);
          font-weight: 600;
        }

        .hira-verification {
          margin-top: 1rem;
          margin-bottom: 2rem;
        }

        .hira-link {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: underline;
        }

        .hira-link:hover {
          color: var(--brand-blue);
        }

        .card-action-btn {
          width: 100%;
          margin-top: auto;
        }
      `}</style>
    </section>
  );
}
