import { Request, Response } from "express";
import { User } from "../persistence/entity/user";
import { Session } from "express-session";
import { UserRequest } from "../model/request/user.request";
import services from "../service/services";

interface CustomSession extends Session {
    user?: any;
}

const authenticateUser = (req: Request, res: Response, next: Function) => {
    const customSession = req.session as CustomSession;
    if (customSession.user) {
        //user is authenticated
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


export async function createUserProfile(req: Request, res: Response) {
    try {
        authenticateUser(req, res, async() => {
            const request: UserRequest = req.body;
            const user = await services.userService.createUserProfile(request);
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(400).json({ message: "Error creating user!!!" });
            }
        }) 
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ message: 'Internal server error-2' })
    }
}

export async function updateUserProfile(req: Request, res: Response) {
    try {
        authenticateUser(req, res, async() => {
            const request: UserRequest = req.body;
            const id = parseInt(req.params.id);
            const user = await services.userService.updateUserProfile(request, id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: 'Error updating user' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error-3' });
    }
}

export async function getUserProfile(req: Request, res: Response) {
    try {
        authenticateUser(req, res, async() => {
            const id = parseInt(req.params.id);
            const user = await services.userService.getUserProfile(id);
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(500).json({ message: 'User not found' });
            }
        })
    } catch (error) {
        console.error('Error: ', 'User not found');
        res.status(500).json({ message: 'Internal server error-4' })
        }
}