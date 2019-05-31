const ExpToken = artifacts.require("ExpToken");

module.exports = function(deployer) {
	// we deploy the token, together with the total supply
	deployer.deploy(ExpToken, 100000000000);
};
