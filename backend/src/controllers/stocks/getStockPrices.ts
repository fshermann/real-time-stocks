/**
 * Returns a single stock's price history with pagination.
 * @param stockId - the stock's ID
 * @param limit - determined by the pagination utility
 * @param offset - determined by the pagination utility
 * @param StockPrice - data model
 * @returns stock's data
 */
export default async function getStockPrices(stockId: number, limit: number, offset: number, StockPrice: any) {
    const stocks = await StockPrice.findAndCountAll({
        limit,
        offset,
        where: {
            stockId
        }
    });

    return {
        data: stocks.rows,
        total: stocks.count,
        currentPage: Math.ceil(offset / limit) + 1,
        totalPages: Math.ceil(stocks.count / limit),
    };
}