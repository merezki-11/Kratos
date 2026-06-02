import React, { useState, useEffect } from 'react';

const StrategyExecution = () => {
  const [allocations, setAllocations] = useState({ usdy: 68, meth: 21, fbtc: 11 });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch(`/agent_state.json?t=${new Date().getTime()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.allocations) {
            setAllocations(data.allocations);
          }
        }
      } catch (err) {
        // Silently ignore if file doesn't exist yet
      }
    };

    const interval = setInterval(fetchState, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>STRATEGY EXECUTION</h3>
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
              zIndex: 10, minWidth: '160px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px' }}
                   onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                   onMouseOut={(e) => e.target.style.background = 'transparent'}
                   onClick={() => { setMenuOpen(false); alert("Re-syncing AI Strategy state..."); }}>
                Force AI Sync
              </div>
              <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px' }}
                   onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                   onMouseOut={(e) => e.target.style.background = 'transparent'}
                   onClick={() => { setMenuOpen(false); alert("Reviewing historic allocations..."); }}>
                Allocation History
              </div>
            </div>
          )}
        </div>
      </div>
      
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        RWA / Tokenized Assets
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></span>
              USDY
            </span>
            <span>{allocations.usdy}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--glass-bg)', borderRadius: '3px', overflow: 'hidden', transition: 'all 0.5s ease-out' }}>
            <div style={{ height: '100%', width: `${allocations.usdy}%`, background: 'var(--accent-emerald)', transition: 'width 1s ease-in-out' }}></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#627EEA' }}></span>
              mETH
            </span>
            <span>{allocations.meth}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--glass-bg)', borderRadius: '3px', overflow: 'hidden', transition: 'all 0.5s ease-out' }}>
            <div style={{ height: '100%', width: `${allocations.meth}%`, background: '#627EEA', transition: 'width 1s ease-in-out' }}></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#F7931A' }}></span>
              fBTC
            </span>
            <span>{allocations.fbtc}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--glass-bg)', borderRadius: '3px', overflow: 'hidden', transition: 'all 0.5s ease-out' }}>
            <div style={{ height: '100%', width: `${allocations.fbtc}%`, background: '#F7931A', transition: 'width 1s ease-in-out' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyExecution;
