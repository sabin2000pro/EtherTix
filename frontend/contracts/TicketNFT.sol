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
        bool isListedForSale;
    }

    uint256 public totalTokenSupply; // Total supply for the tokens
    uint256 public initialListingPrice = 0.015 ether; // Initial listing price of the ticket as an NFT to £20GBP

    mapping (uint256 => NftToken) public circulatingTokens; // Create mapping between an Integer and the token struct (1 => Nft data, 2: Nft Data...)
    mapping (uint256 => address) tokenOwner; // Store the owners of the NFT

    mapping (uint256 => bool) public isTokenForSale;
    mapping (uint256 => uint) public tokensPrice;
    mapping(string => bool) tokenNames;

    event NewTokenMinted(uint256 tokenId, bool isListed);
    event NftPurchased (uint256 tokenId, address newTokenOwner, string tokenName, uint tokenPrice);
    event NftOwnershipTransferEvent(uint tokenId, address oldTokenOwnerAddress, address newTokenOwnerAddress);
    event NftListedForSale(uint tokenId, uint listingPrice);
    event OwnerBalanceRetrieved(address currentOwner);
    event TokenBurned(uint tokenId);
    
    constructor() ERC721("Events NFT Ticket", "ENFT") {}

    // @description: Mint a new NFT token on the blockchain that uniquely represents an Event Ticket
    // @parameters: _tokenName: Represents the name of the ticket, _tokenPrice: The price of the event ticket
    // @returns: Returns the new ticket ID (Used for proof of ownership in transfer of ownership)

    function mintToken(string memory _tokenName, uint256 _tokenPrice) public payable returns (uint) {
        uint256 newTokenID = ++totalTokenSupply;
        address owner = msg.sender; 

        circulatingTokens[newTokenID] = NftToken(newTokenID, owner, _tokenName, _tokenPrice, false);
        NftToken storage currMintedToken = circulatingTokens[newTokenID];

        currMintedToken.isListedForSale = false;
        currMintedToken.tokenPrice = _tokenPrice;
   
        bool isTokenListed = currMintedToken.isListedForSale;
        tokenOwner[totalTokenSupply] = owner;

        emit NewTokenMinted(newTokenID, isTokenListed);
        return newTokenID;
    }

    // @description: Returns the owner of the NFT token given an ID and returns the address of the owner
    function getOwnerOfToken(uint256 _tokenId) public view returns (address) {
        return tokenOwner[_tokenId];
    }

    function tokenIsOnSale(uint256 _tokenId) public view returns (bool) { // Function that determines if the token with its ID is already on sale or not
        return circulatingTokens[_tokenId].tokenPrice > 0;
    }

   function fetchAccountBalance(address currentNftOwner) public view returns (uint) { // Returns the balance in ETH of the token owner
      return balanceOf(currentNftOwner);
   }

    // @description: Returns the minted NFT by its Token INDEX
    function fetchTokenByIndex(uint256 _tokenIndex) public view returns (NftToken memory) {
        return circulatingTokens[_tokenIndex];
    }

    // @description: The function is responsible for transferring the ownership of a token from the ticket issuer's address to the buyer address
    // @parameters: Token ID and the new token owner's metamask wallet address
    function transferTokenOwnership(uint256 _tokenId, address _newTokenOwnerAddress) public payable {
        address currentTokenOwner = msg.sender;
        NftToken storage nftToken = circulatingTokens[_tokenId];

        require(nftToken.tokenOwner == currentTokenOwner, "You as the caller do not own this token representing the ticket. Transfer of ownership cannot be performed");
        nftToken.tokenOwner = _newTokenOwnerAddress;
        emit NftOwnershipTransferEvent(_tokenId, currentTokenOwner, _newTokenOwnerAddress);
    }

    function listNftForSale(uint256 _tokenId, uint256 _listingPrice) public { // Function which will list the NFT for sale
        require(getOwnerOfToken(_tokenId) == msg.sender, "You must be the owner of this token to list it for sale");
        require(!(tokenIsOnSale(_tokenId)), "The token must already be on sale to list the nft for sale");

        totalTokenSupply--; // Decrease the total supply of tokens when listed for sale
        NftToken memory currentNftToken = circulatingTokens[_tokenId];

        currentNftToken.tokenPrice = _listingPrice;
        currentNftToken.isListedForSale = true;

        emit NftListedForSale(_tokenId, _listingPrice);
    }

    function buyNftToken(uint256 tokenId) public payable returns (address) { // Function that allows the ticket buyer to to purchase the NFT Token given the Token ID
        address tokenBuyer = msg.sender; // Store the token buyer in msg.sender
        require(tokenOwner[tokenId] != address(0), "The NFT has already been sold");
        require(msg.value == tokensPrice[tokenId], "The value of the msg must be equal to the price of the token");
        require(tokenBuyer.balance >= msg.value, "The token buyer does not have enough funds to buy the token");

        NftToken memory currentToken = circulatingTokens[tokenId]; // Extract the current nft token
        address currentTokenOwner = currentToken.tokenOwner; // Get the current token owner
        address payable currentTokenOwnerPayable = payable(currentTokenOwner);

        currentTokenOwnerPayable.transfer(tokensPrice[tokenId]);
        currentToken.tokenOwner = tokenBuyer;
        isTokenForSale[tokenId] = false;

        emit NftPurchased(tokenId, tokenBuyer, currentToken.tokenName, currentToken.tokenPrice); // Emit the event that an NFT Has been purchased
        return tokenBuyer; // Return the new address of the token owner (current buyer)
   }

   function burnNftToken(uint256 tokenId) public {
        address currentOwner = msg.sender;
        NftToken memory currentTokenToBurn = circulatingTokens[tokenId];

        require(currentTokenToBurn.tokenOwner == currentOwner, "You must be the current owner of the NFT to burn it");
        currentTokenToBurn.isListedForSale = !currentTokenToBurn.isListedForSale;

        _burn(tokenId);
        emit TokenBurned(tokenId);
       
   }

}