// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721URIStorage, Ownable { // NFT Contract for Event Tickets

    struct NftToken { // Create the struct for the nft token
        uint256 tokenId;
        address tokenOwner;
        string tokenName;
        uint256 tokenPrice;
        uint256 tokenCapacity;
        string tokenClass;
        bool isListedForSale;
        uint256 tokenIndex;
    }

    uint256 public totalTokenSupply; // Total supply for the tokens
    uint256 public initialListingPrice = 0.015 ether; // Initial listing price of the ticket as an NFT to £20GBP

    NftToken[] public allMintedTokens;

    mapping (uint256 => NftToken) public circulatingTokens; // Create mapping between an Integer and the token struct (1 => Nft data, 2: Nft Data...)
    mapping (uint256 => address) tokenOwner; // Store the owners of the NFT
    mapping (uint256 => bool) public isTokenForSale;
    mapping (uint256 => uint) public tokensPrice;
    mapping(string => bool) tokenNames; // Store the token names in a mapping between a string and boolean

    event NewTokenMinted(uint256 tokenId, string tokenName, string tokenClass, uint tokenPrice, uint256 tokenCapacity, bool isListed, NftToken[] allMintedTokens);
    event NftPurchased (uint256 tokenId, address newTokenOwner, string tokenName, uint tokenPrice);
    event NftOwnershipTransferEvent(uint tokenId, address oldTokenOwnerAddress, address newTokenOwnerAddress);
    event NftListedForSale(uint tokenId, uint listingPrice);
    event OwnerBalanceRetrieved(address currentOwner);
    event TokenBurned(uint tokenId, uint newTotalSupply); // Emits an event when the token is burned
    
    constructor() ERC721("Events NFT Ticket", "ENFT") {}

    // @description: Mint a new NFT token on the blockchain that uniquely represents an Event Ticket
    // @parameters: _tokenName: Represents the name of the ticket, _tokenPrice: The price of the event ticket
    // @returns: Returns the new ticket ID (Used for proof of ownership in transfer of ownership)

    function mintToken(string memory _tokenName, string memory _tokenClass, uint256 _tokenPrice, uint256 _tokenCapacity) public payable returns (uint) {
        uint256 newTokenID = ++totalTokenSupply;
        address owner = msg.sender; 
        uint allTokensLength = allMintedTokens.length;

        circulatingTokens[newTokenID] = NftToken(newTokenID, owner, _tokenName, _tokenPrice, _tokenCapacity, _tokenClass, false, allTokensLength);
        NftToken storage currMintedToken = circulatingTokens[newTokenID];

        currMintedToken.tokenPrice = _tokenPrice;
        currMintedToken.isListedForSale = false;
        tokenOwner[totalTokenSupply] = owner; // Update the token owner at the current token supply with the new owner
        
        bool isTokenListed = currMintedToken.isListedForSale;
        allMintedTokens.push(currMintedToken); // Push the newly minted tokens to the array

        retrieveAllTokens();

        emit NewTokenMinted(newTokenID, _tokenName, _tokenClass, _tokenPrice, _tokenCapacity, isTokenListed, allMintedTokens);
        return newTokenID;
    }

    function retrieveAllTokens() public view returns (NftToken[] memory) {
        NftToken[] memory currentMintedTokens = new NftToken[](totalTokenSupply); // Loop through all the tokens, get the current total supply

        for(uint index = 0; index < totalTokenSupply; index++) { // Set the current minted token index to the array of all minted tokens index
            currentMintedTokens[index] = allMintedTokens[index];
        }   

        return currentMintedTokens; // Return the currently minted tokens
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

        // After buying an NFT token, burn it directly to increase its value over time potentially
        burnNftToken(tokenId);

        emit NftPurchased(tokenId, tokenBuyer, currentToken.tokenName, currentToken.tokenPrice); // Emit the event that an NFT Has been purchased
        return tokenBuyer; // Return the new address of the token owner (current buyer)
   }

   function burnNftToken(uint tokenId) public { // Function responsible for burning
        address currentOwner = msg.sender;
        NftToken storage currentTokenToBurn = circulatingTokens[tokenId];
        require(currentTokenToBurn.tokenOwner == currentOwner, "You must be the current owner of the NFT to burn it");

        uint256 currentTokenIndex = currentTokenToBurn.tokenIndex; // Retrieve the current index of the current token to be burned
        uint256 lastMintedTokensIndex = allMintedTokens.length - 1; // Retrieve the last index of the last minted token

        allMintedTokens[currentTokenIndex] = allMintedTokens[lastMintedTokensIndex]; // Overwrite the current token index in the all minted tokens array to the last index
        allMintedTokens.pop();

        circulatingTokens[tokenId].tokenId = 0;
        circulatingTokens[lastMintedTokensIndex].tokenIndex = currentTokenIndex;

        uint newTotalSupply = --totalTokenSupply; // Decrease the total supply after burning the token
        emit TokenBurned(tokenId, newTotalSupply);
       
   }

}