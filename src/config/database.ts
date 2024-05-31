import { Dialect, Sequelize } from "sequelize";

export default class DatabaseConfig {
    private db: string;
    private user: string;
    private password: string;
    private host: string;
    private port: number;
    private maxPool: number;
    private minPool: number;
    private database: Sequelize;
    private dbDialect: string;

    constructor() {
        this.db = process.env.DB_NAME || "postgres";
        this.user = process.env.DB || "postgres";
        this.password = process.env.DB_PASSWORD || '001479';
        this.host = process.env.DB_HOST || 'localhost';
        this.port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
        this.maxPool = process.env.MAX_POOL ? parseInt(process.env.MAX_POOL) : 10;
        this.minPool = process.env.MIN_POOL ? parseInt(process.env.MIN_POOL) : 0;
        this.dbDialect = process.env.DB_DIALECT || "postgres";
        this.database = new Sequelize(this.db, this.user, this.password, {
            host: this.host,
            port: this.port,
            dialect: this.dbDialect as Dialect,
            pool: {
                max: this.maxPool,
                min: this.minPool,
            },
            storage: 'database.postgres'
        });
        this.connect();
    }

    public connect() {
        console.log('Connecting to database')
        this.database.authenticate()
            .then(() => {
                console.info('Connection successful!!!')
            })
            .catch(err => {
                console.error('Unable to connect', err)
            });
        this.database.sync({
            force: true
        }).then(() => {
            console.log('DATABASE & TABLES CREATED!');
        }).catch(err => {
            console.error('ERROR CREATING TABLE!', err)
        });
    }

    public initDb() {
        return new Sequelize(`postgres://${this.user}:${this.password}@localhost:${this.port}/${this.db}`);
    }
    get getDatabase(): Sequelize {
        return this.database;
    }
}