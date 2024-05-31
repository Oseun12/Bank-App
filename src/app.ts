import express from 'express';
import DatabaseConfig from './config/database';
import { Request, Response, NextFunction } from 'express';
import RouteInterface from './routes/route.interface';

export default class App {
    public app: express.Application;
    public port: number;

    constructor(routes:Routes[]) {
        this.app = express();
        this.port = 3000;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.connectDatabase();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('app', `App running on port ${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }

    initializeMiddlewares() {
        throw new Error('Method not implemented.');
    }
    initializeRoutes(routes: Routes[]) {
        console.log('app.initializeRoutes', 'Running App....');
        routes.forEach((route) => {
            this.app.use('', route.router);
        });
    }
    
    
    private connectDatabase() {
        const database: DatabaseConfig = new DatabaseConfig()
        database.connect();
    }
}