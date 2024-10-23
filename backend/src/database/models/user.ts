import { DataTypes, Model, Sequelize } from 'sequelize';

/**
 * This function creates the User database model.
 */
export default function defineUser(sequelize: Sequelize) {
    class User extends Model {
        public id!: number;
        public username!: string;
        public hashedPassword!: string;
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