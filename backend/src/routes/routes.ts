/**
 * The purpose of this file is to provide the main setup of all routes.
 * The intent is to seperate the underlying application logic from the route definitions.
 * 
 * If the app grew, you could start to break these out into their own files to keep this trim.
 */

import { Router, Request, Response } from 'express';

import { Models } from '../database/setup';
import healthCheck from '../controllers/health/get';
import handleLogin from '../controllers/users/login/login';
import handleSignUp from '../controllers/users/signUp';

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

    // ============== USER MANAGEMENT ==============
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
}