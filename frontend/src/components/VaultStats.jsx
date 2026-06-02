import React, { useState } from 'react';

const VaultStats = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>ASSET ALLOCATION</h3>
        <div style={{ position: 'relative' }}>
          <span 
            onClick={() => setMenuOpen(!menuOpen)} 
            style={{ color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.2rem 0.5rem', borderRadius: '4px', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            •••
          </span>
          {menuOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', background: '#0f172a',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.5rem',
              zIndex: 10, minWidth: '150px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px' }}
                   onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                   onMouseOut={(e) => e.target.style.background = 'transparent'}
                   onClick={() => { setMenuOpen(false); alert("Modifying Target Allocation Limits..."); }}>
                Edit Targets
              </div>
              <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px' }}
                   onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                   onMouseOut={(e) => e.target.style.background = 'transparent'}
                   onClick={() => { setMenuOpen(false); alert("Exporting current distribution CSV..."); }}>
                Export CSV
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bars for Allocation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AllocationBar asset="Ondo USDY" percentage={60} color="var(--accent-silver)" />
        <AllocationBar asset="mETH" percentage={30} color="#627EEA" />
        <AllocationBar asset="fBTC" percentage={10} color="#F7931A" />
      </div>
    </div>
  );
};

const AllocationBar = ({ asset, percentage, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
      <span>{asset}</span>
      <span style={{ color: 'var(--text-secondary)' }}>{percentage}%</span>
    </div>
    <div style={{ width: '100%', height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: `${percentage}%`, height: '100%', background: color, transition: 'width 1s ease-in-out' }} />
    </div>
  </div>
);

export default VaultStats;
