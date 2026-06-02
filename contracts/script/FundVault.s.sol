// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";
import {KratosVault} from "../src/KratosVault.sol";

contract FundVault is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deployed Addresses
        address usdyAddr = 0x7728be128b629ADB48ccD12c5440acBC05939444;
        address vaultAddr = 0x97E5A35FA59b417DA4B38c9beEC8cBd23693e1AA;

        MockERC20 usdy = MockERC20(usdyAddr);
        KratosVault vault = KratosVault(vaultAddr);

        uint256 depositAmount = 5000000 * 1e18; // 5 Million

        // 1. Mint mock USDY to deployer
        usdy.mint(vm.addr(deployerPrivateKey), depositAmount);

        // 2. Approve Vault to spend
        usdy.approve(vaultAddr, depositAmount);

        // 3. Deposit into Vault
        vault.deposit(depositAmount, usdyAddr);

        vm.stopBroadcast();
        console2.log("=== Successfully deposited 5,000,000 USDY into Kratos Vault! ===");
    }
}
