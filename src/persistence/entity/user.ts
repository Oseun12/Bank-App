import { DataTypes, Model } from "sequelize";
import DatabaseConfig from "../../config/database";
import { AppRole } from "../../model/enums/app.role";

const sequelize = new DatabaseConfig().initDb();

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: AppRole;
    public email!: string;
    public status!: string;
    updateAt!: Date;
}
User.init({
    id: {
        type: new DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: new DataTypes.ENUM('Admin, Customer, Audit'),
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: new DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
    },
    createdAt: {
        type: new DataTypes.DATE,
        allowNull: false
    }, 
    updatedAt: {
        type: new DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});
