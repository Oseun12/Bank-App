import { Router } from "express";
import RouteInterface from "./route.interface";
import { getRegister, postRegister, getLogin, postLogin, logout } from "../controllers/auth.controller";
import { Request, Response } from "express";

export default class AuthRoute implements RouteInterface {
    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/register', getRegister);
        this.router.post('/register', postRegister);
        this.router.get('/login', getLogin);
        this.router.post('/login', postLogin);
        this.router.get('/logout', logout)
    }
}