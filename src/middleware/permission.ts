import { AppRole } from './../model/enums/app.role';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export const authRole = (permissions: string | string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('req: ', req.headers)
        const userRole: AppRole = req.body.AppRole;
        if (!userRole) {
            return res.status(401).json('Access denied');
        } 
        
        if (permissions.includes(userRole.toString())) {
            next()
        }
        else {
            return res.status(401).json('You dont have permission')
        }
    }
}

export const checkPermission = (authority: string []) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const authorisation = req.headers?.authorization;
        const accessToken = authorisation?.split(" ")[1];
        if (accessToken) {
            const decode: any = jwt.decode(accessToken);
            const permissions: string[] = decode.authorities;
            if (permissions) {
                for (const permission of permissions) {
                    if (authority.includes(permission)) {
                        next();
                        return true;
                    }
                }
            }
        }
        next();
        res.send({message: 'Access Denied', status: 403})
    }
}


