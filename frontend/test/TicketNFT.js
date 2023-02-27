const assert = require("chai").assert;
const TicketNFT = artifacts.require("TicketNFT");
const Web3 = require('web3');
const web3 = new Web3();

contract("TicketNFT", (accounts) => { // Unit Tests for TicketNFT Contract

    let ticketNFT;

    beforeEach(async () => {
        ticketNFT = await TicketNFT.new();
    });

    const convertPriceToEther = () => { // Converts the price from WEI to ETH
        const price = web3.utils.toWei("0.01", "ether").toString()
        const priceInEther = web3.utils.fromWei(price, "ether");

        return priceInEther;
    }

    const fetchReceiptLogs = (receipt) => {
        const eventLogs = receipt.logs.find(log => log.event === "NewTokenMinted");
        return eventLogs;
    }

    const mintToken = (name, priceInEther) => { // Mint a token given its name and price in ETH
        return ticketNFT.mintToken(name, parseInt(priceInEther), { from: accounts[0] });
    }

    it("Unit Test 1 : Test that mints one token", async () => {
        const tokenOneName = "Agile Project Management";
        const tokenOnePrice = 50;

        const tokenTwoName = "Second Token Here!"
        const tokenTwoPrice = 50;

        const tokenOne = await ticketNFT.mintToken(tokenOneName, tokenOnePrice, { from: accounts[0] });
        const tokenTwo = await ticketNFT.mintToken(tokenTwoName, tokenTwoPrice, { from: accounts[0] });

        const mintEventLogs = fetchReceiptLogs(tokenOne);
        const tokenTwoReceipt = fetchReceiptLogs(tokenTwo);

        const tokenOneID = mintEventLogs.args.tokenId;
        const token = await ticketNFT.fetchTokenByIndex(tokenOneID);

        const tokenTwoID = tokenTwoReceipt.args.tokenId;
        const tokenTwoCurr = await ticketNFT.fetchTokenByIndex(tokenTwoID);

        assert.equal(token.tokenOwner, accounts[0]);
        assert.equal(token.tokenName, tokenOneName);
        assert.equal(token.tokenPrice, tokenOnePrice);

        assert.equal(tokenTwoCurr.tokenOwner, accounts[0]);
        assert.equal(tokenTwoCurr.tokenName, tokenTwoName);
        assert.equal(tokenTwoCurr.tokenPrice, tokenTwoPrice);
    });

    it(" Unit Test 2 : Should transfer the ownership of the token", async () => {
        const name = "Agile Project Management";
        const priceInEther = convertPriceToEther();
       
        const receipt = await mintToken(name, priceInEther);
        const eventLogs = fetchReceiptLogs(receipt);
        const tokenId = eventLogs.args.tokenId;

        await ticketNFT.transferTokenOwnership(tokenId, accounts[1], { from: accounts[0] });
        const token = await ticketNFT.fetchTokenByIndex(tokenId); // Fetch the index of the token by its index

        assert.equal(token.tokenOwner, accounts[1], "Token ownership transfer failed");

    })

    it("Unit Test 3 - Should be able to list the currently minted NFT for sale", async () => {

        try {
            const name = "Test Mint Token";
            const priceInEther = convertPriceToEther();
    
            const receipt = await mintToken(name, priceInEther);
            const event = fetchReceiptLogs(receipt);
            const tokenID = event.args.tokenId;
    
            const currentListedTokenIndex = await ticketNFT.fetchTokenByIndex(tokenID);
            const tokenOwner = currentListedTokenIndex.tokenOwner;
    
            const theTokenId = currentListedTokenIndex.tokenId;
            await ticketNFT.listNftForSale(parseInt(theTokenId), parseInt(priceInEther), { from: tokenOwner });
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }
            
        }

       
    })

    it("Unit Test 4 - Should be able to burn the NFT token after minting", async () => {

        try {

            const name = "Agile Project Management";
            const currentEthPrice = convertPriceToEther();

            
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }

        }


    })


});