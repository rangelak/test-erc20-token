const ExpToken = artifacts.require("ExpToken");

module.exports = function(deployer) {
  deployer.deploy(ExpToken);
};
