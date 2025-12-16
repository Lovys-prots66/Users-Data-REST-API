import userReadController from "../controllers/userGetController.js";
import userPostController from "../controllers/userPostController.js";
import userUpdateController from "../controllers/userUpdateController.js";
import userDeleteController from "../controllers/userDeleteController.js";

async function userRouter(req, res){

  switch (req.method){
    
    case "GET":
      
      if(req.url.match(/\/api\/users\/([0-9]+)/)){

        const userId = req.url.split('/').pop();
       
        if(req.url = '/api/users'){
          return await userReadController.getSpecific(userId, res);                
        }
      
      }
        

      return await userReadController.getAllUsers(res);

    case "POST":

      if(req.url = '/api/users'){            
        return await userPostController.addUser(req, res)
      }
      

      break;
    
    case "PUT":
      
      if(req.url.match(/\/api\/users\/([0-9]+)/)){
        // let id = parseInt(req.url.split("/")[3]);
        
        return await userUpdateController.updateUser(req, res);
      }
      break;

    case "DELETE":

      if(req.url.match(/\/api\/users\/([0-9]+)/)){
        return await userDeleteController.delete(req, res);
      }

      break;
  }
    
}

export default userRouter;