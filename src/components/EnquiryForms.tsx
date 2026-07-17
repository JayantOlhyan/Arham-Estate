'use client';

import React, { useState } from 'react';

// 1. Sidebar Alerts Form Component
export function AlertsForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="alerts-form-card">
      <h3 className="form-card-title">Arham Alerts</h3>
      <p className="form-card-subtitle">
        Be the first to know about new launches and exclusive real estate deals in Kolkata.
      </p>

      {submitted ? (
        <div className="success-alert">
          <span className="success-icon">✓</span>
          Thank you for subscribing! We will keep you updated.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="alerts-form-element">
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input 
              type="tel" 
              placeholder="Contact Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary form-submit-btn">
            Get Alerts
          </button>
        </form>
      )}

      <style jsx>{`
        .alerts-form-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.04);
        }

        .form-card-title {
          font-size: 1.5rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
        }

        .form-card-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .alerts-form-element {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          width: 100%;
        }

        .form-control {
          width: 100%;
          padding: 0.9rem 1.25rem;
          background: rgba(15, 23, 42, 0.01);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 50px;
          color: var(--text-main);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition-fast);
        }

        .form-control:focus {
          border-color: var(--brand-green);
          background: rgba(15, 23, 42, 0.03);
        }

        .form-submit-btn {
          width: 100%;
          margin-top: 0.5rem;
        }

        .success-alert {
          padding: 1.5rem;
          background: rgba(108, 182, 60, 0.1);
          border: 1px solid rgba(108, 182, 60, 0.2);
          border-radius: 12px;
          color: var(--brand-green);
          font-size: 0.95rem;
          line-height: 1.5;
          text-align: center;
        }

        .success-icon {
          display: block;
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

// 2. Comprehensive Enquiry Modal Component
interface EnquiryModalProps {
  projectName: string | null;
  onClose: () => void;
}

export function EnquiryModal({ projectName, onClose }: EnquiryModalProps) {
  const [intent, setIntent] = useState('Buy');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!projectName) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-card">
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          ✕
        </button>

        <h3 className="modal-title">Enquiry Form</h3>
        <p className="modal-subtitle">
          Interested in <span className="highlight-project">{projectName}</span>? Provide your details below and our advisors will contact you shortly.
        </p>

        {submitted ? (
          <div className="modal-success-screen">
            <div className="modal-success-circle">✓</div>
            <h4>Thank you!</h4>
            <p>Your enquiry for {projectName} has been registered successfully. We will get back to you shortly.</p>
            <button onClick={onClose} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form-grid">
            
            {/* Intent Option Segment */}
            <div className="form-group full-width">
              <label className="form-label">I want to:</label>
              <div className="intent-switch">
                {['Buy', 'Rent', 'Sell'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`intent-btn ${intent === option ? 'active' : ''}`}
                    onClick={() => setIntent(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Interested Project"
                value={projectName}
                disabled
                className="form-control disabled-input"
              />
            </div>

            <div className="form-group full-width">
              <textarea
                placeholder="Provide details about your query (e.g. Budget requirements, preferred floor range, etc.)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={3}
                className="form-control textarea-input"
              />
            </div>

            <button type="submit" className="btn btn-primary full-width modal-submit-btn">
              Submit Enquiry
            </button>

          </form>
        )}
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(250, 249, 246, 0.7);
          backdrop-filter: blur(10px);
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
        }

        .modal-content-card {
          width: 100%;
          max-width: 580px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-main);
          border-radius: 24px;
          padding: 3rem;
          position: relative;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.08);
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 1.75rem;
          right: 1.75rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: var(--text-muted);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .modal-close-btn:hover {
          background: rgba(15, 23, 42, 0.08);
          color: var(--text-main);
        }

        .modal-title {
          font-size: 2rem;
          color: var(--text-main);
          margin-bottom: 0.75rem;
        }

        .modal-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 2.5rem;
        }

        .highlight-project {
          color: var(--brand-green);
          font-weight: 600;
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 576px) {
          .modal-form-grid {
            grid-template-columns: 1fr;
          }
          .modal-content-card {
            padding: 2rem;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.9rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .intent-switch {
          display: flex;
          background: rgba(15, 23, 42, 0.02);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 50px;
          padding: 0.25rem;
        }

        .intent-btn {
          flex: 1;
          padding: 0.6rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-outfit), sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          border-radius: 50px;
          transition: var(--transition-fast);
        }

        .intent-btn.active {
          background: linear-gradient(135deg, var(--brand-green), var(--brand-blue));
          color: #ffffff;
        }

        .form-control {
          padding: 0.9rem 1.25rem;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.2);
          border-radius: 50px;
          color: var(--text-main);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition-fast);
        }

        .form-control:focus {
          border-color: var(--brand-green);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(89, 165, 44, 0.15);
        }

        .disabled-input {
          background: rgba(15, 23, 42, 0.04);
          border-color: rgba(15, 23, 42, 0.04);
          color: rgba(15, 23, 42, 0.5);
        }

        .textarea-input {
          border-radius: 16px;
          resize: none;
        }

        .modal-submit-btn {
          margin-top: 1rem;
        }

        /* Success screen styles */
        .modal-success-screen {
          text-align: center;
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .modal-success-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(89, 165, 44, 0.1);
          border: 1px solid var(--brand-green);
          color: var(--brand-green);
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .modal-success-screen h4 {
          font-size: 1.75rem;
          color: var(--text-main);
        }

        .modal-success-screen p {
          font-size: 1rem;
          color: var(--text-muted);
          max-width: 360px;
        }
      `}</style>
    </div>
  );
}
