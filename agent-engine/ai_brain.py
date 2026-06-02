import os
import json
import requests
from dotenv import load_dotenv
from state_manager import add_log

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
hf_api_key = os.getenv("HF_API_KEY")

def huggingface_fallback(prompt):
    add_log("[AI] Gemini failed/unavailable. Falling back to Hugging Face...")
    if not hf_api_key or len(hf_api_key) < 5:
        add_log("[AI] No HF_API_KEY found! Using local mock fallback.")
        return None
        
    try:
        url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
        headers = {"Authorization": f"Bearer {hf_api_key}"}
        # Simplified prompt for HF to ensure JSON output
        payload = {
            "inputs": f"[INST] {prompt} [/INST]",
            "parameters": {"max_new_tokens": 100, "return_full_text": False}
        }
        response = requests.post(url, headers=headers, json=payload, timeout=15)
        text = response.json()[0]['generated_text']
        cleaned = text.replace('```json', '').replace('```', '').strip()
        add_log("[AI] Hugging Face successfully generated allocation.")
        return json.loads(cleaned)
    except Exception as e:
        add_log(f"[ERROR] Hugging Face fallback failed: {e}")
        return None

def calculate_optimal_allocation(macro_data):
    """
    Calls the Gemini AI to synthesize the optimal portfolio allocation.
    Returns dynamic xpAwarded based on strategic complexity.
    """
    prompt = f"""
    You are Kratos, an elite AI asset manager.
    Based on the following macro-economic data: {json.dumps(macro_data)}
    
    Allocate 10000 basis points (100%) across three assets:
    - USDY (Stable Treasury Yield)
    - mETH (Liquid Staked ETH)
    - fBTC (Bitcoin Exposure)
    
    Also determine an 'xpAwarded' integer (10 to 100) based on how volatile/complex the market is (higher XP for difficult bearish conditions).
    
    Output ONLY a JSON object with the following keys:
    {{
      "usdy": 0,
      "meth": 0,
      "fbtc": 0,
      "reasoning": "string explaining your macro thesis",
      "xpAwarded": 10
    }}
    """
    
    add_log(f"[AI] Initiating neural processing of macro data...")
    if api_key and len(api_key) > 5:
        try:
            add_log("[AI] Sending payload to Gemini 3.5 Flash via REST API...")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={api_key}"
            headers = {'Content-Type': 'application/json'}
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": 0.2
                }
            }
            response = requests.post(url, headers=headers, json=payload, timeout=15)
            
            if response.ok:
                resp_json = response.json()
                text = resp_json['candidates'][0]['content']['parts'][0]['text']
                cleaned = text.replace('```json', '').replace('```', '').strip()
                add_log("[AI] Gemini successfully generated strategic allocation.")
                return json.loads(cleaned)
            else:
                add_log(f"[ERROR] Gemini REST Error: {response.text}")
        except Exception as e:
            add_log(f"[ERROR] Gemini API Error: {e}")
            
    # Fallback to Hugging Face
    hf_result = huggingface_fallback(prompt)
    if hf_result:
        return hf_result
            
    # Final Fallback/Mock logic if all APIs fail
    add_log("[WARNING] All AI APIs failed. Using localized macro-algorithms.")
    if macro_data["market_sentiment"] == "bearish":
        return {"usdy": 7000, "meth": 2000, "fbtc": 1000, "reasoning": "Bearish sentiment detected, flight to safety (USDY).", "xpAwarded": 50}
    elif macro_data["market_sentiment"] == "bullish":
        return {"usdy": 2000, "meth": 5000, "fbtc": 3000, "reasoning": "Bullish sentiment, shifting to risk-on assets.", "xpAwarded": 30}
    else:
        return {"usdy": 4000, "meth": 4000, "fbtc": 2000, "reasoning": "Neutral/volatile market, balanced allocation.", "xpAwarded": 10}
