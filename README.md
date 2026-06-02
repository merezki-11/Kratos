# Kratos AI

> **Autonomous Institutional RWA Asset Manager**  
> Built as a flagship project for the **DoraHacks Hackathon**  
> **Target Tracks:** AI Agents · DeFi & Real World Assets (RWA)

[Live Testnet Explorer](https://explorer.testnet.mantle.xyz/) · [Mantle Sepolia Vault Contract](https://explorer.testnet.mantle.xyz/address/0x97E5A35FA59b417DA4B38c9beEC8cBd23693e1AA)

---

Kratos is a highly sophisticated, autonomous, AI-driven asset manager built on the **Mantle Network**. It leverages large language models to ingest live macro-economic data, synthesize optimal asset allocations (USDY, mETH, fBTC), and execute rebalancing transactions entirely on-chain without human intervention. 

---

## 📸 Screenshots

### AI Awakening & Market Intelligence Stream
![AI Awakening Console](images/Screenshot%202026-06-02%20024205.png)

### Vault Overview & Live On-Chain Value
![Vault Overview](images/Screenshot%202026-06-02%20024347.png)

### Strategy Execution & Real-Time Allocation Slider
![Strategy Execution Slider](images/Screenshot%202026-06-02%20024442.png)

### Live Institutional Guardrails
![Institutional Guardrails](images/Screenshot%202026-06-02%20024520.png)

### Agent Identity Verification
![Agent Identity Verification](images/Screenshot%202026-06-02%20024552.png)

---

## 🌟 How It Works

The system utilizes a 100% autonomous, verifiable data pipeline to execute on-chain portfolio rebalancing in real time.

```text
       [ Live Market Oracles ]
                 │
       1. Fetches CoinGecko Data
       (BTC & ETH Live Pricing)
                 │
                 ▼
       [ Kratos AI Brain (Python) ]
                 │
       2. Neural Processing & Strategy
       (Gemini 3.5 Flash / Mistral-7B)
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
 [ React UI ]         [ Mantle Network ]
(Live Telemetry)      (On-Chain Execution)
      │                     │
 3. Bridge Sync       4. Secure TX Signing
      │                     │
      ▼                     ▼
 [ Dashboard ]        [ Kratos Vault ]
(Visual Updates)     (Rebalances USDY/mETH)
```

---

## 🔥 Features

* **Zero-Mocks Architecture** — Completely live system. The AI engine actively pulls live pricing data from CoinGecko every cycle to make real decisions.
* **Dual-Model Inference** — Powered by Google's **Gemini 3.5 Flash** via a hardened REST API, with an automatic, zero-downtime fallback to Hugging Face's **Mistral-7B** in the event of rate limits.
* **Autonomous TX Execution** — The Python daemon holds an Agent Identity Key, allowing it to formulate, sign, and broadcast raw transaction payloads directly to Mantle L2.
* **Premium Cyberpunk Visualization Dashboard** — Full-stack real-time React telemetry displaying live agents, neural thought processes, and market allocations.
* **Institutional Guardrails** — Pre-transaction KYC and geographic compliance verifications are processed before any funds are reallocated on-chain.

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Smart Contracts** | Solidity (Mantle Sepolia Testnet) |
| **Agent Engine** | Python 3.10+ |
| **AI Models** | Gemini 3.5 Flash, Mistral-7B (Hugging Face) |
| **Web App** | React 19, Vite, Tailwind/Vanilla CSS |
| **Styling** | Glassmorphism, CSS Tokens |
| **Blockchain RPC** | Mantle Public RPC |

---

## 🚀 Running Locally

### 1. Configure the Agent Engine
The AI daemon needs your API keys to query live data and broadcast transactions.

```bash
cd agent-engine

# Add your private keys to .env
# GEMINI_API_KEY=...
# HF_API_KEY=...
# AGENT_PRIVATE_KEY=...

# Install requirements (if applicable)
pip install requests python-dotenv

# Start the continuous AI Daemon
python main.py
```

### 2. Spin Up the Premium Web Dashboard
In a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```
Open **http://localhost:5173/** in your browser to watch the AI's thoughts stream in real time.

---

## 📜 License

This project is licensed under the **MIT License**.
