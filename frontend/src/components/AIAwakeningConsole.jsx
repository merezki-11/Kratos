import React, { useState, useEffect } from 'react';

const AIAwakeningConsole = () => {
  const [logs, setLogs] = useState([
    "[SYSTEM] Kratos Agent Initialized...",
    "[NETWORK] Connected to Mantle Testnet.",
    "[DATA] Awaiting next macro-economic ingestion cycle..."
  ]);
  const containerRef = React.useRef(null);
  const prevLogsLength = React.useRef(0);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/agent_state.json?t=${new Date().getTime()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.logs && data.logs.length > 0) {
            // Only update if the content actually changed to prevent constant re-renders
            setLogs(prev => {
              if (JSON.stringify(prev) !== JSON.stringify(data.logs)) {
                return data.logs;
              }
              return prev;
            });
          }
        }
      } catch (err) {
        // Silently ignore if file doesn't exist yet
      }
    };

    const interval = setInterval(fetchLogs, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Only auto-scroll if new logs were actually added
    if (containerRef.current && logs.length !== prevLogsLength.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      prevLogsLength.current = logs.length;
    }
  }, [logs]);

  return (
    <div className="glass-panel" style={{ background: '#090d18' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', animation: 'pulseGlow 2s infinite' }} />
        <h2 style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          AI Awakening Stream
        </h2>
      </div>
      
      <div ref={containerRef} style={{ 
        fontFamily: 'monospace', 
        fontSize: '0.9rem',
        color: '#a3b8cc',
        height: '250px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {logs.map((log, index) => (
          <div key={index} style={{ opacity: 0, animation: 'fadeIn 0.3s forwards' }}>
            <span style={{ 
              color: log.includes('[SUCCESS]') || log.includes('[BRAIN]') ? 'var(--accent-emerald)' 
              : log.includes('[ERROR]') || log.includes('[WARNING]') ? '#ef4444' 
              : log.includes('[DATA]') || log.includes('[COMPLIANCE]') || log.includes('[NETWORK]') ? '#38bdf8' 
              : 'var(--text-secondary)' 
            }}>
              {log}
            </span>
          </div>
        ))}
        {/* Simple inline animation style for fadeIn */}
        <style>
          {`@keyframes fadeIn { to { opacity: 1; } }`}
        </style>
      </div>
    </div>
  );
};

export default AIAwakeningConsole;
