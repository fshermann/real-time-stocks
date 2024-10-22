/**
 * This file handles the main setup for the database layer.
 */

import { Sequelize } from 'sequelize';

import defineUser from './models/user';

export default async function setupDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
    });

    // LOAD DEFINED MODELS
    const User = defineUser(sequelize);

    await sequelize.sync({ force: true })

    return {
        User
    };
}