import requests
from state_manager import add_log, init_state

def fetch_macro_data():
    """
    Fetches real-time market data from CoinGecko to feed into the AI.
    """
    init_state() # Ensure state file exists
    add_log("[DATA] Fetching live market data from CoinGecko...")
    try:
        url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,ondo-foundation&vs_currencies=usd&include_24hr_change=true"
        response = requests.get(url, timeout=10)
        data = response.json()
        
        eth_change = data.get("ethereum", {}).get("usd_24h_change", 0)
        btc_change = data.get("bitcoin", {}).get("usd_24h_change", 0)
        
        # Simple sentiment calculation based on real 24h volatility
        avg_change = (eth_change + btc_change) / 2
        if avg_change > 2:
            sentiment = "bullish"
        elif avg_change < -2:
            sentiment = "bearish"
        else:
            sentiment = "neutral"
            
        return {
            "ethereum_usd": data.get("ethereum", {}).get("usd", 0),
            "ethereum_24h_change": round(eth_change, 2),
            "bitcoin_usd": data.get("bitcoin", {}).get("usd", 0),
            "bitcoin_24h_change": round(btc_change, 2),
            "usdy_yield_apy": 5.1, # Static real-world yield for USDY
            "market_sentiment": sentiment
        }
    except Exception as e:
        add_log(f"[ERROR] Live data fetch failed: {e}. Falling back to default.")
        return {
            "ethereum_usd": 3500,
            "bitcoin_usd": 65000,
            "market_sentiment": "volatile"
        }
