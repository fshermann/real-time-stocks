/**
 * The main entry of the backend express JS Server
 */

import express from 'express';
import cors from 'cors';

import setupRoutes from './routes/routes';
import setupDatabase from './database/setup';

/**
 * This function starts the server and calls all other initial setup functions.
 */
async function start() {
    const app = express();
    const APP_PORT = process.env.APP_PORT;

    // SETUP MIDDLEWARE
    app.use(cors());
    app.use(express.json());

    // setup a router so we can easily add a base of /api/v1 
    // also enables easily handling future versioning
    const router = express.Router();

    if (!APP_PORT) {
        throw new Error('No Server Port Defined');
    }

    // SETUP THE DATABASE
    const models = await setupDatabase();

    // START THE SERVER
    app.listen(APP_PORT, () => {
        console.log(`Server is running at http://localhost:${APP_PORT}`);

        // route setup with base route included
        setupRoutes(router, models);
        app.use('/api/v1', router);
    });
}

start();