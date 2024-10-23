/**
 * This file holds the logic that generates random stock price data.
 */

/**
 * This algorithm gives semi-realistic looking stock price fluctuations.
 * @param price - the price to mutate within the bounds of the algorithm
 */
const stablePriceFluctuation = (price: number) => {
    const volatility = 0.02; // 2% price volatility

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
 */
export default async function generateStockPrices(Stock: any, StockPrice: any) {
    const stockPrices: any[] = []; // Create an array to hold stock data

    if (!process.env.FAKE_STOCK_PRICE_COUNT) {
        throw new Error('You must provide a FAKE_STOCK_PRICE_COUNT');
    }

    const stocks = await Stock.findAll({ raw: true });

    // Not the most performant due to the nesting, but fine at reasonable record counts
    stocks.forEach((stock: any) => {
        const maxRecords: number = parseInt(process.env.FAKE_STOCK_PRICE_COUNT!);

        // get a realistic starting price
        const min: number = 1;
        const max: number = 300;
        let startingPrice: number = +(Math.random() * (max - min) + min).toFixed(2);

        // get the market opening time
        let now: Date = new Date();
        let marketOpening: Date = new Date(now);
        marketOpening.setHours(9, 0, 0, 0); // Set time to 9:00:00.000 AM

        let price = startingPrice;
        for (let i = 0; i < maxRecords; i++) {
            price = stablePriceFluctuation(price);
            stockPrices.push({
                stockId: stock.id,
                price: price,
                createdAt: marketOpening,
                updatedAt: marketOpening
            });
        }
    })

    try {
        await StockPrice.bulkCreate(stockPrices, { logging: false });
        console.log(`StockPrices table populated with ${stockPrices.length} fake records.`);
    } catch (error) {
        console.error('Error populating Stock table:', error);
    }
}