const ExpToken = artifacts.require('ExpToken');

contract('ExpToken', function(accounts){
	// totalSupply test
	it('shoud set the total supply when deployed', function(){
		return ExpToken.deployed().then(function(instance){
			tokenInstance = instance;

			// returns the total supply
			return tokenInstance.totalSupply();

		// checks whether totalSupply is correct
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 100000000000, 'total supply set to 100,000,000,000');
		});
	});
});