// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Donation is ERC721URIStorage, Ownable {
   
    constructor() ERC721("Donation Contract", "DNCT") {}
    
}