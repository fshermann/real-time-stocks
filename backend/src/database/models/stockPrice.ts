import { DataTypes, Model, Sequelize } from 'sequelize';

/**
 * This function creates the StockPrice database model.
 */
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
                primaryKey: true
            },
            stockId: {
                type: DataTypes.STRING,
                allowNull: false
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