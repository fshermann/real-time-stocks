/**
 * This file handles the main setup for the database layer.
 */

import { Sequelize, Model } from 'sequelize';

import defineUser from './models/user';
import defineStock from './models/stock';
import defineStockPrice from './models/stockPrice';
import defineWatchList from './models/watchList';
import generateStocks from './generators/generateStocks';
import generateStockPrices from './generators/generateStockPrices';

/**
 * This is the main database setup function. It should be called before the express app starts.
 */
export default async function setupDatabase() {
    const sequelize = new Sequelize({
        dialect: 'sqlite' as 'sqlite',
        storage: './database.sqlite'
    });

    // LOAD DEFINED MODELS
    const User = defineUser(sequelize);
    const Stock = defineStock(sequelize);
    const StockPrice = defineStockPrice(sequelize);
    const WatchList = defineWatchList(sequelize);

    // Define the one to many relationship of Users to WatchLists
    User.hasMany(WatchList, { foreignKey: 'userId' });
    WatchList.belongsTo(User, { foreignKey: 'userId' });

    // Define the one to many relationship of Stocks to WatchLists
    Stock.hasMany(WatchList, { foreignKey: 'stockId' });
    WatchList.belongsTo(Stock, { foreignKey: 'stockId' });

    // Define the one to many relationship of Stocks to StockPrices
    Stock.hasMany(StockPrice, { foreignKey: 'stockId' });
    StockPrice.belongsTo(Stock, { foreignKey: 'stockId' });

    // Force all tables to be created - not for use in prod environments
    await sequelize.sync({ force: true });

    // Generate Random Stocks
    await generateStocks(Stock);
    await generateStockPrices(Stock, StockPrice)

    // Add an admin user
    await User.create({
        username: 'test',
        hashedPassword: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08' // sha256 of test
    });

    console.log("DATABASE SETUP COMPLETE! APP IS LIVE!");

    return {
        User,
        Stock,
        StockPrice,
        WatchList
    };
}

export interface Models {
    User: typeof Model;
    Stock: typeof Model;
    StockPrice: typeof Model;
    WatchList: typeof Model;
}