import userReadController from "../controllers/userGetController.js";
import userPostController from "../controllers/userPostController.js";
import userUpdateController from "../controllers/userUpdateController.js";
import userDeleteController from "../controllers/userDeleteController.js";

import configuration from "../config/config.js"

async function userRouterV1(req, res){

  const { endpoints } = configuration;
  const { v1_1, v1_2 } = endpoints;

  switch (req.method){
    
    case "GET":
      
      if(req.url.match(v1_1)){

        const userId = parseInt(req.url.split('/').pop());
        
        return await userReadController.getSpecific(userId, res);      
      }
        
      if(req.url.match(v1_2)){
        return await userReadController.getAllUsers(res);
      }

    case "POST":

      if(req.url.match(v1_2)){            
        return await userPostController.addUser(req, res);
      }
      

      break;
      
      case "PUT":
        
        if(req.url.match(v1_1)){
        const id = parseInt(req.url.split("/")[4]);
        
        return await userUpdateController.updateUser(id, req, res);
      }

      break;

      case "DELETE":
        
        if(req.url.match(v1_1)){
        const userId = parseInt(req.url.split('/').pop());
        return await userDeleteController.delete(userId, res);
      }

      break;
  }
    
}

export default userRouterV1;