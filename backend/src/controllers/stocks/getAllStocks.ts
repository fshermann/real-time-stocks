/**
 * This function returns a list of all the stock available with pagination.
 * @param Stock - the stock data model
 * @param limit - determined from the pagination utility
 * @param offset - determined from the pagination utility
 */
export default async function getAllStocks(limit: number, offset: number, Stock: any) {
    const stocks = await Stock.findAndCountAll({
        limit,
        offset,
    });

    return {
        data: stocks.rows,
        total: stocks.count,
        currentPage: Math.ceil(offset / limit) + 1,
        totalPages: Math.ceil(stocks.count / limit),
    };
}