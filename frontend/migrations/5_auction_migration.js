// eslint-disable-next-line no-undef
const Migrations = artifacts.require("DutchAuction");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
