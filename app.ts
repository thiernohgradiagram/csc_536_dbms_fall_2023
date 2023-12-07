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
import "core-js";
import path from 'path';
import config from 'config';
import { getAllUsers, getUsersByEmail } from './account/accountService';
import { FieldPacket, RowDataPacket } from 'mysql2';
import { User } from './account/user';
import { getAllBranches, getAllMercedesByManagerEmail, getAllUsersWithoutBranch, getBranchesWithoutManagers } from './branch/branchService';
import { getAllMercedes, getBranchAndMercedesCount, getBranchAndSaleCount, getMercedesByVinNumber, getModelAndCount, getModelAndSaleCount, getStatsCount } from './mercedes/mercedesService';
import { Session } from 'express-session';


const startupDebugger: Debugger = debug('app:startup');
const dbDebugger: Debugger = debug('app:db');
var parser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require("multer");
const app: Express  = express();
const flash = require('connect-flash');
const port = process.env.PORT || 3000;

// set ejs as view engine 
app.set('views','views');
app.set('view engine','ejs');

// setting up body parser
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

declare module 'express-session' {
       interface SessionData {
           email:string,
           role : string
       }
   }

app.use(session({
  secret : 'secrete',
  resave: false,
  cookie: { maxAge: 60*60*60*24 },
  saveUninitialized: true,
  user:{}
}));
const upload = multer({dest:"public/assets/images"})

app.use(flash());

app.use(cookieParser());
// Mounting Custom Middlewares into the Request Processing Pipeline
app.use(httpReqLogger, printCurrentDate);
app.use(function(req,res,next){
  res.locals.message = req.flash();
  next();
})
// Mounting Third-Party Middlewares into the Request Processing Pipeline

// Mounting Built-In Middlewares into the Request Processing Pipeline
app.use('/csc536', express.static(path.join(__dirname, 'public'), expressDotStaticOptions)); // http://localhost:3000/csc536/members.txt
app.use(express.json(expressDotJsonOptions));
app.use(express.static("public"));
// Mounting HTTP route handlers (middlewares) into the Request Processing Pipeline
app.use('/api/mercedes', mercedesRouter);
app.use('/api/account',accountRouter);
app.use('/api/branch',branchRouter);

var email = "";
app.get('/hi', (req: Request, res: Response) => res.send('Hello World!'));

app.get('/mainpage',(req: Request, res: Response, next: NextFunction)=>{
  var email:string = "";
  if (req.query.email!=undefined){
    email = req.query.email?.toString();
  }});

app.get('/login',function(req,res){
      
      res.render('login/login');
});

app.get('/register',function(req, res){
   
  res.render('registration/registration');
});

app.get('/profile',(req: Request, res: Response, next: NextFunction)=>{
  var email ="";
  if(req.session.email !=null){
    email = req.session.email?.toString();
  } 
  getUsersByEmail(email)
.then((result: [RowDataPacket[], FieldPacket[]])=>{
  const [data] = result as RowDataPacket[];

  var role = req.session.role;
  res.render('account/account.ejs',{user_data:data[0],user_email:email,user_role:role});
}).catch((error:any)=>next(error));
  
});


app.get('/branch',(req: Request, res: Response, next: NextFunction)=>{
  
getAllBranches()
.then((result: [RowDataPacket[], FieldPacket[]])=>{
  const [data] = result as RowDataPacket[]; 
  var role = req.session.role;
  res.render("branch/branch.ejs",{branches:data,user_role:role})
}).catch((error:any)=>next(error));

});



app.get('/managebranch',(req: Request, res: Response, next: NextFunction)=>{
  var email = "";
  var new_branch = "";
  if(req.session.email!=null){
    email = req.session.email.toString();
  }
  getAllMercedesByManagerEmail(email)
  .then((result: [RowDataPacket[], FieldPacket[]])=>{
    const [data] = result as RowDataPacket[];
    var value = JSON.parse(JSON.stringify(data,null,2))

    var values = value.group((mercedes:any)=>{
        return mercedes.vin_number;
    })
    var role = req.session.role;
    if(data[0].vin_number == null){
      new_branch = "yes"
    }
    console.log(data[0])
    res.render('branch/managebranch.ejs',{new_branch:new_branch,mercedes:values,user_role:role,branch_id:data[0]['branch_id']});
  }).catch((error:any)=>next(error))
  
});

app.get('/addmanager',(req: Request, res: Response, next: NextFunction)=>{
      getBranchesWithoutManagers()
      .then((result:[RowDataPacket[], FieldPacket[]])=>{
        const [branches] = result as RowDataPacket[]; 
        var role = req.session.role;
          res.render("account/addmanager.ejs",{branches:branches,user_role:role});
        }).catch((error:any)=>next(error))
});



app.get('/mercedes',(req: Request, res: Response, next: NextFunction)=>{
  getAllMercedes()
        .then((result: [RowDataPacket[], FieldPacket[]])=> {
            const [data] = result as RowDataPacket[];     
            var values = data.group((value:any)=>{
              return value.vin_number;
            })      
            var role = req.session.role;                  
            res.render("mercedes/mercedes.ejs",{mercedes:values,user_role:role});
        }).catch((error: any) => next(error));

});

app.get('/purchase',(req:Request,res:Response,next:NextFunction)=>{
    var vin_number  = ""
    var email = req.session.email;
    var role = req.session.role;
    if(req.query.vin != null){
      vin_number = req.query.vin.toString();
    }
    console.log(vin_number)
    getMercedesByVinNumber(vin_number)
    .then((result: [RowDataPacket[], FieldPacket[]])=>{
      const [data] = result as RowDataPacket[];
      var mercedes = data.group((element:any)=>{
        return element.vin_number
      })
      
      res.render('purchase/purchase.ejs',{vin:vin_number,mercedes:mercedes,user_email:email,user_role:role});
    })

    
})

app.use('/graph',(req:Request,res:Response,next:NextFunction)=>{
  var branch_names:any = [];
  var branch_count:any = [];

  var model_names:any = [];
  var model_count:any = [];

  var branch_sales_names:any = [];
  var branch_sales_count:any = [];

  var model_sales_names:any =[];
  var model_sales_count:any =[];

  getBranchAndMercedesCount()
  .then((result: [RowDataPacket[], FieldPacket[]])=>{
    const [data] = result as RowDataPacket[];
    for(var i =0; i<data.length;i++){
      branch_names.push(data[i]['branch_name']);
      branch_count.push(data[i]['count']);
    }

    getModelAndCount()
    .then((result: [RowDataPacket[], FieldPacket[]])=>{
      const [data] = result as RowDataPacket[];
      for(var i =0; i<data.length;i++){
      model_names.push(data[i]['model']);
      model_count.push(data[i]['count']);
      }

      getBranchAndSaleCount()
      .then((result: [RowDataPacket[], FieldPacket[]])=>{
      const [data] = result as RowDataPacket[];
      for(var i =0; i<data.length;i++){
      branch_sales_names.push(data[i]['branch_name']);
      branch_sales_count.push(data[i]['count']);
      }
      getModelAndSaleCount()
      .then((result: [RowDataPacket[], FieldPacket[]])=>{
        const [data] = result as RowDataPacket[];
        for(var i =0; i<data.length;i++){
        model_sales_names.push(data[i]['model']);
        model_sales_count.push(data[i]['count']);
        }
        getStatsCount()
        .then((result: [RowDataPacket[], FieldPacket[]])=>{
          const [data] = result as RowDataPacket[];
          var email = req.session.email;
          var role = req.session.role;
          res.render("graph/graph.ejs",{user_email:email,user_role:role,stats:data,msale_names:model_sales_names,msale_count:model_sales_count,branch_sales:branch_sales_names,branch_sales_count:branch_sales_count,models:model_names,model_count:model_count,branch_names:branch_names,branch_count:branch_count})
        })
        
      })
     
      })
    
      
    })
    
  })
  
})


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