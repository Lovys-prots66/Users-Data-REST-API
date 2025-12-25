import userReadController from "../controllers/userGetController.js";
import userPostController from "../controllers/userPostController.js";
import userUpdateController from "../controllers/userUpdateController.js";
import userDeleteController from "../controllers/userDeleteController.js";

import configuration from "../config/config.js"

async function userRouterV1(req, res, url){

  const { endpoints } = configuration;
  const { v1_1, v1_2 } = endpoints;

  const pathname = url.pathname;

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
  }
    
}

export default userRouterV1;