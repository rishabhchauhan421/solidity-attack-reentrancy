//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";



contract NewBank is ReentrancyGuard{
    using Address for address payable;

    mapping(address => uint256) public balanceOf;

    function deposit() external payable{
        balanceOf[msg.sender] +=msg.value;
    }

    function withdraw() external nonReentrant{
        uint256 depositedAmount = balanceOf[msg.sender];
        payable(msg.sender).sendValue(depositedAmount);
        balanceOf[msg.sender] = 0;
    }
}