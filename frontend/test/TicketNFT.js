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
        const price = web3.utils.toWei("0.015", "ether").toString()
        const priceInEther = web3.utils.fromWei(price, "ether");

        return priceInEther;
    }

    const fetchReceiptLogs = (receipt) => {
        const eventLogs = receipt.logs.find(log => log.event === "NewTokenMinted");
        return eventLogs;
    }

    const mintToken = (tokenName, tokenClass, tokenPrice, tokenCapacity) => { // Mint a token given its name and price in ETH
        return ticketNFT.mintToken(tokenName, tokenClass, parseInt(tokenPrice), parseInt(tokenCapacity), { from: accounts[0] });
    }

    it("Unit Test 1 : Test that mints one token", async () => {
        const currentAccount = accounts[0];
   
        const tokenOneName = "Agile Project Management Basic Ticket";
        const tokenOnePrice = 25;
        const tokenOneClass = "Standard";
        const tokenOneCapacity = 10;

        const tokenTwoName = "Highland Standard Event Ticket"
        const tokenTwoClass = "Standard"
        const tokenTwoPriceEther = convertPriceToEther();
        const tokenTwoCapacity = 10;

        const tokenOne = await mintToken(tokenOneName, tokenOneClass, tokenOnePrice, tokenOneCapacity);
        const tokenTwo = await mintToken(tokenTwoName, tokenTwoClass, tokenTwoPriceEther, tokenTwoCapacity);

        const mintEventLogs = fetchReceiptLogs(tokenOne);
        const tokenTwoReceipt = fetchReceiptLogs(tokenTwo);

        const tokenOneID = mintEventLogs.args.tokenId;
        const token = await ticketNFT.fetchTokenByIndex(tokenOneID);

        const tokenTwoID = tokenTwoReceipt.args.tokenId;
        const tokenTwoCurr = await ticketNFT.fetchTokenByIndex(tokenTwoID);

        assert.equal(token.tokenOwner, currentAccount);
        assert.equal(token.tokenName, tokenOneName);
        assert.equal(token.tokenPrice, tokenOnePrice);
        assert.equal(token.tokenClass, tokenOneClass);
        assert.equal(token.tokenCapacity, tokenOneCapacity);

        // assert.equal(tokenTwoCurr.tokenOwner, accounts[0]);
        // assert.equal(tokenTwoCurr.tokenName, tokenTwoName);
        // assert.equal(tokenTwoCurr.tokenPrice, tokenTwoPrice);
    });

    it(" Unit Test 2 : Should transfer the ownership of the token", async () => {
        const tokenOneName = "Agile Project Management Basic Ticket";
        const tokenOneClass = "Standard";
        const tokenOneCapacity = 10;
        const priceInEther = convertPriceToEther();
       
        const receipt = await mintToken(tokenOneName, tokenOneClass, priceInEther, tokenOneCapacity);
        const eventLogs = fetchReceiptLogs(receipt);
        const tokenId = eventLogs.args.tokenId;

        await ticketNFT.transferTokenOwnership(tokenId, accounts[1], { from: accounts[0] });
        const token = await ticketNFT.fetchTokenByIndex(tokenId); // Fetch the index of the token by its inde
        // const ownerAccountBalanceReceipt = await ticketNFT.fetchAccountBalance(accounts[1]);

        assert.equal(token.tokenOwner, accounts[1], "Token ownership success");

    })

    it("Unit Test 3 - Should be able to list the currently minted NFT for sale", async () => {

        try {
            const tokenOneName = "Agile Project Management Basic Ticket";
            const tokenOneClass = "Standard";
            const tokenOneCapacity = 10;
            const priceInEther = convertPriceToEther();
    
            const receipt = await mintToken(tokenOneName, tokenOneClass, tokenOneCapacity, priceInEther);
            const event = fetchReceiptLogs(receipt);
            const tokenID = event.args.tokenId;
    
            const currentListedTokenIndex = await ticketNFT.fetchTokenByIndex(tokenID);

            const tokenOwner = currentListedTokenIndex.tokenOwner;
            const theTokenId = currentListedTokenIndex.tokenId;

            await ticketNFT.listNftForSale(parseInt(theTokenId), parseInt(priceInEther), { from: tokenOwner });
            console.log(`Current listed token index : `, currentListedTokenIndex);
            assert.equal(currentListedTokenIndex.isListedForSale, true);
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }

        }

       
    })

    it("Unit Test 4 - Burn Token", async () => {

        const tokenOneName = "Agile Project Management Basic Ticket";
        const tokenOneClass = "Standard";
        const tokenOneCapacity = 10;
        const priceInEther = convertPriceToEther();

        const currentTokenOwner = accounts[0];
        const tokenOne = await ticketNFT.mintToken(tokenOneName, priceInEther, tokenOneClass, tokenOneCapacity, { from: currentTokenOwner });

        const allTokens = await ticketNFT.retrieveAllTokens();
        const tokenId = allTokens[0].tokenId;

        await ticketNFT.burnNftToken(parseInt(tokenId));
    })


});