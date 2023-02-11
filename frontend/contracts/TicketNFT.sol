// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721URIStorage, Ownable { // NFT Contract for Event Tickets
    using Counters for Counters.Counter;

    struct NftToken {
        uint256 tokenId;
        address tokenOwner;
        string tokenName;
        uint256 tokenPrice;
        bool isListed;
    }

    uint256 public totalTokenSupply; // Total supply for the tokens

    mapping (uint256 => NftToken) public tokens; // Create mapping between an Integer and the token struct (1 => Nft data, 2: Nft Data...)
    mapping (uint256 => address) tokenOwner; // Store the owners of the NFT

    mapping (uint256 => bool) public isTokenForSale;
    mapping (uint256 => uint256) public tokensPrice;
    mapping(string => bool) tokenNames;

    event NftItemCreated ( // Event that is emitted when an Nft is minted
        uint tokenId,
        string tokenName,
        uint price,
        address creator,
        bool isListed
    );

    event NftPurchased ( // NFT Purchased
        uint tokenId,
        address newTokenOwner,
        string name,
        uint price
    );
    
    constructor() ERC721("Events NFT Ticket", "ENFT") {}

    function mintToken(string memory _tokenName, uint256 _tokenPrice) public payable returns (uint) {
        address owner = msg.sender; // Store the address of the current owner of the token
        totalTokenSupply++;

        uint256 newTokenId = totalTokenSupply;
        tokens[newTokenId] = NftToken(newTokenId, owner, _tokenName, _tokenPrice, false);

        return newTokenId; // Return the newly created ID
    }

    function transferTokenOwnership(uint256 tokenId, address _toAddress) public payable {
        NftToken storage nftToken = tokens[tokenId];
        require(nftToken.tokenOwner == msg.sender, "You do not own this ticket token.");
        nftToken.tokenOwner = _toAddress;
    }

    function getOwnerOfToken(uint256 _tokenId) public view returns (address) {
        return tokenOwner[_tokenId];
    }

    function tokenIsOnSale(uint256 _tokenId) public view returns (bool) {
        return tokens[_tokenId].tokenPrice > 0;
  }

    function fetchTokenByIndex(uint256 _tokenIndex) public view returns (NftToken memory) {
        return tokens[_tokenIndex];
    }

    function listNftForSale(uint256 _tokenId, uint256 _listingPrice) public { // Function which will list the NFT for sale
        require(getOwnerOfToken(_tokenId) == msg.sender, "You must be the owner of this token to list it for sale");

        totalTokenSupply--;
    }

    function buyNftToken(uint256 tokenId) public payable {
        address tokenBuyer = msg.sender; // Store the token buyer in msg.sender
        require(tokenOwner[tokenId] != address(0), "The NFT has already been sold");

        require(msg.value == tokensPrice[tokenId], "The value of the msg must be equal to the price of the token");
        require(tokenBuyer.balance >= msg.value, "The token buyer does not have enough funds to buy the token");

        NftToken memory currToken = tokens[tokenId];
        address currentTokenOwner = currToken.tokenOwner;
        address payable currentTokenOwnerPayable = payable(currentTokenOwner);

        currentTokenOwnerPayable.transfer(tokensPrice[tokenId]);
        currToken.tokenOwner = tokenBuyer;
        isTokenForSale[tokenId] = false;
}

}