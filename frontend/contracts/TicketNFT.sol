// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT { // NFT Contract for Event Tickets
    using Counters for Counters.Counter;

    struct NftToken {
        uint256 id;
        address tokenOwner;
        string tokenName;
        uint256 tokenPrice;
    }

    uint256 public totalTokenSupply; // Total supply for the tokens

    mapping (uint256 => NftToken) public tokens; // Create mapping between an Integer and the token struct (1 => Nft data, 2: Nft Data...)
    mapping (uint256 => address) tokenOwners; // Store the owners of the NFT
    mapping (uint256 => bool) public isTokenForSale;
    mapping (uint256 => uint256) public tokensPrice;
    
    constructor() {}

    function mintToken(string memory _tokenName, uint256 _tokenPrice) public {
        address owner = msg.sender; // Store the address of the current owner of the token
        totalTokenSupply++;

        uint256 tokenId = totalTokenSupply; // Set the Token ID to the incremented total supply value
        tokens[tokenId] = NftToken(tokenId, owner, _tokenName, _tokenPrice);
    }

    function transferTokenOwnership(uint256 tokenId, address _toAddress) public payable {
        NftToken storage nftToken = tokens[tokenId];
       require(nftToken.tokenOwner == msg.sender, "You do not own this ticket token.");
        nftToken.tokenOwner = _toAddress;
    }

    function listNftForSale(uint256 _tokenId, uint256 _listingPrice) public { // Function which will list the NFT for sale

    }

    function buyNftToken(uint256 tokenId) public payable { //

    }

}