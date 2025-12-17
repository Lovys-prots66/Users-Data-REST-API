import { loadEnvFile } from "node:process"

loadEnvFile()

const configuration = {

    server: [
        {HOST: process.env.HOST},
        {PORT: process.env.PORT}
    ],

    database : {
        DB_NAME : process.env.DB_NAME,
        DB_USER : process.env.DB_USER,
        DB_PSW : process.env.DB_PASSWORD,
        DB_HOST : process.env.DB_HOST
    }
}

export default configuration;