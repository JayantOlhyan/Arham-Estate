'use client';

import React, { useState } from 'react';

export interface LegendItem {
  key: string;
  label: string;
  color: string;
  bg: string;
  description: string;
}

export const PROPERTY_STATUS_LEGEND: LegendItem[] = [
  {
    key: 'READY TO MOVE',
    label: 'Ready to Move',
    color: '#15803d',
    bg: 'rgba(21, 128, 61, 0.12)',
    description: 'Occupancy certificate issued. Ready for immediate handover and interior work.',
  },
  {
    key: 'UNDER CONSTRUCTION',
    label: 'Under Construction',
    color: '#b45309',
    bg: 'rgba(180, 83, 9, 0.12)',
    description: 'On-schedule structural development with milestone-linked payment schedules.',
  },
  {
    key: 'NEW LAUNCH',
    label: 'New Launch',
    color: '#0369a1',
    bg: 'rgba(3, 105, 161, 0.12)',
    description: 'Newly announced project with early-bird pricing and priority unit selection.',
  },
  {
    key: 'PRE-LAUNCH',
    label: 'Pre-Launch / Expression of Interest',
    color: '#7c3aed',
    bg: 'rgba(124, 58, 237, 0.12)',
    description: 'Upcoming landmark development under pre-registration.',
  },
];

export const AMENITY_TIERS = [
  { icon: '🛡️', title: 'RERA Certified', desc: '100% compliant with West Bengal Housing Industry Regulation Act' },
  { icon: '🌿', title: 'IGBC Green Certified', desc: 'Eco-conscious design with rainwater harvesting & solar power' },
  { icon: '🏛️', title: 'Freehold Land Title', desc: 'Legally vetted titles with clear chain of ownership' },
];

interface PropertyLegendProps {
  activeStatus?: string;
  onSelectStatus?: (status: string) => void;
  showTiers?: boolean;
  className?: string;
}

export default function PropertyLegend({
  activeStatus = 'All',
  onSelectStatus,
  showTiers = true,
  className = '',
}: PropertyLegendProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <aside className={`property-legend-container ${className}`} aria-label="Property Status and Verification Legend">
      <div className="legend-header">
        <div className="legend-title-wrap">
          <span className="legend-indicator-dot" aria-hidden="true" />
          <h4 className="legend-title">Listing & Status Legend</h4>
        </div>
        <p className="legend-caption">
          Transparent indicators for development milestones and verified regulatory compliance across Kolkata.
        </p>
      </div>

      <div className="legend-status-grid" role="list">
        {PROPERTY_STATUS_LEGEND.map((item) => {
          const isSelected = activeStatus === item.key;
          return (
            <div
              key={item.key}
              role="listitem"
              className={`legend-pill ${isSelected ? 'active-pill' : ''} ${onSelectStatus ? 'clickable' : ''}`}
              onClick={() => onSelectStatus && onSelectStatus(isSelected ? 'All' : item.key)}
              onMouseEnter={() => setShowTooltip(item.key)}
              onMouseLeave={() => setShowTooltip(null)}
              tabIndex={onSelectStatus ? 0 : undefined}
              onKeyDown={(e) => {
                if (onSelectStatus && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onSelectStatus(isSelected ? 'All' : item.key);
                }
              }}
            >
              <span
                className="status-dot"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="status-label">{item.label}</span>
              {showTooltip === item.key && (
                <div className="legend-popover" role="tooltip">
                  {item.description}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showTiers && (
        <div className="legend-compliance-row">
          {AMENITY_TIERS.map((tier, idx) => (
            <div key={idx} className="compliance-badge">
              <span className="compliance-icon" aria-hidden="true">{tier.icon}</span>
              <div className="compliance-texts">
                <span className="compliance-title">{tier.title}</span>
                <span className="compliance-desc">{tier.desc}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .property-legend-container {
          background: #ffffff;
          border: 1px solid var(--border-main);
          border-radius: 16px;
          padding: 1.5rem 1.75rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .legend-header {
          margin-bottom: 1rem;
        }

        .legend-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .legend-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--brand-green);
        }

        .legend-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
          letter-spacing: -0.01em;
        }

        .legend-caption {
          font-size: 0.825rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .legend-status-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }

        .legend-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.9rem;
          background: rgba(15, 23, 42, 0.02);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 50px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-main);
          transition: var(--transition-fast);
          user-select: none;
        }

        .legend-pill.clickable {
          cursor: pointer;
        }

        .legend-pill:hover,
        .legend-pill.active-pill {
          background: rgba(89, 165, 44, 0.08);
          border-color: var(--brand-green);
          transform: translateY(-1px);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .legend-popover {
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          background: #0f172a;
          color: #ffffff;
          font-size: 0.75rem;
          line-height: 1.35;
          padding: 0.45rem 0.75rem;
          border-radius: 6px;
          white-space: normal;
          width: 200px;
          z-index: 20;
          pointer-events: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .legend-popover::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: #0f172a transparent transparent transparent;
        }

        .legend-compliance-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px dashed rgba(15, 23, 42, 0.08);
        }

        @media (max-width: 850px) {
          .legend-compliance-row {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }

        .compliance-badge {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .compliance-icon {
          font-size: 1.15rem;
          line-height: 1;
        }

        .compliance-texts {
          display: flex;
          flex-direction: column;
        }

        .compliance-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .compliance-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.35;
        }
      `}</style>
    </aside>
  );
}
