import express from 'express';
import {Request, Response, Router} from 'express-serve-static-core';
import { getMercedes } from './mercedesService';
import {expressDotRouterOptions} from '../middlewares/built-in-middleware-config/express.Router.config';

export const mercedesRouter: Router  = express.Router(expressDotRouterOptions);

mercedesRouter.get('/', async (req: Request, res: Response) => {
    const mercedes = await getMercedes();
    res.write(JSON.stringify(mercedes, null, 2));
    res.end();
});

mercedesRouter.get('/routeParameters/:carId', (req: Request, res: Response) => {
    res.send(req.params.carId);
});

mercedesRouter.get('/routeParameters/:year/:month', (req: Request, res: Response) => {
    res.send(req.params);
});

mercedesRouter.get('/queryString', (req: Request, res: Response) => {
    res.send(req.query);
});

mercedesRouter.post('/', (req: Request, res: Response) => {
    res.send('Got a POST request at /cars');
});

mercedesRouter.put('/', (req: Request, res: Response) => {
    res.send('Got a PUT request at /cars');
});

mercedesRouter.delete('/', (req: Request, res: Response) => {
    res.send('Got a DELETE request at /cars');
});
