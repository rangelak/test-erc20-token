const ExpToken = artifacts.require('ExpToken');

contract('ExpToken', function(accounts){
	var tokenInstance;

	// contract initialization values test
	it('initializes a contract with the right values', function(){
		return ExpToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, 'ExpToken');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'EXP');
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'ExpToken v1.0');
		});	
	});

	// totalSupply and adminbalance test
	it('shoud allocate the initial supply when deployed', function(){
		return ExpToken.deployed().then(function(instance){
			tokenInstance = instance;

			// returns the total supply
			return tokenInstance.totalSupply();

		// checks whether totalSupply is correct
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 100000000000, 'total supply set to 100,000,000,000');
			
			// checks what the balance is in the first account in Ganache
			return tokenInstance.balanceOf(accounts[0]);

		// checks whether we allocate the tokens to the admin initially
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 100000000000, 'allocates initially supplied tokens to admin');
		});
	});

	// transfer tokens test
	it('transfers tokens from sender to receiver', function(){
		return ExpToken.deployed().then(function(instance){
			tokenInstance = instance;
			
			// check for sender sending more than they have
			return tokenInstance.transfer.call(accounts[1],200000000000);
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, 'error must cointain \' revert \' .');
			return tokenInstance.transfer(accounts[1], 1, {from: accounts[0]});
		}).then(function(receipt){
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance_transferred){
			assert.equal(balance_transferred.toNumber(), 1,'proper amount received by requester.');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance_sender){
			assert.equal(balance_sender.toNumber(), 99999999999, 'balance of sender has decreased by one token.');
		});
	});
});