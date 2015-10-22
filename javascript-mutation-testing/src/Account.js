var checkDefined = require('conditional').checkDefined;
var checkArgument = require('conditional').checkArgument;

const MAX_DEPOSIT = 100000.0;

module.exports = function(options) {
    checkArgument(options.username.length > 6, "username cannot be less than 6 letters");
    checkArgument(options.initialBalance > 5.0, "initial balance cannot be less than 5.0");
    
    this.username = options.username;
    this.balance = options.initialBalance;

    this.getUsername = function(){
	    return this.username;
    };

    this.getBalance = function() {
        return this.balance;
    };

    this.deposit = function(amount) {
        checkArgument(amount < MAX_DEPOSIT, "cannot deposit greater than max deposit amount");
        this.balance += amount;
    };

    this.withdraw = function(amount) {
        checkArgument(balance >= amount, "cannot withdraw more money than what you have");
        balance -= amount;
    };
    return this;
};
