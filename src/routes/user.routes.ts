import { Router } from "express";
import RouteInterface from "./route.interface";
import * as userController from '../controllers/user.controller'
import { Request, Response } from "express";
import { authRole } from "../middleware/permission";

export default class UserRoute implements RouteInterface {
    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post('/user', authRole(['ADMIN']), userController.createUserProfile);
        this.router.put('/user', authRole(['ADMIN']), userController.updateUserProfile);
        this.router.get('/user/:id',authRole(['CUSTOMER, ADMIN, AUDIT']), userController.getUserProfile)
    }
}