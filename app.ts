import {Express, Request, Response} from 'express-serve-static-core';
import {mercedesRouter} from './mercedes/mercedesController';
import {httpReqLogger, printCurrentDate} from './middlewares/custom-middlewares/http-request-logger';
import {httpErrorHandlerV1} from './middlewares/custom-middlewares/http-error-handler';
import {expressDotJsonOptions} from './middlewares/built-in-middleware-config/express.Json.config';
import {expressDotStaticOptions} from './middlewares/built-in-middleware-config/express.static.config';
import debug, { Debugger } from 'debug';
import express from 'express';
import path from 'path';
import config from 'config';

const startupDebugger: Debugger = debug('app:startup');
const dbDebugger: Debugger = debug('app:db');
const app: Express  = express();
const port = process.env.PORT || 3000;

// Mounting Custom Middlewares into the Request Processing Pipeline
app.use(httpReqLogger, printCurrentDate);

// Mounting Third-Party Middlewares into the Request Processing Pipeline

// Mounting Built-In Middlewares into the Request Processing Pipeline
app.use('/csc536', express.static(path.join(__dirname, 'public'), expressDotStaticOptions)); // http://localhost:3000/csc536/members.txt
app.use(express.json(expressDotJsonOptions));

// Mounting HTTP route handlers (middlewares) into the Request Processing Pipeline
app.use('/csc536/api/mercedes', mercedesRouter);
app.get('/hi', (req: Request, res: Response) => res.send('Hello World!'));


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