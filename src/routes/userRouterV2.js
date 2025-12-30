import userReadController from "../controllers/userGetController.js";
import userPostController from "../controllers/userPostController.js";
import userUpdateController from "../controllers/userUpdateController.js";
import userDeleteController from "../controllers/userDeleteController.js";

import configuration from "../config/config.js"
import { sendError } from "../utils/senders.js";
import { setHeaders } from "../utils/setHeaders.js";

async function userRouterV2(req, res, url){
    const { endpoints } = configuration;
    const { v2 } = endpoints;

    const pathname = url.pathname;
    const userId = url.searchParams.get("userId");

    setHeaders(res);

    switch (req.method){
        case "GET":
            
            if(pathname === v2 && userId){                
                return await userReadController.getSpecific(userId, res);      
            }
                
            if(userId === null && pathname === v2){
                return await userReadController.getAllUsers(res);
            }

            break;
        case "POST":

            if(pathname == v2){            
                return await userPostController.addUser(req, res);
            }
            

            break;
        
        case "PUT":
            
            if(pathname === v2 && userId){                
                return await userUpdateController.updateUser(userId, req, res);
            }

            break;

        case "DELETE":
            
            if(pathname === v2 && userId){
                return await userDeleteController.delete(userId, res);
            }

            break;
        
        case "HEAD":

            if(pathname === v2){
                res.writeHead(200);
                return res.end();
            }

            break;
            
        default:
            sendError(res, 405, "Method Not Allowed or Not Supported");
            break;
    }
}

export default userRouterV2