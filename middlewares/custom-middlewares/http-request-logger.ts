import {Request, Response, NextFunction} from 'express-serve-static-core';


export function httpReqLogger(req: Request, res: Response, next: NextFunction) {
    console.log(printInformationAboutAnIncomingRequest(req));
    next();
}

export const printCurrentDate = (req: Request, res: Response, next: NextFunction) => {
    console.log(new Date().toISOString());
    next();
};

function printInformationAboutAnIncomingRequest(req: Request) {
    let info = {
        //app: req.app,
        baseUrl: req.baseUrl,
        body: req.body,
        cookies: req.cookies,
        fresh: req.fresh,
        hostname: req.hostname,
        ip: req.ip,
        ips: req.ips,
        method: req.method,
        originalUrl: req.originalUrl,
        params: req.params,
        path: req.path,
        protocol: req.protocol,
        query: req.query,
        route: req.route,
        secure: req.secure,
        signedCookies: req.signedCookies,
        stale: req.stale,
        subdomains: req.subdomains,
        xhr: req.xhr,    
    };

    return info;
}