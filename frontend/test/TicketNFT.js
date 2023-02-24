const assert = require("chai").assert;
const TicketNFT = artifacts.require("TicketNFT");
const Web3 = require('web3');
const web3 = new Web3();

contract("TicketNFT", (accounts) => {
    let ticketNFT;

    beforeEach(async () => {
        ticketNFT = await TicketNFT.new();
    });

    const findMintedTokenReceipt = (receipt) => {
        const mintedReceipt = receipt.logs.find(log => log.event === "NewTokenMinted");

        console.log(`Minted receipt : `, mintedReceipt);

        return mintedReceipt;
    }

    it("Unit Test 1 : Test that mints a new token", async () => {
        const name = "Test Mint Token";
        const price = 100;

        const receipt = await ticketNFT.mintToken(name, price, { from: accounts[0] });

        const event = findMintedTokenReceipt(receipt);

        const newTokenId = event.args._tokenId;
        const token = await ticketNFT.fetchTokenByIndex(newTokenId);

        console.log(`Current Account : `, accounts[0]);
        console.log(`Previous Owner : `, token.tokenOwner);
        console.log(`New Token ID `, token);

        assert.equal(token.tokenOwner, accounts[0]);
        assert.equal(token.tokenName, name);
        assert.equal(token.tokenPrice, price);
    });

    it(" Unit Test 2 : Should transfer the ownership of the token", async () => {

        const name = "Test Token";
        const price = web3.utils.toWei("0.01", "ether")
       
        const receipt = await ticketNFT.mintToken(name, price, { from: accounts[0] });
        const event = receipt.logs.find(log => log.event === "NewTokenMinted");
        const tokenId = event.args._tokenId;

        await ticketNFT.transferTokenOwnership(tokenId, accounts[1], { from: accounts[0] });
        const token = await ticketNFT.fetchTokenByIndex(tokenId);

       assert.equal(token.tokenOwner, accounts[1], "Token ownership transfer failed");
    })

    it("Unit Test 3 - Should be able to list the NFT for sale", async () => {
        const newTokenId = event.args._tokenId;
        const currentListedTokenIndex = await ticketNFT.fetchTokenByIndex();
    })

});