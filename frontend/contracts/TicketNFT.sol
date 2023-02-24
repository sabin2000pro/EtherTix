// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721URIStorage, Ownable { // NFT Contract for Event Tickets
    using Counters for Counters.Counter;

    struct NftToken { // Create the struct for the nft token
        uint256 tokenId;
        address tokenOwner;
        string tokenName;
        uint256 tokenPrice;
        bool isListed;
    }

    uint256 public totalTokenSupply; // Total supply for the tokens

    mapping (uint256 => NftToken) public circulatingTokens; // Create mapping between an Integer and the token struct (1 => Nft data, 2: Nft Data...)
    mapping (uint256 => address) tokenOwner; // Store the owners of the NFT

    mapping (uint256 => bool) public isTokenForSale;
    mapping (uint256 => uint256) public tokensPrice;
    mapping(string => bool) tokenNames;

    event NewTokenMinted(uint256 _tokenId);
    event NftPurchased (uint tokenId, address newTokenOwner, string tokenName, uint256 tokenPrice);
    event NftOwnershipTransferEvent(uint tokenId, address oldTokenOwnerAddress, address newTokenOwnerAddress);
    
    constructor() ERC721("Events NFT Ticket", "ENFT") {}

    function mintToken(string memory _tokenName, uint256 _tokenPrice) public payable returns (uint) {
        address owner = msg.sender; // Store the address of the current owner of the token
        totalTokenSupply++;

        uint256 newTokenId = totalTokenSupply;
        circulatingTokens[newTokenId] = NftToken(newTokenId, owner, _tokenName, _tokenPrice, false);

        // TEST ONLY SETTING THE IS LISTED TO TRUE ( WILL REMOVE )
    
        NftToken memory currMintedToken = circulatingTokens[newTokenId];
        currMintedToken.isListed = true;

        emit NewTokenMinted(newTokenId);
        return newTokenId; // Return the newly created ID
    }

    function transferTokenOwnership(uint256 _tokenId, address _newTokenOwnerAddress) public payable {
        address currentTokenOwner = msg.sender;
        NftToken storage nftToken = circulatingTokens[_tokenId];

        require(nftToken.tokenOwner == currentTokenOwner, "You do not own this token representing the ticket. Transfer of ownership cannot be performed");
        nftToken.tokenOwner = _newTokenOwnerAddress;

        emit NftOwnershipTransferEvent(_tokenId, currentTokenOwner, _newTokenOwnerAddress);
    }

    // @description: Returns the owner of the NFT token given an ID and returns the address of the owner
    function getOwnerOfToken(uint256 _tokenId) public view returns (address) {
        return tokenOwner[_tokenId];
    }

    function tokenIsOnSale(uint256 _tokenId) public view returns (bool) { // Function that determines if the token with its ID is already on sale or not
        return circulatingTokens[_tokenId].tokenPrice > 0;
  }

    function fetchTokenByIndex(uint256 _tokenIndex) public view returns (NftToken memory) {
        return circulatingTokens[_tokenIndex];
    }

    function listNftForSale(uint256 _tokenId, uint256 _listingPrice) public { // Function which will list the NFT for sale
        require(getOwnerOfToken(_tokenId) == msg.sender, "You must be the owner of this token to list it for sale");
        require(!(tokenIsOnSale(_tokenId)), "The token must already be on sale to list the nft for sale");

        totalTokenSupply--;

        NftToken memory currentNftToken = circulatingTokens[_tokenId];
        currentNftToken.tokenPrice = _listingPrice;
        currentNftToken.isListed = !(currentNftToken.isListed); // Set the property of current nft token struct is listed to the negation of false
    }

    function buyNftToken(uint256 tokenId) public payable {
        address tokenBuyer = msg.sender; // Store the token buyer in msg.sender
        require(tokenOwner[tokenId] != address(0), "The NFT has already been sold");

        require(msg.value == tokensPrice[tokenId], "The value of the msg must be equal to the price of the token");
        require(tokenBuyer.balance >= msg.value, "The token buyer does not have enough funds to buy the token");

        NftToken memory currentToken = circulatingTokens[tokenId];
        address currentTokenOwner = currentToken.tokenOwner;
        address payable currentTokenOwnerPayable = payable(currentTokenOwner);

        currentTokenOwnerPayable.transfer(tokensPrice[tokenId]);
        currentToken.tokenOwner = tokenBuyer;
        isTokenForSale[tokenId] = false;
}

}