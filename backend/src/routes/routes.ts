/**
 * The purpose of this file is to provide the main setup of all routes.
 * The intent is to seperate the underlying application logic from the route definitions.
 * 
 * If the app grew, you could start to break these out into their own files to keep this trim.
 */

import { Router, Request, Response } from 'express';

import { Models } from '../database/setup';
import healthCheck from '../controllers/health/get';
import handleLogin from '../controllers/users/login';
import handleSignUp from '../controllers/users/signUp';
import getAllStocks from '../controllers/stocks/getAllStocks';
import getStockById from '../controllers/stocks/getStockById';
import getStockPrices from '../controllers/stocks/getStockPrices';
import paginate from '../util/paginate';
import verifyToken from '../middleware/auth';
import addToWatchList from '../controllers/users/addToWatchList';
import removeFromWatchList from '../controllers/users/removeFromWatchList';
import getWatchList from '../controllers/users/getWatchList';

/**
 * The main caller for all route setups.
 * @param router - a reference to the Express router object
 * @param models - the database models to pass to the controllers
 */
export default function setupRoutes(router: Router, models: Models) {
    // ============== HEALTH CHECKS ==============
    router.get('/health', (req: Request, res: Response) => {
        const healthCheckResponse = healthCheck();
        res.send(healthCheckResponse);
    })

    // ============== USER LIFECYCLE MANAGEMENT ==============
    router.post('/users/login', async (req: Request, res: Response) => {
        const username = req.body.username;
        const hashedPassword = req.body.hashedPassword;
        const loginResponse = await handleLogin(username, hashedPassword, models.User);

        if (!loginResponse) {
            res.sendStatus(401);
        } else {
            res.send(loginResponse);
        }
    })

    router.post('/users', async (req: Request, res: Response) => {
        const username = req.body.username;
        const hashedPassword = req.body.hashedPassword;
        const signUpResponse = await handleSignUp(username, hashedPassword, models.User);

        // if anything goes wrong, for security return a 401
        if (!signUpResponse) {
            res.sendStatus(401);
        } else {
            res.send(signUpResponse);
        }
    })

    // ============== STOCKS ==============
    router.get('/stocks', async (req: Request, res: Response) => {
        const { limit, offset } = paginate(req);
        const stocks = await getAllStocks(limit, offset, models.Stock);
        res.send(stocks);
    })

    router.get('/stocks/:id', async (req: Request, res: Response) => {
        const stockId = parseInt(req.params.id);
        if (!stockId) {
            res.sendStatus(400);
        }

        const stock = await getStockById(stockId, models.Stock);
        res.send(stock);
    })

    router.get('/stocks/:id/price', async (req: Request, res: Response) => {
        const { limit, offset } = paginate(req);

        const stockId = parseInt(req.params.id);
        if (!stockId) {
            res.sendStatus(400);
        }

        const stockPrices = await getStockPrices(stockId, limit, offset, models.StockPrice);
        res.send(stockPrices);
    })

    // ============== USER WATCH LIST ==============
    router.post('/users/:userId/watchlist/:stockId', verifyToken, async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const stockId = parseInt(req.params.stockId);

        const status = await addToWatchList(userId, stockId, models.WatchList);
        if (status) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    })

    router.delete('/users/:userId/watchlist/:stockId', verifyToken, async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const stockId = parseInt(req.params.stockId);

        const status = await removeFromWatchList(userId, stockId, models.WatchList);
        if (status) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    })

    router.get('/users/:userId/watchlist', verifyToken, async (req: Request, res: Response) => {
        const { limit, offset } = paginate(req);
        const userId = parseInt(req.params.userId);

        const watchList = await getWatchList(userId, limit, offset, models.WatchList, models.Stock);

        if (watchList) {
            res.send(watchList);
        } else {
            res.sendStatus(400);
        }
    })

}