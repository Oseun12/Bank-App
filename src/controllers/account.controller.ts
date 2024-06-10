import { Request, Response } from "express";
import { AccountRequest } from "../model/request/account.request";
import services from "../service/services";
import { logAction, getAuditLogs } from "../service/audit.service";
import { CustomRequest } from "../../types/express";

export async function createAccount( req: Request, res: Response) {
    try {
        const request: AccountRequest = req.body;
        const account = await services.accountService.createAccount(request);
        if(account) {
            res.status(201).json(account);
        } else {
            res.status(400).json({ message: 'Error creating Account' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server error-5' });
    }
}

export async function getAccountDetails( req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const account = await services.accountService.getAccountDetails(id);
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(400).json({ message: 'Account not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

function isUserDefined(user: any): user is { id: number } {
    return user && typeof user.id === 'number';
}
export async function  deposit( req: CustomRequest, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const { amount } = req.body;
        const account = await services.accountService.deposit(id, amount);
        if(isUserDefined(req.user)) {
            await logAction(req.user.id, `Deposite of ${amount} to account ${id} successful!`)
        } else {
            throw new Error('User not authenticated')
        }
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(400).json({ message: 'Unable to deposit' })
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error-7' });
    }
}

export async function withdraw(req: CustomRequest, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const { amount } = req.body;
        const account = await services.accountService.withdraw(id, amount);
        if (isUserDefined(req.user)) {
            await logAction(req.user.id, `${amount} was withdrawn from account ${id}`);
        } else {
            throw new Error('User not aurhenticated')
        }
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(400).json({ message: 'Unable to transfer' })
        }
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: 'Internal server error-8' })
    }
}

export async function transfer(req: CustomRequest, res: Response) {
    try {
        const { fromAccountId, toAccountId, amount } = req.body;
        const account = await services.accountService.transfer(fromAccountId, toAccountId, amount);
        if (isUserDefined(req.user)) {
            await logAction(req.user?.id, `${amount} was transferred from ${fromAccountId} to ${toAccountId}`);
        } else {
            throw new Error('User not authenticated!')
        }
        res.status(200).json({ message: 'Transfer successful!!!' });
    } catch (error) {
        console.error('Error: ', error);
        res.status(400).json({ message: 'Internal sever error-9' })
    }
}