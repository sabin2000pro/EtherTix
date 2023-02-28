// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Donation is ERC721URIStorage, Ownable {

    uint256 public totalNumberOfDonations = 0;

    struct NftDonation {
        uint256 donationID;
        uint256 donationIndex;
        address donorAddress;
        string donationComment;
        uint256 donationAmount;
    }

    NftDonation[] public allDonations; // Store all the donations in an array
   
    constructor() ERC721("Donation Contract", "DNCT") {}
    
}