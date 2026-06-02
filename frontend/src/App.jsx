import React from 'react';
import './index.css';
import IdentityCard from './components/IdentityCard';
import AIAwakeningConsole from './components/AIAwakeningConsole';
import VaultStats from './components/VaultStats';
import VaultOverview from './components/VaultOverview';
import StrategyExecution from './components/StrategyExecution';

function App() {
  return (
    <div className="app-container">
      <div className="dashboard-sidebar">
        <IdentityCard />
      </div>
      <div className="dashboard-main">
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img src="/favicon.svg" alt="Kratos Logo" style={{ width: '4rem', height: '4rem', filter: 'drop-shadow(0 0 10px rgba(0, 255, 204, 0.4))' }} />
          <div>
            <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>
              KRATOS Core
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Autonomous RWA Asset Manager • Mantle Network
            </p>
          </div>
        </div>
        
        <div className="dashboard-grid">
          <VaultOverview />
          <VaultStats />
          <StrategyExecution />
          <AIAwakeningConsole />
        </div>
      </div>
    </div>
  );
}

export default App;
