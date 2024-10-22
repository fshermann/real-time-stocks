/**
 * The purpose of this file is to provide the main setup of all routes.
 * The intent is to seperate the underlying application logic from the route definitions.
 */

import { Router } from 'express';

import { Models } from '../database/setup';

import setupHealthChecks from './health/get';

/**
 * The main caller for all route setups.
 * @param router - a reference to the Express router object
 */
export default function setupRoutes(router: Router, models: Models) {
    // HEALTH CHECKS
    setupHealthChecks(router);
}