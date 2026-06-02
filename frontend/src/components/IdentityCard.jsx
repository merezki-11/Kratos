import React from 'react';

const IdentityCard = () => {
  return (
    <div className="glass-panel pulse-glow" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative gradient orb */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '150px',
        height: '150px',
        background: 'var(--accent-emerald)',
        filter: 'blur(80px)',
        opacity: 0.5,
        borderRadius: '50%'
      }} />

      <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        Agent Identity
      </h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>KRATOS-1</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
          ERC-8004 ID: #0084
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Status</span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>● Active</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Reputation Score</span>
          <span style={{ fontWeight: 600 }}>14,502 XP</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Lifetime Yield</span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>+$240,500</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Success Rate</span>
          <span style={{ fontWeight: 600 }}>98.4%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Network</span>
          <span style={{ fontWeight: 600 }}>Mantle L2</span>
        </div>
      </div>

      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <a href="https://explorer.testnet.mantle.xyz" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-silver)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--accent-emerald)'} onMouseOut={(e) => e.target.style.color = 'var(--accent-silver)'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          View On-Chain Audit Logs
        </a>
      </div>
    </div>
  );
};

export default IdentityCard;
