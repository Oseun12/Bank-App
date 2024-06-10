import * as dotenv from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';
import { User } from '../persistence/entity/user';
import service from '../service/services'
import jwt from 'jsonwebtoken';
import { UserRequest } from '../model/request/user.request';
import session = require('express-session');

dotenv.config();

// declare module 'express-session' {
//     interface SessionData {
//         user: string
//     }
// }

const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
   // service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export async function sendWelcomeEmail(email: string, user: User): Promise<void> {
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
        console.log('Welcome email sent successfully!');
    } catch (error) {
        console.error('Error sending welcome email', error);
        throw error;
    }
}
// const user = new User();
// user.username = user.username;
// user.email = user.email;

// sendWelcomeEmail(user.email, user);

//export class NotificationService {
    export async function sendNotification(user: User, message: string): Promise<void> {
        try {
            const notificationContent = 
            `Account created!
            Logging Details:
            userId: ${user.id}
            email: ${user.email}
            status: ${user.status}
            
            Message: ${message}`;

            // Send email
            await transporter.sendMail({
                from: 'marrizzsalau7@gmail.com',
                to: user.email,
                subject: 'Account creation',
                text: notificationContent
            });
            console.log('Notification email sent successfully');
        } catch (error) {
            console.error('Error sending notification email', error);
        }
    }
//}


// Usage
// const notificationService = sendNotification();

// const user1 = new User();
// user1.username = "Maryy";
// user1.email = user.email;
// user1.id = 123; 
// user1.status = "active";  

// notificationService.sendNotification(user1.email, user1);

// export async function sendNotification( email: string, user: User): Promise<void> {
//     try {
//         const notificationContent = 
//         `Account created!
//         Logging Details:
//         userId: ${user.id}
//         email: ${user.email}
//         status: ${user.status}`

//         //send email
//         await transporter.sendMail({
//             from: 'marrizzsalau7@gmail.com',
//             to: user.email,
//             subject: 'Account creation',
//             text: notificationContent
//         })
//     } catch (error) {
//         console.error('Error sending notification email', error);
//     }
// }
// const user1 = new User();
// user.username = user.username;
// user.email = user.email;

// sendNotification(user, onmessage);

//Generating token
const SECRET_KEY = 'somesecretsecret';
const TOKEN_EXPIRATION = '2hr';

interface Token {
    expires_in: any;
    access_token: any;
    token: string;
}

export async function generateToken(id: number, username: string, password: string, email: string): Promise<{
    access_token: any; token: string 
}> {
    const user: User = await service.userService.getUserProfile(id);

    if(!user) {
        throw new Error('User not found')
    }
    
    const payload = { 
        username: user.username, 
        email: user.email, 
        authorities: [user.role], 
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION});

    return { access_token: token, token }
    
}

