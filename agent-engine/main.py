import time
from data_ingestion import fetch_macro_data
from ai_brain import calculate_optimal_allocation
from executor import execute_rebalance

def run_daemon():
    print("Initializing Kratos AI Agent Daemon...")
    while True:
        try:
            print("\n--- Starting Execution Cycle ---")
            
            # Step 1: Data Ingestion
            print("[1] Fetching Macro-Economic Data...")
            macro_data = fetch_macro_data()
            print(f"Data ingested: {macro_data}")
            
            # Step 2: AI Inference
            print("[2] Requesting AI Macro Synthesis...")
            allocation = calculate_optimal_allocation(macro_data)
            print(f"AI Decision: {allocation}")
            
            # Step 3: Execution
            print("[3] Executing On-Chain Rebalance...")
            execute_rebalance(allocation)
            
            print("--- Cycle Complete. Sleeping for 1 Hour ---")
            time.sleep(3600) # Sleep for 1 hour
            
        except Exception as e:
            print(f"Error in execution cycle: {e}")
            time.sleep(60)

if __name__ == "__main__":
    # For testing, we just run one cycle and exit instead of sleeping
    # run_daemon() 
    print("Initializing Kratos AI Agent Daemon (Single Run Mode)...")
    macro_data = fetch_macro_data()
    allocation = calculate_optimal_allocation(macro_data)
    execute_rebalance(allocation)
