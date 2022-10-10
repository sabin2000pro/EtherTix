// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract EventMarket {
    address contractOwner = msg.sender;
    uint256 msgValue = msg.value;

    uint256 eventStartingPrice = 0.020 ether;
    
    struct EventNft {
        uint256 tokenId;
        address tokenName;
        bool listedForSale;
    }

    event EventNftCreated (

    );


    constructor() {

    }

}