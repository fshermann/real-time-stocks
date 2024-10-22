import { DataTypes, Model, Sequelize } from 'sequelize';


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
                allowNull: false,
                unique: true,
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