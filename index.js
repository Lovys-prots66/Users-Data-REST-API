import { createServer } from "node:http"
import userRouter from "./routes/userRoutes.js";
import { loadEnvFile } from "node:process";

loadEnvFile()

//import environment variables from .env
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

// create a server
const server = createServer( async (req, res) => {
  
  res.end(await userRouter(req, res));
    // if(req.url === "/"){
    //     res.writeHead(200, {"content-type" : "application/json"});
    // }
})

server.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/api/users`);
})