import { DataTypes, Model, Sequelize } from 'sequelize';

/**
 * This function creates the WatchList database model.
 */
export default function defineWatchList(sequelize: Sequelize) {
    class WatchList extends Model {
        public id!: number;
        public name!: string;
        public email!: string;
    }

    WatchList.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            stockId: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
        }
    );

    return WatchList;
}