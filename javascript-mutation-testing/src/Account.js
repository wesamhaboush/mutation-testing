module.exports = function() {
    var userName = undefined;
    var balance = 0;
    this.getUsername = function(){
	    return userName;
    };
    this.getBalance = function() {
        return balance;
    };
    this.deposit = function(amount) {
        balance += amount;
    };
    this.withdraw = function(amount) {
        if (balance >= amount) {
            balance -= amount;
            return true;
        } else {
            return false;
        }
    };
    return this;
};
