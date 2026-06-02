// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";
import {ERC8004Registry} from "../src/ERC8004Registry.sol";
import {KratosVault} from "../src/KratosVault.sol";

contract DeployKratos is Script {
    function run() public {
        // Grab the private key from the environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console2.log("Deploying contracts with address: ", deployer);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy Mock Tokens
        MockERC20 usdy = new MockERC20("Ondo US Dollar Yield", "USDY");
        MockERC20 meth = new MockERC20("Mantle Staked Ether", "mETH");
        MockERC20 fbtc = new MockERC20("Fractal Bitcoin", "fBTC");

        // 2. Deploy ERC8004 Registry
        ERC8004Registry registry = new ERC8004Registry();

        // 3. Mint the first Kratos Agent Identity to the deployer
        uint256 kratosAgentId = registry.mintIdentity(deployer, "https://kratos-ai.mock/metadata.json");

        // 4. Deploy Kratos Vault
        KratosVault vault = new KratosVault(
            address(registry),
            kratosAgentId,
            address(usdy),
            address(meth),
            address(fbtc)
        );

        vm.stopBroadcast();

        // Log deployed addresses for the user
        console2.log("\n=== KRATOS DEPLOYMENT SUCCESSFUL ===");
        console2.log("Mock USDY Address: ", address(usdy));
        console2.log("Mock mETH Address: ", address(meth));
        console2.log("Mock fBTC Address: ", address(fbtc));
        console2.log("ERC8004 Registry Address: ", address(registry));
        console2.log("Kratos Vault Address: ", address(vault));
        console2.log("Agent Identity NFT ID: ", kratosAgentId);
    }
}
