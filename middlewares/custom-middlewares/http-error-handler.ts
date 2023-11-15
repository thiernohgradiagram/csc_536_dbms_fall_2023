import {Request, Response, NextFunction} from 'express-serve-static-core';

/** Errors from synchronous function vs Errors from asynchronous function 
 * Errors that occur in synchronous code inside route handlers and middleware require no extra work.
 * If synchronous code throws an error, then Express will catch and process it.
 * 
 * For errors returned from asynchronous functions invoked by route handlers and middleware,
 * you must pass them to the next() function, where Express will catch and process them.
 */
export function httpErrorHandlerV1(error: any, req: Request, res: Response, next: NextFunction) {
    // 1> log the exception to the console, file, the cloud via api request
    console.log(error);

    // 2> handle the exception
    res.status(500).send('Something Failed on the server side!');
    next();
}

