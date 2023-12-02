import express from 'express';
import {Request, Response, Router, NextFunction} from 'express-serve-static-core';
import { getAllBranches, getBranchByEmail, updateBranch, insertBranch } from './branchService';
import {expressDotRouterOptions} from '../middlewares/built-in-middleware-config/express.Router.config';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import { Branch } from './branch';
import { json } from 'stream/consumers';
import { request } from 'http';

export const branchRouter: Router  = express.Router(expressDotRouterOptions);
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// https://github.com/sidorares/node-mysql2/blob/HEAD/documentation/en/TypeScript-Examples.md


branchRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    getAllBranches()
    .then((result: [RowDataPacket[], FieldPacket[]])=> {
        const [data] = result as RowDataPacket[];                   // result[0]
        const tableDescription: FieldPacket[] = result[1];          // result[1]
        res.status(200).send(JSON.stringify(data, null, 2));
        res.end();
    }).catch((error: any) => next(error));
});

branchRouter.get('/:email', (req: Request, res: Response, next: NextFunction) => {
    getBranchByEmail(req.params.email)
    .then((result: [RowDataPacket[], FieldPacket[]]) => {
        const [data] = result as RowDataPacket[];                   // result[0]
        const tableDescription: FieldPacket[] = result[1];          // result[1]
        console.log(tableDescription);
        console.log(data[0]);
        res.status(200).send(data[0]);
    }).catch((error: any) => next(error));
});

branchRouter.get('/:year/:color', (req: Request, res: Response, next: NextFunction) => {
    
});

// When to use query param vs query string ??
branchRouter.get('/queryString', (req: Request, res: Response, next: NextFunction) => {
    res.send(req.query);
});

branchRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    // TODO: input validation with JOI
   const requestBody: Branch = 
   {
        branch_name :req.body.branch_name,
        branch_number : req.body.branch_number,
        street_name : req.body.street_name,
        city : req.body.city,
        state : req.body.state,
        zip_code : req.body.zip_code,
        email : req.body.email,
   };
   
    insertBranch(requestBody)
    .then((result: [ResultSetHeader, FieldPacket[]]) => res.render('/mainpage'))
   .catch((error: any) => next(error));
});

branchRouter.post('/login',(req: Request, res: Response, next: NextFunction)=>{
    var email = req.body.email;
    var password = req.body.password
    getBranchByEmail(email)
    .then((result: [RowDataPacket[], FieldPacket[]]) => {
         var data = result[0];
         var pass = data.filter((x)=>x["_password"]==password.toString());
         if (pass.length==1){
            res.redirect('/mainpage?email='+email);
         }else{
            res.redirect('/login');
         }
        
    }).catch((error: any) => next(error));
});

branchRouter.put('/', (req: Request, res: Response) => {
    res.send('Got a PUT request at /cars');
});

branchRouter.delete('/', (req: Request, res: Response) => {
    res.send('Got a DELETE request at /cars');
});

