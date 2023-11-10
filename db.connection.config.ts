import dotenv from 'dotenv';
import { PoolOptions } from 'mysql2/typings/mysql/lib/Pool';
import {Pool as PromisePool} from 'mysql2/promise';
import mysql from 'mysql2';

dotenv.config();

// create the connection pool to the database
const poolOptions: PoolOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

    /**
   * Determines the pool's action when no connections are available and the limit has been reached.
   * If true, the pool will queue the connection request and call it when one becomes available.
   * If false, the pool will immediately call back with an error.
   * (Default: true)
   */
    waitForConnections: true,
    connectionLimit: 10,        // The maximum number of connections to create at once. (Default: 10)
    maxIdle: 10,                // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000,         // idle connections timeout, in milliseconds, the default value 60000

    /**
   * The maximum number of connection requests the pool will queue before returning an error from getConnection.
   * If set to 0, there is no limit to the number of queued connection requests. (Default: 0)
   */
    queueLimit: 0,              
    enableKeepAlive: true,      // Enable keep-alive on the socket. (Default: true)
    keepAliveInitialDelay: 0    // If keep-alive is enabled users can supply an initial delay. (Default: 0)
};

export const pool: PromisePool = mysql.createPool(poolOptions).promise();