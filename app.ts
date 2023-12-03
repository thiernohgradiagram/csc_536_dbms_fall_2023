import {Express, Request, Response} from 'express-serve-static-core';
import {mercedesRouter} from './mercedes/mercedesController';
import { accountRouter } from './account/accountController';
import { branchRouter } from './branch/branchController';
import {httpReqLogger, printCurrentDate} from './middlewares/custom-middlewares/http-request-logger';
import {httpErrorHandlerV1} from './middlewares/custom-middlewares/http-error-handler';
import {expressDotJsonOptions} from './middlewares/built-in-middleware-config/express.Json.config';
import {expressDotStaticOptions} from './middlewares/built-in-middleware-config/express.static.config';
import debug, { Debugger } from 'debug';
import express, { NextFunction } from 'express';
import path from 'path';
import config from 'config';
import { getUsersByEmail } from './account/accountService';
import { FieldPacket, RowDataPacket } from 'mysql2';
import { User } from './account/user';
import { getAllBranches } from './branch/branchService';


const startupDebugger: Debugger = debug('app:startup');
const dbDebugger: Debugger = debug('app:db');
var parser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app: Express  = express();

const port = process.env.PORT || 3000;

// set ejs as view engine 
app.set('views','views');
app.set('view engine','ejs');

// setting up body parser
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// set session and cookie
declare global {
  namespace Express {
    interface Session {
    user?: any,
    occupation?: string
    }
  }
}

app.use(session({
  secret : 'secrete',
  resave: false,
  cookie: { maxAge: 60*60*24 },
  saveUninitialized: true,
  user:{}
}));



app.use(cookieParser());
// Mounting Custom Middlewares into the Request Processing Pipeline
app.use(httpReqLogger, printCurrentDate);

// Mounting Third-Party Middlewares into the Request Processing Pipeline

// Mounting Built-In Middlewares into the Request Processing Pipeline
app.use('/csc536', express.static(path.join(__dirname, 'public'), expressDotStaticOptions)); // http://localhost:3000/csc536/members.txt
app.use(express.json(expressDotJsonOptions));
app.use(express.static("public"));
// Mounting HTTP route handlers (middlewares) into the Request Processing Pipeline
app.use('/csc536/api/mercedes', mercedesRouter);
app.use('/api/account',accountRouter);
app.use('/api/branch',branchRouter);


app.get('/hi', (req: Request, res: Response) => res.send('Hello World!'));

app.get('/login',function(req,res){
      res.render('login/login');
});

app.get('/register',function(req, res){
   
  res.render('registration/registration');
});

app.get('/profile',(req: Request, res: Response, next: NextFunction)=>{
  var email:string = "";
  if (req.query.email!=undefined){
    email = req.query.email?.toString();
  }
   
  getUsersByEmail(email)
.then((result: [RowDataPacket[], FieldPacket[]])=>{
  var data = result[0][0];
  res.render('account/account.ejs');
}).catch((error:any)=>next(error));
  

 
});

app.get('/mainpage',(req: Request, res: Response, next: NextFunction)=>{
  var email:string = "";
  if (req.query.email!=undefined){
    email = req.query.email?.toString();
  }
   
  getUsersByEmail(email)
.then((result: [RowDataPacket[], FieldPacket[]])=>{
  var data = result[0][0];
  res.render('mainpage/mainpage.ejs');
}).catch((error:any)=>next(error));
});

app.get('/addbranch',(req: Request, res: Response, next: NextFunction)=>{
    session.user="gyanko";
    
res.render('branch/addbranch.ejs');
});

app.get('/purchase',(req: Request, res: Response, next: NextFunction)=>{
  var email:string = "";
  if (req.query.email!=undefined){
    email = req.query.email?.toString();
  }
   
  getUsersByEmail(email)
.then((result: [RowDataPacket[], FieldPacket[]])=>{
  var data = result[0][0];
  res.render('branch/addbranch.ejs');
}).catch((error:any)=>next(error));

});

app.get('/branch',(req: Request, res: Response, next: NextFunction)=>{
  
  getAllBranches()
.then((result: [RowDataPacket[], FieldPacket[]])=>{
  const [data] = result as RowDataPacket[]; 
  
  res.render('branch/branch.ejs',{branches:data});
}).catch((error:any)=>next(error));

});

app.get('/mercedes',(req: Request, res: Response, next: NextFunction)=>{
  var email:string = "";
  if (req.query.email!=undefined){
    email = req.query.email?.toString();
  }
   
  getUsersByEmail(email)
.then((result: [RowDataPacket[], FieldPacket[]])=>{
  var data = result[0][0];
  res.render('mercedes/mercedes.ejs');
}).catch((error:any)=>next(error));

});



app.use(httpErrorHandlerV1);

app.listen(port, () => {
  startupDebugger(`App Listening on port ${port}...`);
  startupDebugger(`process.env.NODE_ENV -> ${process.env.NODE_ENV}`);
  startupDebugger("app.get('env') -> ", app.get('env'));
  startupDebugger(config.get('name'));
  startupDebugger(config.get('mail.host'));
  startupDebugger(config.get('mail.password'));
  dbDebugger("Connecting to mysql Database");
});