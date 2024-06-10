import { Router } from "express";
import RouteInterface from "./route.interface";
import { getAuditLogs } from "../controllers/audit.controller";
import { Request, Response } from "express";
import { authRole } from "../middleware/permission";

export default class AuditRoute implements RouteInterface {
    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/audit', authRole(['AUDIT']), getAuditLogs);
    }
}