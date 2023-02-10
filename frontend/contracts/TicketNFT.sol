// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct NftToken {
        uint256 id;
        bool tokenExists;
        address tokenOwner;
        uint256 tokenPrice;
        bool isTokenForSale;
    }
   
    mapping(uint256 => address) tokenOwners; // Store the owners of the NFT
    uint256 public totalSupply; // Total supply for the tokens
    
    constructor() ERC721("Event Tickets NFT", "TNFT") {}

    // Function to mint an NFT token given the token ID
    // Pre-Condition:
    // Post-Condition: 

    function mintToken(uint256 _tokenId, string memory tokenDetails) public {
       // Code here that mints a new token on the blockchain
    }

    // @description: Transfers ownership of the NFT token from one wallet address to another
    // @type: Payable (ETH is paid for the invocation of this function)
    // Pre-Condition:
    // Post-Condition: After the function is invoked, the new owner wallet address stores the NFT data
    
    function transferTokenOwnership(address fromAddress, address toAddress) public payable {

    }

    function listNftForSale() public {

    }

    function buyNftToken() public payable {

    }

}