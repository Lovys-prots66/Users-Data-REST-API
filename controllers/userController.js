import getUser from "../models/get.js"
import { responses } from "../config/responses.js";
import { sendError } from "../utils/sendError.js";
import { sendResult } from "../utils/sendResult.js"

class userReadController {

    cache = "max-age=3600";

    static async getAllUsers(res){

        const { http } = responses;
        
        try{
            const [users] = await getUser.allUsers();
            sendResult(res, http.SUCCESS, users, cache);
        }catch(err){
            sendError(res, http.SERVER_ERROR, err.message);
        }
    }
    
    static async getSpecific(req, res) {
        
        const { http, errors } = responses;

        try {
            const [user] = getUser.getSingle(req.params.id);
            if(!user){
                sendError(res, http.NOT_FOUND, errors.NOT_FOUND);
            }

            sendResult(res, http.SUCCESS, user[0], cache);
        } catch (error) {
            sendError(res, http.SERVER_ERROR, err.message);
        }
    }
}

export default userGetController;