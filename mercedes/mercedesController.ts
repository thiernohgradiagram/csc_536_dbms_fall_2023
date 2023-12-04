import express from 'express';
import {Request, Response, Router, NextFunction} from 'express-serve-static-core';
import { getAllMercedes, getMercedesByVinNumber, getMercedesByYearAndColor, insertMercedes, insertMercedesImages } from './mercedesService';
import {expressDotRouterOptions} from '../middlewares/built-in-middleware-config/express.Router.config';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import { Mercedes } from './mercedes';
import { Mercedes_images } from './mercedes_images';

const multer = require("multer");
const upload = multer({dest:"public/assets/images"})

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
   const requestBody: Mercedes = {
       vin_number: req.body.vin_number,
       color: req.body.color,
       model: req.body.model,
       _year: req.body._year,
       price: req.body.price,
       transmission: req.body.transmission,
       fuel: req.body.fuel,
       number_of_cylinders: req.body.number_of_cylinders,
       mileage: req.body.mileage,
       drive: req.body.drive,
       email: null,
       branch_id: req.body.branch_id,
       sales_id: null
   }
   insertMercedes(requestBody)
   .then((result: [ResultSetHeader, FieldPacket[]]) =>
    res.redirect('/managebranch')
   )
   .catch((error: any) => next(error));
});

mercedesRouter.post('/upload',upload.array("files"),(req: Request, res: Response,next:NextFunction) => {
    var files:any = req.files;
    var images:any[] = [];
    var vin_number:string = req.body.vin_number;
    files.forEach((file:any)=>{
        images.push([file.filename,vin_number])
    })
    insertMercedesImages(images)
    .then((result: [ResultSetHeader, FieldPacket[]])=>{
        res.redirect("/managebranch"); 
    }).catch((error)=>next(error));
    
});

mercedesRouter.delete('/', (req: Request, res: Response) => {
    res.send('Got a DELETE request at /cars');
});
