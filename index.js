import { createServer } from "node:http"
import { configDotenv } from "dotenv";

import userRouterV1 from "./src/routes/userRoutesV1.js";
import userRouterV2 from "./src/routes/userRouterV2.js";
import rateLimiter from "./src/middlewares/rateLimiter.js";
import sanitizeRequest from "./src/middlewares/sanitizeRequest.js";

import configuration from "./src/config/config.js";

configDotenv();


//import config
const { endpoints, http } = configuration;

const HOST = http.HOST || "localhost";
const PORT = http.PORT || 3000;
const maxReqs = http.maxReqs || 3000;
const windowMs = http.windowMs || 3000;


// create a server
const server = createServer( async (req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`);

  const { v1_1, v1_2, v2 } = endpoints;
  
  sanitizeRequest(req, res, async () => {

    rateLimiter(req, res, {windowMs : windowMs, maxReqs : maxReqs}, async () => {
  
      if(url.pathname.match(v1_1) || url.pathname.match(v1_2)){
        return await userRouterV1(req, res, url);
      }
  
      if(url.pathname === v2){
        return await userRouterV2(req, res, url);
      }
    });

  });

});

// start the server

server.listen(PORT, "0.0.0.0", () => {
  console.log(`http://${HOST}:${PORT}/api/users/v1`);
  console.log(`http://${HOST}:${PORT}/api/users/v2`);
})