export default async function removeFromWatchList(userId: number, stockId: number, WatchList: any) {
    try {
        const existingRecord = await WatchList.findOne({
            where: {
                userId,
                stockId
            }
        });

        if (existingRecord) {
            await existingRecord.destroy();
            return true;
        }
    } catch {
        return false;
    }

    return false;
}