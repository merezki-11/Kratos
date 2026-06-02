// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {MockERC20 as IERC20} from "./mocks/MockERC20.sol";
import {IERC8004} from "./interfaces/IERC8004.sol";

contract KratosVault {
    address public owner;
    IERC8004 public registry;
    uint256 public kratosAgentId;

    IERC20 public usdy;
    IERC20 public meth;
    IERC20 public fbtc;

    uint256 public totalValueLocked;
    
    // Allocations in basis points (10000 = 100%)
    uint256 public usdyAllocation;
    uint256 public methAllocation;
    uint256 public fbtcAllocation;

    // KYC/AML Compliance Guardrails
    mapping(address => bool) public isWhitelisted;
    mapping(address => mapping(address => uint256)) public userDeposits; // user -> token -> amount

    event Rebalance(uint256 usdyPct, uint256 methPct, uint256 fbtcPct);
    event Deposited(address indexed user, address indexed token, uint256 amount);

    modifier onlyAgent() {
        require(msg.sender == owner, "Only agent owner");
        _;
    }

    modifier onlyWhitelisted(address _user) {
        require(isWhitelisted[_user], "Address not KYC/AML verified");
        _;
    }

    constructor(address _registry, uint256 _agentId, address _usdy, address _meth, address _fbtc) {
        owner = msg.sender;
        registry = IERC8004(_registry);
        kratosAgentId = _agentId;
        usdy = IERC20(_usdy);
        meth = IERC20(_meth);
        fbtc = IERC20(_fbtc);
        
        // Whitelist the deployer by default for easy hackathon demo testing
        isWhitelisted[msg.sender] = true;
    }

    function updateWhitelist(address _user, bool _status) external onlyAgent {
        isWhitelisted[_user] = _status;
    }

    function deposit(uint256 amount, address token) external onlyWhitelisted(msg.sender) {
        require(token == address(usdy) || token == address(meth) || token == address(fbtc), "Unsupported asset");
        
        // Execute real token transfer
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        userDeposits[msg.sender][token] += amount;
        totalValueLocked += amount; // Uses 1:1 USD peg assumption for simplicity of hackathon TVL calc
        
        emit Deposited(msg.sender, token, amount);
    }

    function rebalance(
        uint256 _usdyPct, 
        uint256 _methPct, 
        uint256 _fbtcPct, 
        string calldata reasoningHash,
        uint256 xpAwarded
    ) external onlyAgent {
        require(_usdyPct + _methPct + _fbtcPct == 10000, "Must sum to 100%");
        
        usdyAllocation = _usdyPct;
        methAllocation = _methPct;
        fbtcAllocation = _fbtcPct;

        // Log reasoning to ERC-8004 Registry with dynamic XP based on market conditions
        registry.logAction(kratosAgentId, reasoningHash, "REBALANCE_EXECUTED", xpAwarded);

        emit Rebalance(_usdyPct, _methPct, _fbtcPct);
    }
}
