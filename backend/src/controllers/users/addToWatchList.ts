export default async function addToWatchList(userId: number, stockId: number, WatchList: any) {
    try {
        const [record, isCreated] = await WatchList.findOrCreate({
            where: {
                userId,
                stockId
            }
        });

        if (!record || !isCreated) {
            return false;
        }
    } catch {
        return false;
    }

    return true;
}