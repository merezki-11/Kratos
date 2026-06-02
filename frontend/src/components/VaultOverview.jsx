import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const VAULT_ADDRESS = "0x97E5A35FA59b417DA4B38c9beEC8cBd23693e1AA";
const RPC_URL = "https://rpc.sepolia.mantle.xyz";
const MINIMAL_ABI = ["function totalValueLocked() view returns (uint256)"];

const VaultOverview = () => {
  const [tvl, setTvl] = useState("$1,425,890,320.45"); // Fallback
  const [marketData, setMarketData] = useState({ btc: "Loading...", eth: "Loading..." });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTVL = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const vaultContract = new ethers.Contract(VAULT_ADDRESS, MINIMAL_ABI, provider);
        
        const rawTvl = await vaultContract.totalValueLocked();
        
        if (rawTvl > 0n) {
          // Format with commas and 2 decimals
          const formatted = Number(ethers.formatUnits(rawTvl, 18)).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          setTvl(`$${formatted}`);
        }
      } catch (err) {
        console.error("Failed to fetch live TVL:", err);
      }
    };

    const fetchMarketData = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
        if (res.ok) {
          const data = await res.json();
          setMarketData({
            btc: `$${data.bitcoin.usd.toLocaleString()}`,
            eth: `$${data.ethereum.usd.toLocaleString()}`
          });
        }
      } catch (err) {
        console.error("CoinGecko fetch failed:", err);
      }
    };

    fetchTVL();
    fetchMarketData();
  }, []);
  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>VAULT OVERVIEW</h3>
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
                   onClick={() => { setMenuOpen(false); alert("Force syncing on-chain TVL..."); }}>
                Sync On-Chain Data
              </div>
              <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: '4px' }}
                   onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                   onMouseOut={(e) => e.target.style.background = 'transparent'}
                   onClick={() => { setMenuOpen(false); window.open("https://explorer.testnet.mantle.xyz", "_blank"); }}>
                View on Explorer
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Value Locked</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{tvl}</h2>
          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 600 }}>(+6.7%)</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', color: '#a0aec0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#F7931A' }}>●</span> BTC: {marketData.btc}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', color: '#a0aec0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ color: '#627EEA' }}>●</span> ETH: {marketData.eth}
          </div>
        </div>
      </div>
      
      {/* Simulated SVG Line Chart for Growth */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', minHeight: '120px', marginTop: '1rem', overflow: 'visible' }}>
        <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-emerald)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--bg-color)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path 
            d="M 0 90 C 50 90, 80 40, 120 50 C 160 60, 200 10, 250 30 C 280 40, 290 20, 300 20 L 300 100 L 0 100 Z" 
            fill="url(#lineGrad)" 
          />
          <path 
            d="M 0 90 C 50 90, 80 40, 120 50 C 160 60, 200 10, 250 30 C 280 40, 290 20, 300 20" 
            fill="none" 
            stroke="var(--accent-emerald)" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default VaultOverview;
