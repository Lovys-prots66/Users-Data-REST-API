import getUser from "../models/get.js"
import { responses } from "../config/responses.js";
import { sendError } from "../utils/sendError.js";
import { sendResult } from "../utils/sendResult.js"

class userReadController {

    static async getAllUsers(res){

        const { http, cache_age } = responses;
        
        try{
            const [users] = await getUser.allUsers();
            sendResult(res, http.SUCCESS, users, cache_age);
        }catch(err){
            sendError(res, http.SERVER_ERROR, err.message);
        }
    }
    
    static async getSpecific(id, res) {
        
        const { http, errors } = responses;

        try {
            const [user] = await getUser.getSingle(id);
            if(!user){
                sendError(res, http.NOT_FOUND, errors.NOT_FOUND);
            }

            sendResult(res, http.SUCCESS, user[0], cache_age);
        } catch (error) {
            sendError(res, http.SERVER_ERROR, err.message);
        }
    }
}

export default userReadController;