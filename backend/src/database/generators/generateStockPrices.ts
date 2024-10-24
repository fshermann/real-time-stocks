/**
 * This file holds the logic that generates random stock price data.
 */

/**
 * This algorithm gives semi-realistic looking stock price fluctuations.
 * @param price - the price to mutate within the bounds of the algorithm
 */
const stablePriceFluctuation = (price: number) => {
    const volatility = 0.5; // this is a pretty low amount of volatility

    let randomness: number = Math.random();  // Random float between 0 and 1
    let changePercent: number = 2 * volatility * randomness;

    if (changePercent > volatility) {
        changePercent -= (2 * volatility);
    }
    let newPrice: number = price + changePercent;

    return newPrice;
}

/**
 * This function runs on app start and loads the database with random stock prices.
 * @param Stock - stock data model
 * @param StockPrice - stock price data model
 * @param recordCount - the count of record to create for each stock
 * @param initialCreation - whether to start with a random number of the most recent value
 */
export default async function generateStockPrices(Stock: any, StockPrice: any, recordCount: number, initialCreation: boolean) {
    const stockPrices: any[] = []; // Create an array to hold stock data
    const stocks = await Stock.findAll({ raw: true });

    // Not the most performant due to the nesting, but fine at reasonable record counts
    for (const stock of stocks) {
        // get a realistic starting price
        let startingPrice: number;

        if (initialCreation) {
            const min: number = 20; // no penny stocks in my simulation!
            const max: number = 300;
            startingPrice = +(Math.random() * (max - min) + min).toFixed(2);
        } else {
            // get the most recent price as the point to mutate from
            // this avoids massive price fluctuations over time
            let existingPrice = await StockPrice.findOne({
                where: {
                    stockId: stock.id
                },
                order: [['id', 'DESC']],
                logging: false,
                raw: true
            });
            startingPrice = parseInt(existingPrice.price);
        }

        let price = startingPrice;
        for (let i = 0; i < recordCount; i++) {
            price = stablePriceFluctuation(price);

            stockPrices.push({
                stockId: stock.id,
                price: price
            });
        }
    }

    try {
        await StockPrice.bulkCreate(stockPrices, { logging: false });
        console.log(`StockPrices table populated with ${stockPrices.length} fake records.`);
    } catch (error) {
        console.error('Error populating Stock table:', error);
    }
}