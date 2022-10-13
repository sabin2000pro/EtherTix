// eslint-disable-next-line no-undef
const Migrations = artifacts.require("EventMarket");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
