import userReadController from "../controllers/userGetController.js";
import userPostController from "../controllers/userPostController.js";
import userUpdateController from "../controllers/userUpdateController.js";
import userDeleteController from "../controllers/userDeleteController.js";

import configuration from "../config/config.js"
import { sendError } from "../utils/senders.js";
import { setHeaders } from "../utils/setHeaders.js";

async function userRouterV1(req, res, url){

  const { endpoints } = configuration;
  const { v1_1, v1_2 } = endpoints;

  const pathname = url.pathname;

  setHeaders(res);

  switch (req.method){
    
    case "GET":
      
      if(pathname.match(v1_1)){

        const userId = parseInt(pathname.split('/').pop());
        
        return await userReadController.getSpecific(userId, res);      
      }
        
      if(pathname.match(v1_2)){
        return await userReadController.getAllUsers(res);
      }

    case "POST":

      if(pathname.match(v1_2)){            
        return await userPostController.addUser(req, res);
      }
      

      break;
      
      case "PUT":
        
        if(pathname.match(v1_1)){
          const id = parseInt(pathname.split("/")[4]);
          
          return await userUpdateController.updateUser(id, req, res);
        }

      break;

      case "DELETE":
        
        if(pathname.match(v1_1)){
          const userId = parseInt(pathname.split('/').pop());
          return await userDeleteController.delete(userId, res);
        }

      break;

      case "HEAD":
        
        if(pathname.match(v1_2)){
          res.writeHead(200);
          return res.end();
        }

        break;
        
      default:
        return sendError(res, 405, "Method Not Allowed");
  }
    
}

export default userRouterV1;