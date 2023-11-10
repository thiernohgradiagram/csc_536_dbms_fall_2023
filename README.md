# csc_536_dbms_fall_2023
A Database Application

# Operating System Dependencies:
1. NodeJS v18.17.1
NodeJS or node is an open source and cross-platform runtime environment (a C++ program) for executing javascript code outside of a web browser. Node is not a programmming language nor a framework.
runtime environment:
Before 2009, the only way to execute javascript code was in a web browser.
Indeed, every web browser has a javascript engine that converts javascript code to machine code.
example of javascript engines: Chackra (Edge), SpiderMonkey(Firefox), V8 (Chrome).
In 2009, Ryan Dahl thought of running javascript code outside of the web browser:
so he took Google's v8 JS engines (fastest js engine) and embedded it inside a C++ program, and called that program node.exe => nodejs was born and we refer to it as a runtime environment (a C++ program) for running javascript code outside of a web browser.

2. Nodemon > npm i -g nodemon
3. Typescript > https://www.mailslurp.com/blog/fastest-way-to-start-a-typescript-project/
4. Input Validation with JOI > https://members.codewithmosh.com/courses/293204/lectures/4516859
5. Do I need Express Application Generator? > https://expressjs.com/en/starter/generator.html

### notes
// express examples: https://expressjs.com/en/starter/examples.html
// read the FAQ: https://expressjs.com/en/starter/faq.html
// "start": "set DEBUG=app:startup,app:db && set NODE_ENV=production && set app_password=Hello&&node --loader ts-node/esm src/app.ts",
// https://blog.logrocket.com/configuring-nodemon-with-typescript/

/** 
 * https://expressjs.com/en/resources/middleware.html
 * Express looks up the files in the order in which 
 * you set the static directories with the express.static middleware function.
 * To create a virtual path prefix (where the path does not actually exist in the file system)
 * for files that are served by the express.static function, specify a mount path for the static directory.
 * 
 * NOTE: For best results, use a reverse proxy cache to improve performance of serving static assets.
 * reverse proxy: 
 * https://expressjs.com/en/advanced/best-practice-performance.html#use-a-reverse-proxy
 * https://expressjs.com/tr/guide/behind-proxies.html
 * 
 */

 /**
 * The req (request) and res (response) are the exact same objects that Node provides,
 *  so you can invoke req.pipe(), req.on('data', callback),
 *  and anything else you would do without Express involved.
 */

///////////////////////////////////////// HTTP REQUESTS /////////////////////////////////////////
// app.all('/*', httpReqLogger, printCurrentDate);

//////////////////////////////// APP SETTING TABLE METHODS
// app.disable
// app.disabled
// app.enable
// app.enabled
//app.set('env', 'production');//

// app.get('env') default: development >> uses process.env.NODE_ENV to detect the current environment.
// process.env.NODE_ENV -> // default: undefined
