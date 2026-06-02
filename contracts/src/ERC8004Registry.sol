// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC8004} from "./interfaces/IERC8004.sol";

contract ERC8004Registry is ERC721, IERC8004 {
    uint256 private _nextTokenId;
    
    mapping(uint256 => uint256) public agentReputation;
    mapping(uint256 => string) public agentMetadata;

    modifier onlyOwnerOf(uint256 agentId) {
        require(ownerOf(agentId) == msg.sender, "Not agent owner");
        _;
    }

    constructor() ERC721("Kratos Agent Identity", "KRATOS") {}

    function mintIdentity(address to, string memory metadataURI) external returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        agentMetadata[tokenId] = metadataURI;
        return tokenId;
    }

    function logAction(uint256 agentId, string calldata reasoningHash, string calldata outcome, uint256 xpAwarded) external onlyOwnerOf(agentId) {
        // Dynamic reputation logic based on AI's assessed value/yield capture
        agentReputation[agentId] += xpAwarded;
        emit ActionLogged(agentId, reasoningHash, outcome, xpAwarded);
    }

    function getAgentReputation(uint256 agentId) external view returns (uint256) {
        return agentReputation[agentId];
    }
}
