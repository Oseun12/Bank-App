import { Router } from "express";
import { Request, Response } from "express";
import RouteInterface from "./route.interface";
import * as accountController from '../controllers/account.controller';
import { authRole } from "../middleware/permission";

export default class AccountRoute implements RouteInterface {
    public router: Router = Router();
    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post('/account', accountController.createAccount);
        this.router.get('/account/:id', authRole(['CUSTOMER']), accountController.getAccountDetails);
        this.router.post('/deposit', accountController.deposit);
        this.router.post('/withdraw', accountController.withdraw);
        this.router.post('/transfer', accountController.transfer)
    }
}