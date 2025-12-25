import { createServer } from "node:http"
import userRouterV1 from "./src/routes/userRoutesV1.js";
import userRouterV2 from "./src/routes/userRouterV2.js";
import { loadEnvFile } from "node:process";
import { configDotenv } from "dotenv";

import configuration from "./src/config/config.js";

configDotenv();

//import environment variables from .env
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

const {endpoints} = configuration
const {v1, v2} = endpoints

// create a server
const server = createServer( async (req, res) => {

  if(req.url.match(v1)){
    return await userRouterV1(req, res);
  }
  
  if(req.url.has(v2)){

  return await userRouterV2(req, res);
  }
});

server.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/api/users/v1`);
    console.log(`http://${HOST}:${PORT}/api/users/v2`);
})