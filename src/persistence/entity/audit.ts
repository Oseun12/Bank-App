import { DataType, DataTypes, Model } from "sequelize";
import DatabaseConfig from "../../config/database";

const sequelize = new DatabaseConfig().initDb();

export class Audit extends Model {
    public id!: number;
    public userId!: number;
    public action!: string;
    public timestamp!: Date;
    public readonly createdAt!: Date;
    public updatedAt!: Date;
}

Audit.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    createdAt: {
        type: new DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: new DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Audit',
    tableName: 'audits',
    timestamps: true,
});