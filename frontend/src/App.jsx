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
        <div style={{ marginBottom: '1rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            KRATOS Core
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Autonomous RWA Asset Manager • Mantle Network
          </p>
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
