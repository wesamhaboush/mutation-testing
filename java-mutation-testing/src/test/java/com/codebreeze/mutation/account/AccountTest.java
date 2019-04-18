package com.codebreeze.mutation.account;

import org.junit.Test;

import static org.junit.Assert.assertEquals;


public class AccountTest {
    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_create_account_with_too_short_name(){
        new Account("a", 6.0);
    }

    @Test(expected = NullPointerException.class)
    public void should_not_be_able_to_create_account_with_no_name(){
        new Account(null, 6.0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_create_account_with_6_letters_name(){
        new Account("123456", 6.0);
    }

    @Test
    public void should_be_able_to_create_account_with_valid_name(){
        final Account account = new Account("willbe7", 6.0);
        assertEquals("willbe7", account.getUsername());
    }

    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_create_account_with_little_money_min(){
        new Account("willbe7", 5.0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_create_account_with_little_money_less_than_minimum(){
        new Account("willbe7", 4.0);
    }


    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_deposit_more_than_max(){
        new Account("happy puppy", 6.0).deposit(100001.0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void should_not_be_able_to_deposit_equal_to_max(){
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
        // this duplication of assert protects against increment between increments (object stability?)
        assertEquals(0.0, account.getBalance(), 0.01);
    }

    @Test
    public void should_be_able_to_withdraw_less_than_balance(){
        final Account account = new Account("happy puppy", 9.0);
        account.withdraw(7.0);

        assertEquals(2.0, account.getBalance(), 0.01);
    }

    // if you remove this one, the modulus operator survives as replacement of subtraction in withdraw method :)
    // I totally missed that before running mutation testing. I thought the above test covered me.
    @Test
    public void should_be_able_to_withdraw_less_than_balance2(){
        final Account account = new Account("happy puppy", 19.0);
        account.withdraw(7.0);

        assertEquals(12.0, account.getBalance(), 0.01);
    }
}
