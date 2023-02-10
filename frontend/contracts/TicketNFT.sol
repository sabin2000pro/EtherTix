// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    uint256 public totalSupply; // Total supply for the tokens
    mapping(uint256 => bool) public tokenExists;

    constructor() ERC721("Event Tickets NFT", "TNFT") {
       
    }

    // Function to mint an NFT token given the token ID
    // Pre-Condition:
    // Post-Condition: 

    function mintToken(uint256 _tokenId) public {

    }


    // @description: Transfers ownership of the NFT token from one wallet address to another
    // @type: Payable (ETH is paid for the invocation of this function)
    
    function transferTokenOwnership(address fromAddress, address toAddress) public payable {

    }

}