import { Account } from "../persistence/entity/account";
import { User } from "../persistence/entity/user";
import { sendNotification, sendWelcomeEmail } from "./auth.service";
import { AccountRequest } from "../model/request/account.request";

export async function createAccount(request: AccountRequest): Promise<Account> {
    return new Promise<Account>(async (resolve, reject) => {
        try {
            const existingAccount = await Account.findOne({ where: { userId: request.userId } });
            if (existingAccount) {
                console.log('Account already exists');
                return reject(new Error('Account already exists'));
            }
            // To create Account
            const newAccount = new Account({
                userId: request.userId,
                balance: request.balance,
                status: request.status,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            // Save the account
            const savedAccount = await newAccount.save();
            console.log('Account created Successfully');
            resolve(savedAccount);
        } catch (error) {
            console.error('Error creating account: ', error);
            reject(error);
        }
    });
}

export async function getAccountDetails(id: number): Promise<Account> {
    return new Promise<Account>(async (resolve, reject) => {
        try {
            const account = await Account.findByPk(id);
            if (!account) {
                console.log('Account not found');
                return reject(new Error('Account not found'));
            }
            console.log('Account found');
            resolve(account);
        } catch (error) {
            reject(error);
        }
    });
}

export async function deposit(id: number, amount: number): Promise<Account> {
    return new Promise<Account>(async (resolve, reject) => {
        try {
            const account = await Account.findByPk(id);
            if (!account) {
                console.log('Account not found');
                return reject(new Error('Account not found'));
            }
            account.balance += amount;
            await account.save();

            const user = await User.findByPk(account.userId);
            if (user) {
                await sendNotification(user,  `Deposited ${amount} to account ${id}. New Balance is ${account.balance}`);

            }
            resolve(account);
        } catch (error) {
            reject(error);
        }
    });
}

export async function withdraw(id: number, amount: number): Promise<Account> {
    return new Promise<Account>(async (resolve, reject) => {
        try {
            const account = await Account.findByPk(id);
            if (!account) {
                console.log('Account not found');
                return reject(new Error('Account not found'));
            }
            if (account.balance < amount) {
                return reject(new Error('Insufficient funds'));
            }
            account.balance -= amount;
            await account.save();
            const user = await User.findByPk(account.userId); // Fetch the User
            if (user) {
                await sendNotification(user, `${amount} was withdrawn from the account ${id}. New balance: ${account.balance}`);
            }
            resolve(account);
        } catch (error) {
            reject(error);
        }
    });
}
export async function transfer(fromAccountId: number, toAccountId: number, amount: number): Promise<Account> {
    return new Promise<Account>(async (resolve, reject) => {
        try {
            const fromAccount = await Account.findByPk(fromAccountId);
            const toAccount = await Account.findByPk(toAccountId);

            if (!fromAccount || !toAccount) {
                return reject(new Error('Account not found'));
            }
            if (fromAccount.balance < amount) {
                return reject(new Error('Insufficient funds'));
            }

            fromAccount.balance -= amount;
            toAccount.balance += amount;

            await fromAccount.save();
            await toAccount.save();

            const user = await User.findByPk(fromAccount.userId); // Fetch the User
            if (user) {
                await sendNotification(user, `${amount} from ${fromAccountId} to ${toAccountId} successful. New Balance: ${fromAccount.balance}`);
            }
            resolve(fromAccount);
        } catch (error) {
            reject(error);
        }
    });
}