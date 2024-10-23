/**
 * This function returns a single stock's basic data.
 * @param stockId - the stock's ID
 * @param Stock - the Stock model
 * @returns the stock's data
 */
export default async function getStockById(stockId: number, Stock: any) {
    const stock = await Stock.findOne({
        where: {
            id: stockId
        }
    });

    return {
        data: stock
    }
}