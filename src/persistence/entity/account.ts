import { DataTypes, Model, Sequelize } from "sequelize";
import DatabaseConfig from "../../config/database";
import { User } from "./user";
//import sequelize from "../../config/database"

const sequelize = new DatabaseConfig().initDb();

export class Account extends Model {
    public id!: number;
    public userId!: number;
    public balance!: number;
    public status!: string;
    public readonly createdAt!: Date;
    public updatedAt!: Date;
}
Account.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
    },
    createdAt: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    updatedAt: {
        type: new DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: true
});