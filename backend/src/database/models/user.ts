import { DataTypes, Model, Sequelize } from 'sequelize';


export default function defineUser(sequelize: Sequelize) {
    class User extends Model {
        public id!: number;
        public name!: string;
        public email!: string;
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            hashedPassword: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
        }
    );

    return User;
}