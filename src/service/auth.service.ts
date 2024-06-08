import nodemailer from 'nodemailer';
import { User } from '../persistence/entity/user';
import service from '../service/services'
import jwt from 'jsonwebtoken';
import { UserRequest } from '../model/request/user.request';
import { AppRole } from '../model/enums/app.role';
import session = require('express-session');

// declare module 'express-session' {
//     interface SessionData {
//         user: string
//     }
// }

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'marrizzsalau7@gmail.com',
        pass: ''
    }
});

export async function sendWelcomeEmail(email: string, user: User) {
    try {
        const emailContent = 
        `You are welcome to your Bank App
        Logging Details:
        Username: ${user.username}
        Email: ${user.email}
        Role: ${user.role}
        Password: ${user.password}
        Thank you for signing up`;

        // Send email
        await transporter.sendMail({
            from: 'marrizzsalau7@gmail.com',
            to: user.email,
            subject: 'Your Favorite Banking App',
            text: emailContent
        });
    } catch (error) {
        console.error('Error sending welcome email', error);
        throw error;
    }
}
const user = new User();
user.username = user.username;
user.email = user.email;

sendWelcomeEmail(user.email, user);

export async function sendNotification(email: string, user: User) {
    try {
        const notificationContent = 
        `Account created!
        Logging Details:
        userId: ${user.id}
        email: ${user.email}
        status: ${user.status}`

        //send email
        await transporter.sendMail({
            from: 'marrizzsalau7@gmail.com',
            to: user.email,
            subject: 'Account creation',
            text: notificationContent
        })
    } catch (error) {
        console.error('Error sending notification email', error);
    }
}
const user1 = new User();
user.username = user.username;
user.email = user.email;

sendNotification(user.email, user);

//Generating token
const SECRET_KEY = 'somesecretsecret';
const TOKEN_EXPIRATION = '1hr';

interface Token {
    expires_in: any;
    access_token: any;
    token: string;
}

export async function generateToken(id: number, username: string, password: string, email: string): Promise<Token> {
    const user = await service.userService.getUserProfile(id);

    if(!user) {
        throw new Error('User not found')
    }
    const payload = { 
        username: user.username, 
        email: user.email, 
        authorities: [user.role] 
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION});

    return { token }
    
}

