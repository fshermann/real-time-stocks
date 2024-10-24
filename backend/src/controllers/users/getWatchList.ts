export default async function getWatchList(userId: number, limit: number, offset: number, WatchList: any) {
    try {
        const watchList = await WatchList.findAndCountAll({
            limit,
            offset,
            where: {
                userId
            }
        });

        return {
            data: watchList.rows,
            total: watchList.count,
            currentPage: Math.ceil(offset / limit) + 1,
            totalPages: Math.ceil(watchList.count / limit),
        };
    } catch {
        return false;
    }
}