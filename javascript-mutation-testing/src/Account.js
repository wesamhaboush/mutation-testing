var checkArgument = require('conditional').checkArgument;

const MAX_DEPOSIT = 100000.0;

function Account(options) {
    checkArgument(options.username.length > 6, "username cannot be less than 7 letters");
    checkArgument(options.initialBalance > 5.0, "initial balance cannot be less than 5.0");

    this.username = options.username;
    this.balance = options.initialBalance;
}

Account.prototype.getUsername = function() {
    return this.username;
};

Account.prototype.getBalance = function() {
    return this.balance;
};

Account.prototype.deposit = function(amount) {
    checkArgument(amount < MAX_DEPOSIT, "cannot deposit greater than max deposit amount");
    this.balance += amount;
};

Account.prototype.withdraw = function(amount) {
    checkArgument(this.balance >= amount, "cannot withdraw more money than what you have");
    this.balance -= amount;
};

module.exports = Account;