/**
 * The purpose of this file is to define the health check routes.
 */

import { Router, Request, Response } from 'express';

import healthCheck from '../../controllers/health/get';

/**
 * Defines the health check route and executes the controller.
 * @param router - the Express router object
 */
export default function setupHealthChecks(router: Router) {
    router.get('/health', (req: Request, res: Response) => {
        const healthCheckResponse = healthCheck();
        res.send(healthCheckResponse);
    })
}