import userReadController from "../controllers/userGetController.js";
import userPostController from "../controllers/userPostController.js";
import userUpdateController from "../controllers/userUpdateController.js";
import userDeleteController from "../controllers/userDeleteController.js";

import configuration from "../config/config.js"

async function userRouterV2(req, res){
    const { endpoints } = configuration;
    const { v2 } = endpoints;

    const url = new URL(req.url, `http://${req.headers.host}`);

    switch (req.method){
        case "GET":
            
            if(url.pathname === v2 && url.searchParams.get("userId")){

                const userId = parseInt(url.searchParams.get("userId"));
                
                return await userReadController.getSpecific(userId, res);      
            }
                
            if(url.searchParams.get("userId") === null && url.pathname === v2){
                return await userReadController.getAllUsers(res);
            }

            break;
        case "POST":

            if(url.pathname == v2){            
                return await userPostController.addUser(req, res);
            }
            

            break;
        
        case "PUT":
            
            if(url.searchParams.get("userId")){
                const id = parseInt(url.searchParams.get("userId"));
                
                return await userUpdateController.updateUser(id, req, res);
            }

            break;

        case "DELETE":
            
            if(url.searchParams.get("userId")){
                const userId = parseInt(url.searchParams.get("userId"));
                return await userDeleteController.delete(userId, res);
            }

            break;
    }
}

export default userRouterV2