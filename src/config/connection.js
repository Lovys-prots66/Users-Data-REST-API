import mysql from "mysql2/promise";
import configuration from "./config.js";

async function getDBConnection() {

    const { database } = configuration;

    const pool = mysql.createPool({
        host : database.DB_HOST,
        user : database.DB_USER,
        password : database.DB_PSW,
        database : database.DB_NAME,
        connectionLimit : 10
    });

    const con = await pool.getConnection();

    return con;
}

export default getDBConnection;