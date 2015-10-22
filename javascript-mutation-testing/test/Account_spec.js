require('expectations');

describe('Account', function() {

    var Account = require('../src/Account');


    it('should not be able to create account with too short a user name', function() {
        var newAccount = function() { Account({ username: 'a', initialBalance: 6.0 }); };
        expect(newAccount).toThrow();
    });

    it('should not be able to create account with no name', function() {
        var newAccount = function() { Account({ username: '', initialBalance: 6.0 }); };
        expect(newAccount).toThrow();
    });

    it('should not be able to create account with 6 letter name', function() {
        var newAccount = function() { Account({ username: '123456', initialBalance: 6.0 }); };
        expect(newAccount).toThrow();
    });
    
});

/*
    @Test
    public void should_be_able_to_create_account_with_valid_name(){
        final Account account = new Account("willbe7", 6.0);
        assertEquals("willbe7", account.getUsername());
    }

    @Test(expected = IllegalArgumentException.class)
    public void should_be_able_to_create_account_with_little_money(){
        new Account("willbe7", 5.0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_deposit_more_than_max(){
        new Account("happy puppy", 6.0).deposit(100001.0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_deposit_equal_to_than_max(){
        new Account("happy puppy", 6.0).deposit(100000.0);
    }

    @Test
    public void should_be_able_to_deposit_less_than_max(){
        final Account account = new Account("happy puppy", 6.0);
        account.deposit(99999.0);

        assertEquals(99999.0 + 6.0, account.getBalance(), 0.01);
    }

    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_withdraw_more_than_balance(){
        final Account account = new Account("happy puppy", 9.0);
        account.withdraw(10.0);
    }

    @Test
    public void should_be_able_to_withdraw_the_balance(){
        final Account account = new Account("happy puppy", 9.0);
        account.withdraw(9.0);

        assertEquals(0.0, account.getBalance(), 0.01);
    }

    @Test
    public void should_be_able_to_withdraw_less_than_balance(){
        final Account account = new Account("happy puppy", 9.0);
        account.withdraw(7.0);

        assertEquals(2.0, account.getBalance(), 0.01);
    }


}
*/
