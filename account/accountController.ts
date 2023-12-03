import express from 'express';
import {Request, Response, Router, NextFunction} from 'express-serve-static-core';
import { getAllUsers, getUsersByEmail, updateUser, insertUser, insertManager, updateBranchManagerEmail } from './accountService';
import {expressDotRouterOptions} from '../middlewares/built-in-middleware-config/express.Router.config';
import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import { User } from './user';
import { json } from 'stream/consumers';
import { request } from 'http';
import { Manager } from './manager';

export const accountRouter: Router  = express.Router(expressDotRouterOptions);
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// https://github.com/sidorares/node-mysql2/blob/HEAD/documentation/en/TypeScript-Examples.md


accountRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    getAllUsers()
    .then((result: [RowDataPacket[], FieldPacket[]])=> {
        const [data] = result as RowDataPacket[];                   // result[0]
        const tableDescription: FieldPacket[] = result[1];          // result[1]
        
        console.log(data);
        res.status(200).write(JSON.stringify(data, null, 2));
        res.end();
    }).catch((error: any) => next(error));
});

accountRouter.get('/:email', (req: Request, res: Response, next: NextFunction) => {
    getUsersByEmail(req.params.vin_number)
    .then((result: [RowDataPacket[], FieldPacket[]]) => {
        const [data] = result as RowDataPacket[];                   // result[0]
        res.status(200).send(data[0]);
    }).catch((error: any) => next(error));
});

accountRouter.get('/:year/:color', (req: Request, res: Response, next: NextFunction) => {
    
});

// When to use query param vs query string ??
accountRouter.get('/queryString', (req: Request, res: Response, next: NextFunction) => {
    res.send(req.query);
});

accountRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    // TODO: input validation with JOI
   const requestBody: User = 
   {
        first_name :req.body.first_name,
        last_name : req.body.last_name,
        middle_name : req.body.middle_name,
        email : req.body.email,
        house_number : req.body.house_number,
        street_name : req.body.street_name,
        city : req.body.city,
        state : req.body.state,
        zip_code : req.body.zip_code,
        password : req.body.password
   };
   
    insertUser(requestBody)
    .then((result: [ResultSetHeader, FieldPacket[]]) => res.render('/login'))
   .catch((error: any) => next(error));
});

accountRouter.post('/addmanager', (req: Request, res: Response, next: NextFunction) => {
    // TODO: input validation with JOI
   const requestBody: User = 
   {
        first_name :req.body.first_name,
        last_name : req.body.last_name,
        middle_name : req.body.middle_name,
        email : req.body.email,
        house_number : req.body.house_number,
        street_name : req.body.street_name,
        city : req.body.city,
        state : req.body.state,
        zip_code : req.body.zip_code,
        password : req.body.password
   };

   const manager : Manager = {
        _role : 0,
        email : req.body.email,

   }

   const branch_id : number = req.body.branch_id;
   const manager_email : string = req.body.email;
   
    insertUser(requestBody)
    .then((result: [ResultSetHeader, FieldPacket[]]) =>{
        insertManager(manager).then((result: [ResultSetHeader, FieldPacket[]])=>{
            updateBranchManagerEmail(manager_email,branch_id)
            .then((result: [ResultSetHeader, FieldPacket[]])=>{
                res.redirect('/addmanager');
            }).catch((error: any) => next(error));
        }).catch((error: any) => next(error));
    })
   .catch((error: any) => next(error));
});

accountRouter.post('/login',(req: Request, res: Response, next: NextFunction)=>{
    var email = req.body.email;
    var password = req.body.password
    getUsersByEmail(email)
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



accountRouter.put('/', (req: Request, res: Response) => {
    res.send('Got a PUT request at /cars');
});

accountRouter.delete('/', (req: Request, res: Response) => {
    res.send('Got a DELETE request at /cars');
});

