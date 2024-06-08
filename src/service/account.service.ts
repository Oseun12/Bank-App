import { Account } from "../persistence/entity/account";
import { User } from "../persistence/entity/user";
import { sendNotification, sendWelcomeEmail } from "./auth.service";
import { AccountRequest } from "../model/request/account.request";

export async function createAccount(request: AccountRequest): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
        Account.findOne({ where: { userId: request.userId } }).then(async(account) => {
            if (account) {
                console.log('Accoun already exists');
                throw Error('Account already exists');
            }
            // To create Account
            const newAccount = new Account({
                userId: request.userId,
                balance: request.balance,
                status: request.status,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            // Save the book
            newAccount.save().then((account) => {
                console.log('Account created Successfully');
                resolve(account);
            }).catch((error) => {
                console.error('Error createing account: ', error);
                reject(null);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export async function getAccountDetails(id: number): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
        Account.findByPk(id).then(async(account) => {
            if(!account) {
                console.log('Account not found');
                throw new Error('Account not found');
            }
            console.log('Account found');
            resolve(account);
        }).catch((error) => {
            reject(error);
        });
    });
}

export async function deposit(id: number, amount: number): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
        Account.findByPk(id).then(async(account) => {
            if(!account) {
                console.log('Account not found');
                throw new Error('Account not found')
            }
            console.log('Account found-2');
            resolve(account);
            account.balance += amount;
            await account.save();
            await sendNotification('Deposit', `Deposited ${amount} to account ${id}. New Balance is ${account.balance}`);
            return account;
        })
    })
}

export async function withdraw(id: number, amount: number): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
        Account.findByPk(id).then(async(account) => {
            // if(!account) {
            //     console.log('Account not found');
            //     throw new Error('Account not found')
            // }
            // console.log('Account Found');
            // throw new Error('Account Found');

            if(account.balance < amount)
                throw new Error('Insufficient funds')
            account.balance -= amount;
            await account?.save();
            await sendNotification('Withdrawal', `${amount} was withdrawn from the account ${id}, New balance: ${account.balance}`)
            return account
        })
    })
}

export async function transfer(fromAccountId: number, toAccountId: number, amount: number): Promise<Account> {
    return new Promise<Account>(async (resolve, reject) => {
        const fromAccount = await Account.findByPk(fromAccountId);
        const toAccount = await Account.findByPk(toAccountId);

        if (!fromAccount || !toAccount)
            throw new Error('Account not found');
        if (fromAccount.balance < amount)
            throw new Error('Insufficient funds');

        fromAccount.balance -= amount;
        toAccount.balance += amount;

        await fromAccount.save();
        await toAccount.save();

        await sendNotification('Transfer', `${amount} from ${fromAccountId} to ${toAccountId} Successful, New Balance: ${fromAccount.balance}`);
        return Account;
    })
}