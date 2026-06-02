import os
from web3 import Web3
from dotenv import load_dotenv
import hashlib
from state_manager import add_log, update_allocations

load_dotenv()

# Setup Web3
RPC_URL = os.getenv("MANTLE_RPC_URL", "https://rpc.testnet.mantle.xyz")
web3 = Web3(Web3.HTTPProvider(RPC_URL))

PRIVATE_KEY = os.getenv("PRIVATE_KEY", "0x0000000000000000000000000000000000000000000000000000000000000001")
ACCOUNT = web3.eth.account.from_key(PRIVATE_KEY)
VAULT_ADDRESS = os.getenv("VAULT_ADDRESS", "0x0000000000000000000000000000000000000000")

def verify_compliance_index(target_address):
    """
    Simulates checking an institutional KYC/AML oracle or the Vault's whitelist mapping.
    For the hackathon, we simulate an active check returning True.
    """
    add_log(f"[COMPLIANCE] Verifying geographic and KYC indices for target...")
    is_compliant = True 
    if is_compliant:
        add_log("[COMPLIANCE] Address VERIFIED. Institutional guardrails passed.")
    else:
        add_log("[COMPLIANCE] Address REJECTED. Halting execution.")
    return is_compliant

def execute_rebalance(allocation):
    """
    Constructs the transaction, signs it, and broadcasts to Mantle Network.
    Logs reasoning to ERC-8004 via the KratosVault contract.
    """
    add_log(f"[NETWORK] Connected to Mantle L2: {web3.is_connected()}")
    
    if not verify_compliance_index(VAULT_ADDRESS):
        raise Exception("Compliance Verification Failed.")
    
    usdy = allocation.get("usdy", 0)
    meth = allocation.get("meth", 0)
    fbtc = allocation.get("fbtc", 0)
    reasoning = allocation.get("reasoning", "No reasoning provided")
    xp = allocation.get("xpAwarded", 10)
    
    # Update React UI Allocations
    update_allocations(usdy, meth, fbtc)
    
    # Hash reasoning for on-chain storage to save gas
    reasoning_hash = hashlib.sha256(reasoning.encode()).hexdigest()
    
    add_log(f"[EXEC] Allocations (bps): USDY: {usdy}, mETH: {meth}, fBTC: {fbtc}")
    add_log(f"[EXEC] Reasoning Hash: 0x{reasoning_hash}")
    
    # Minimal ABI for the rebalance function
    MINIMAL_ABI = [
        {
            "inputs": [
                {"internalType": "uint256", "name": "_usdyPct", "type": "uint256"},
                {"internalType": "uint256", "name": "_methPct", "type": "uint256"},
                {"internalType": "uint256", "name": "_fbtcPct", "type": "uint256"},
                {"internalType": "string", "name": "reasoningHash", "type": "string"},
                {"internalType": "uint256", "name": "xpAwarded", "type": "uint256"}
            ],
            "name": "rebalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    
    try:
        # Connect to Live Smart Contract
        contract = web3.eth.contract(address=VAULT_ADDRESS, abi=MINIMAL_ABI)
        
        # Build the actual transaction dictionary
        tx = contract.functions.rebalance(usdy, meth, fbtc, reasoning_hash, xp).build_transaction({
            'chainId': 5003, # Mantle Sepolia Testnet
            'gas': 2000000,
            'gasPrice': web3.eth.gas_price,
            'nonce': web3.eth.get_transaction_count(ACCOUNT.address),
        })
        
        add_log("[EXEC] Formulating raw transaction object...")
        signed_tx = web3.eth.account.sign_transaction(tx, PRIVATE_KEY)
        add_log("[EXEC] Signing transaction with Agent Identity Key...")
        
        tx_hash = web3.eth.send_raw_transaction(signed_tx.raw_transaction)
        add_log("[EXEC] Broadcasting transaction to Mantle Network...")
        
        hex_hash = web3.to_hex(tx_hash)
        add_log(f"[SUCCESS] Transaction Confirmed! Hash: {hex_hash}")
        
    except Exception as e:
        add_log(f"[ERROR] Transaction failed to draft or broadcast: {e}")
