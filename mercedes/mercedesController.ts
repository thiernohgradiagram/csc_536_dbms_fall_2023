import express from 'express';
import {Request, Response, Router, NextFunction} from 'express-serve-static-core';
import { getAllMercedes, getMercedesByVinNumber, getMercedesByYearAndColor, insertMercedes } from './mercedesService';
import {expressDotRouterOptions} from '../middlewares/built-in-middleware-config/express.Router.config';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import { Mercedes } from './mercedes';

export const mercedesRouter: Router  = express.Router(expressDotRouterOptions);
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// https://github.com/sidorares/node-mysql2/blob/HEAD/documentation/en/TypeScript-Examples.md


mercedesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    getAllMercedes()
    .then((result: [RowDataPacket[], FieldPacket[]])=> {
        const [data] = result as RowDataPacket[];                   // result[0]
                 
        res.status(200).write(JSON.stringify(data, null, 2));
        res.end();
    }).catch((error: any) => next(error));
});

mercedesRouter.get('/:vin_number', (req: Request, res: Response, next: NextFunction) => {
    getMercedesByVinNumber(req.params.vin_number)
    .then((result: [RowDataPacket[], FieldPacket[]]) => {
        const [data] = result as RowDataPacket[];                   // result[0]
        const tableDescription: FieldPacket[] = result[1];          // result[1]
        console.log(tableDescription);
        console.log(data[0]);
        res.status(200).send(data[0]);
    }).catch((error: any) => next(error));
});

mercedesRouter.get('/:year/:color', (req: Request, res: Response, next: NextFunction) => {
    getMercedesByYearAndColor(req.params.year, req.params.color)
    .then((result: [RowDataPacket[], FieldPacket[]]) => {
        const [data] = result as RowDataPacket[];                   // result[0]
        const tableDescription: FieldPacket[] = result[1];          // result[1]
        console.log(tableDescription);
        console.log(data);
        res.status(200).send(data);
    }).catch((error: any) => next(error));
});

// When to use query param vs query string ??
mercedesRouter.get('/queryString', (req: Request, res: Response, next: NextFunction) => {
    res.send(req.query);
});

mercedesRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    // TODO: input validation with JOI
   const requestBody: Mercedes = req.body;
   insertMercedes(requestBody)
   .then((result: [ResultSetHeader, FieldPacket[]]) => res.status(201).send(result))
   .catch((error: any) => next(error));
});

mercedesRouter.put('/', (req: Request, res: Response) => {
    res.send('Got a PUT request at /cars');
});

mercedesRouter.delete('/', (req: Request, res: Response) => {
    res.send('Got a DELETE request at /cars');
});
