import { Request } from "express";

/**
 * A standard way to handle pagination across all routes.
 * 
 * @param req - the express request object
 * @returns { limit, offset } - can be plugged directly into sequelize
 */
export default function paginate(req: Request) {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const limit = size;
    const offset = (page - 1) * size;

    return { limit, offset };
};