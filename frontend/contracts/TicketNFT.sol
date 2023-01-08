// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    mapping(uint256 => address) private _tokenOwner; // Mapping from token ID to owner
    

    
    constructor() ERC721("Tickets NFT", "TNFT") {}

}