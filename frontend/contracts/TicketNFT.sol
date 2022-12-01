// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract EventMarket {

    address contractOwner = msg.sender;
    uint256 msgValue = msg.value;

    uint256[] public availableTokens;

    constructor() {}

    function listNftOnSale(uint256 tokenId, uint256 tokenPrice) public view returns(uint256) {}
    function buyToken(uint256 tokenId, uint256 tokenPrice) public {}
    

}