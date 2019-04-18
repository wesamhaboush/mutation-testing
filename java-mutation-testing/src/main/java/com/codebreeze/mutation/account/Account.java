package com.codebreeze.mutation.account;

import static com.google.common.base.Preconditions.checkArgument;

public class Account {
    private static final double MAX_DEPOSIT = 100000.0;
    private final String username;
    private double balance;

    public Account(final String username, final double initialBalance) {
        //adding this line is not useful. I only discovered that by running the mutation tests. the reason is
        //that next line also will throw nullpointerexception! so why have two checks when one will suffice!
        //Preconditions.checkNotNull(username, "user name cannot be null");
        if (username.length() <= 6) {
            throw new IllegalArgumentException(String.format("username should be more than 6 letters, but was [%s]", username));
        }
        if (initialBalance <= 5.0) {
            throw new IllegalArgumentException(String.format("initial balance %s should be more than 5.0, but was: ", initialBalance));
        }

        this.username = username;
        this.balance = initialBalance;
    }

    public void deposit(final double amount) {
//        checkArgument(amount < MAX_DEPOSIT, "cannot deposit %s because it is greater than max deposit amount %s", amount, MAX_DEPOSIT);
        checkArgument(amount < MAX_DEPOSIT, "cannot deposit greater than max deposit amount");
        this.balance += amount;
    }

    public void withdraw(final double amount) {
//        checkArgument(balance >= amount, "cannot withdraw %s dollars from acccount with balance %s dollars", amount, balance);
        checkArgument(balance >= amount, "cannot withdraw more money than what you have");
        balance -= amount;
    }

    public String getUsername() {
        return username;
    }

    public double getBalance() {
        return balance;
    }
}
