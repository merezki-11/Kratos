// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC8004 {
    /// @notice Emitted when an agent logs reasoning or action.
    event ActionLogged(uint256 indexed agentId, string reasoningHash, string outcome, uint256 xpAwarded);
    
    function logAction(uint256 agentId, string calldata reasoningHash, string calldata outcome, uint256 xpAwarded) external;
    function getAgentReputation(uint256 agentId) external view returns (uint256);
}
