// eslint-disable-next-line no-undef
const TicketNFT = artifacts.require("TicketNFT");

module.exports = function(deployer) {
  deployer.deploy(TicketNFT);
};