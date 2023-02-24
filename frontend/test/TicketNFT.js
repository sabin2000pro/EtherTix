const assert = require("chai").assert;
const TicketNFT = artifacts.require("TicketNFT");
const Web3 = require('web3');
const web3 = new Web3();

contract("TicketNFT", (accounts) => {
    let ticketNFT;

    beforeEach(async () => {
        ticketNFT = await TicketNFT.new();
    });

    it("should mint a new token", async () => {
        const name = "Test Mint Token";
        const price = 100;

        const receipt = await ticketNFT.mintToken(name, price, { from: accounts[0] });
        const event = receipt.logs.find(log => log.event === "NewTokenMinted");

        const newTokenId = event.args._tokenId;
        const token = await ticketNFT.fetchTokenByIndex(newTokenId);

        console.log(`Current Account : `, accounts[0]);
        console.log(`Previous Owner : `, token.tokenOwner);

        assert.equal(token.tokenOwner, accounts[0]);
        assert.equal(token.tokenName, name);
        assert.equal(token.tokenPrice, price);
    });

    it("Should transfer the ownership of the token", async () => {

        const name = "Test Token";
        const price = web3.utils.toWei("0.01", "ether")
       
        const receipt = await ticketNFT.mintToken(name, price, { from: accounts[0] });
        const event = receipt.logs.find(log => log.event === "NewTokenMinted");
        const tokenId = event.args._tokenId;

        await ticketNFT.transferTokenOwnership(tokenId, accounts[1], { from: accounts[0] });
        const token = await ticketNFT.fetchTokenByIndex(tokenId);

      console.log(`New Owner : `, token.tokenOwner);
      assert.equal(token.tokenOwner, accounts[1], "Token ownership transfer failed");
    })
});