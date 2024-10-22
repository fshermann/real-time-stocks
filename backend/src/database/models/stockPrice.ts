import { DataTypes, Model, Sequelize } from 'sequelize';


export default function defineStockPrice(sequelize: Sequelize) {
    class StockPrice extends Model {
        public id!: number;
        public stockId!: string;
        public price!: string;
    }

    StockPrice.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            stockId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
        }
    );

    return StockPrice;
}