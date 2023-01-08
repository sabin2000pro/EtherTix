// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Donation is ERC721URIStorage {
    address payable public recipient; // The address of the donator
    uint256 public totalDonated; // How much has been donated
    bool public didDonate;

    uint256[] public listOfDonations;
    mapping(address => bool) public recipientDonation;

   constructor(address payable _recipient, uint256 _totalDonated) ERC721("Donations", "DNTS") {
        recipient = _recipient;
        totalDonated = _totalDonated;
   }

   // Users can donate funds to the contract
  function leaveDonation(uint256 amountToDonate) public payable {
      totalDonated += amountToDonate;
  }

  function checkDonation() public payable returns (bool) {
      
  }

}