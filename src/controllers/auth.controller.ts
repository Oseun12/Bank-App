import bcrypt from 'bcryptjs';
import { User } from '../persistence/entity/user';
import { UserRequest } from '../model/request/user.request';
import { Request, Response } from 'express';
import service from '../service/services';
import { sendWelcomeEmail } from '../service/auth.service';


export async function getRegister(req: Request, res: Response) {
    res.send('Registered!!');
};

export async function postRegister(req: Request, res: Response) {
    try {
        //create user
        await service.userService.createUserProfile(req.body as UserRequest)
        //send email
        await sendWelcomeEmail(req.body.email, new User);
        res.json({ message: 'User successfully created!' })
    } catch (error) {
        console.error('Error creating User:', error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function getLogin(req: Request, res: Response) {
    res.send('Login')
}

declare module 'express-session' {
    interface SessionData {
        user: string;
    }
}

export async function postLogin(req: Request, res: Response) {
    const { username, email, password } = req.body
    try {
        if(!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, password required' });
        }
        //find user by username or email
        const user = await service.userService.getUserProfileByUsernameOrEmail(username, email);
        console.log('user: ', user.get());
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        //After login generate token
        const token = await service.authService.generateToken(user.id, user.username,user.password, user.email);
        req.session.user = user.username;
        res.json({ data: { access_token: token.acess_token, expires_in: token.expires_in }, message: 'Login successful!', status: 200 });
    } catch(error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Internal Server error-1' });
    }
}

export async function logout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out: ', err);
            res.status(500).json({ message: 'Internal Server Error-2' });
        } else {
            res.json({ message: 'Logout successfully!' });
        }
    })
}