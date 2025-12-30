import { loadEnvFile } from "node:process"

loadEnvFile()

const configuration = {

    http : {
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        maxReqs : 100,
        windowMs : 60000
    },

    database : {
        DB_NAME : process.env.DB_NAME,
        DB_USER : process.env.DB_USER,
        DB_PSW : process.env.DB_PASSWORD,
        DB_HOST : process.env.DB_HOST
    },

    endpoints : {
        v1_1 : /^\/api\/users\/v1\/([0-9]+)$/,
        v1_2 : "/api/users/v1",
        v2 : "/api/users/v2"
    }
}

export default configuration;