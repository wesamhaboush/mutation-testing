require('expectations');

describe('Account', function() {

    var account;

    beforeEach(function() {
        account = require('../src/Account')();
    });

    it('should deposit', function() {
	    console.log('running');
        var initial = account.getBalance();
        account.deposit(50);
        expect(account.getBalance()).toBe(initial + 50);
    });

    it('should withdraw if balance allows', function() {
        var initial = account.getBalance();
        account.deposit(40);
        expect(account.withdraw(30)).toBe(true);
        expect(account.getBalance()).toEqual(initial + 40 - 30);
    });

    it('should not withdraw if balance does not allow', function() {
        var initial = account.getBalance();
        expect(account.withdraw(initial + 10)).toBe(false);
        expect(account.getBalance()).toEqual(initial);
    });
    
});
