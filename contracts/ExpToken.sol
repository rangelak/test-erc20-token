pragma solidity >=0.4.21 <0.6.0;

contract ExpToken {

	// name, symbol and standard
	string public name = 'ExpToken'; 
	string public symbol = 'EXP';

	// 18 is the most common number of decimal places
	uint8 public constant decimals = 18;  

	// not a part of the required ERC-20 implementation
	// serves the purpose to give us the version
	string public standard = 'ExpToken v1.0';

	// totalSupply will be an integer
	uint256 public totalSupply;
	
	// transfer event to be used in the transfer function
	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
	);

	/*******************************************
		mapping to check someone's balance
		balanceOf is has dictionary structure

			key = address
			value = balance at address
			
			syntax: balanceOf[key] = value

		tells us where each of the tokens are
	********************************************/
	mapping(address => uint256) public balanceOf;

	// _initialSupply will be passed on during deployment
	constructor (uint256 _initialSupply) public{
		
		/*******************************************
			Sets the balance of the person deploying
			the contract equal to the total supply.
			The deployer's address is represented 
			by 'msg.sender' in this instance.

				'msg' is a global variable
				'msg.data':	complete calldata
				'msg.sender' (address payable): 
					sender of the message
				'msg.sig' (bytes4): 
					first four bytes of 
					the calldata (function identifier)
				'msg.value' (uint): 
					number of wei sent with the message
		********************************************/
		balanceOf[msg.sender] = _initialSupply;

		// set the totalSupply
		totalSupply = _initialSupply;
	}
	
    // Transfer the balance from owner's account to another account
    function transfer(address _to, uint256 _value) public returns (bool result){
    	
    	// Don't allow sender to send more than value
    	require(balanceOf[msg.sender] >= _value);

    	// Transfer from sender to receiver
    	balanceOf[msg.sender] -= _value;
    	balanceOf[_to] += _value;

    	// Emit a transfer event
    	emit Transfer(msg.sender, _to, _value);

    	return true;
    }
}
