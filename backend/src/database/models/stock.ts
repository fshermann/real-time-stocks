import { DataTypes, Model, Sequelize } from 'sequelize';


export default function defineStock(sequelize: Sequelize) {
    class Stock extends Model {
        public id!: number;
        public ticker!: string;
        public name!: string;
    }

    Stock.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            ticker: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
        }
    );

    return Stock;
}