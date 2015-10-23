require('expectations');

describe('Account Specs:', function() {

    var Account = require('../src/Account');

    it('should not be able to create account with too short a user name', function() {
        var newAccount = function() {
            new Account({
                username: 'a',
                initialBalance: 6.0
            });
        };
        expect(newAccount).toThrow("username cannot be less than 7 letters");
    });

    it('should not be able to create account with no name', function() {
        var newAccount = function() {
            new Account({
                username: '',
                initialBalance: 6.0
            });
        };
        expect(newAccount).toThrow("username cannot be less than 7 letters");
    });

    it('should not be able to create account with 6 letter name', function() {
        var newAccount = function() {
            new Account({
                username: '123456',
                initialBalance: 6.0
            });
        };
        expect(newAccount).toThrow("username cannot be less than 7 letters");
    });

    it('should be able to create account with valid name', function() {
        var newAccount = function() {
            return new Account({
                username: '1234567',
                initialBalance: 6.0
            });
        };
        expect(newAccount().getUsername()).toEqual('1234567');
    });

    it('should not be able to create account with little money', function() {
        var newAccount = function() {
            new Account({
                username: '1234567',
                initialBalance: 5.0
            });
        };
        expect(newAccount).toThrow("initial balance cannot be less than 5.0");
    });

    it('should not be able to deposit into an account more than max', function() {
        var newAccount = function() {
            new Account({
                username: '1234567',
                initialBalance: 6.0
            }).deposit(100001.0);
        };
        expect(newAccount).toThrow("cannot deposit greater than max deposit amount");
    });

    it('should not be able to deposit into an account an amount equal to max', function() {
        var newAccount = function() {
            new Account({
                username: '1234567',
                initialBalance: 6.0
            }).deposit(100000.0);
        };
        expect(newAccount).toThrow("cannot deposit greater than max deposit amount");
    });

    it('should be able to deposit into an account an amount less than max', function() {
        var newAccount = function() {
            var account = new Account({
                username: '1234567',
                initialBalance: 6.0
            });
            account.deposit(99999.0);
            return account;
        };
        expect(newAccount().getBalance()).toEqual(6.0 + 99999.0);
    });

    it('should not be able to withdraw from an account more than balance', function() {
        var newAccount = function() {
            new Account({
                username: '1234567',
                initialBalance: 6.0
            }).withdraw(7.0);
        };
        expect(newAccount).toThrow("cannot withdraw more money than what you have");
    });

    it('should be able to withdraw from an account all the balance', function() {
        var newAccount = function() {
            var account = new Account({
                username: '1234567',
                initialBalance: 6.0
            });
            account.withdraw(6.0);
            return account;
        };
        expect(newAccount().getBalance()).toEqual(0.0);
    });

    it('should be able to withdraw from an account less than the balance', function() {
        var newAccount = function() {
            var account = new Account({
                username: '1234567',
                initialBalance: 6.0
            });
            account.withdraw(5.0);
            return account;
        };
        expect(newAccount().getBalance()).toEqual(1.0);
    });
});
