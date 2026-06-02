import json
import os
from datetime import datetime

STATE_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "public", "agent_state.json")

def init_state():
    """Initializes the empty state file if it doesn't exist."""
    if not os.path.exists(STATE_FILE):
        os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
        write_state({
            "logs": ["[SYSTEM] Kratos Agent UI Bridge Initialized..."],
            "allocations": {"usdy": 60, "meth": 30, "fbtc": 10},
            "last_updated": datetime.now().isoformat()
        })

def write_state(data):
    with open(STATE_FILE, "w") as f:
        json.dump(data, f, indent=2)

def read_state():
    try:
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    except Exception:
        return {"logs": [], "allocations": {"usdy": 60, "meth": 30, "fbtc": 10}}

def add_log(message):
    state = read_state()
    state["logs"].append(f"[{datetime.now().strftime('%H:%M:%S')}] {message}")
    # Keep only the last 20 logs so the UI doesn't overflow
    if len(state["logs"]) > 20:
        state["logs"] = state["logs"][-20:]
    state["last_updated"] = datetime.now().isoformat()
    write_state(state)

def update_allocations(usdy, meth, fbtc):
    state = read_state()
    state["allocations"] = {
        "usdy": usdy // 100,  # Convert bps to percentage
        "meth": meth // 100,
        "fbtc": fbtc // 100
    }
    state["last_updated"] = datetime.now().isoformat()
    write_state(state)
