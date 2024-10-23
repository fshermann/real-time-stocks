/**
 * This file holds the logic that generates random data.
 */

import { faker } from '@faker-js/faker';

/**
 * This function runs on app start and loads the database with random stocks.
 * This uses faker to generate the names and tickers
 */
export default async function generateStocks(Stock: any) {
    const stocks: any[] = []; // Create an array to hold stock data

    if (!process.env.FAKE_STOCK_COUNT) {
        throw new Error('You must provide a FAKE_STOCK_COUNT');
    }

    // Note: it is possible for duplicates to happen, but it is unlikely.
    const maxRecords = parseInt(process.env.FAKE_STOCK_COUNT!);
    for (let i = 0; i < maxRecords; i++) {
        // gets a random company name and makes it pretty
        const companyName = faker.company.name().toUpperCase();
        stocks.push({
            ticker: companyName.substring(0, 4).replace(/[^A-Za-z]/g, ''), // no non-letters
            name: companyName,
        });
    }

    try {
        await Stock.bulkCreate(stocks, { logging: false });
        console.log(`Stocks table populated with ${maxRecords} fake records.`);
    } catch (error) {
        console.error('Error populating Stock table:', error);
    }
}