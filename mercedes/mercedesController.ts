import express from 'express';
import {Request, Response, Router, NextFunction} from 'express-serve-static-core';
import { getAllMercedes, getMercedesByVinNumber, getMercedesByYearAndColor, insertMercedes } from './mercedesService';
import {expressDotRouterOptions} from '../middlewares/built-in-middleware-config/express.Router.config';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import { Mercedes } from './mercedes';


// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// https://github.com/sidorares/node-mysql2/blob/HEAD/documentation/en/TypeScript-Examples.md
/* Rest API Design Best practice
    The Rest API URI path should identify a table in the database
    A query parameter should be used to get a record from a table
    A query string should be used to filter the records of a table, based on some attributes
    Example of a good design
    Table:      /csc536/api/mercedes                            => Get all Mercedes
    Record:     /csc536/api/mercedes/:vin_number                => Get a Mercedes by vin_number
    Records:    /csc536/api/mercedes?year=2023&color='red'      => Get a Mercedes by year and color
*/

export const mercedesRouter: Router  = express.Router(expressDotRouterOptions);

// Get all mercedes from the mercedes table
mercedesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    if(JSON.stringify(req.query) === '{}') { 
        getAllMercedes()
        .then((result: [RowDataPacket[], FieldPacket[]])=> {
            const [data] = result as RowDataPacket[];                   // result[0]
            //const tableDescription: FieldPacket[] = result[1];          // result[1]
            //console.log(tableDescription[0]);
            //console.log(data);
            res.status(200).write(JSON.stringify(data, null, 2));
            res.end();
        }).catch((error: any) => next(error));

    } else {  // using query strings

        const year = req.query.year as string;
        const color = req.query.color as string;
        
        getMercedesByYearAndColor(year, color)
        .then((result: [RowDataPacket[], FieldPacket[]]) => {
            const [data] = result as RowDataPacket[];                   // result[0]
            //const tableDescription: FieldPacket[] = result[1];          // result[1]
            //console.log(tableDescription);
            //console.log(data);
            res.status(200).write(JSON.stringify(data, null, 2));
            res.end();
        }).catch((error: any) => next(error));
    }
});

// Using a route parameter
mercedesRouter.get('/:vin_number', (req: Request, res: Response, next: NextFunction) => {
    getMercedesByVinNumber(req.params.vin_number)
    .then((result: [RowDataPacket[], FieldPacket[]]) => {
        const [data] = result as RowDataPacket[];                   // result[0]
        const tableDescription: FieldPacket[] = result[1];          // result[1]
        console.log(tableDescription);
        console.log(data[0]);
        res.status(200).write(JSON.stringify(data[0], null, 2));
        res.end();
    }).catch((error: any) => next(error));
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
