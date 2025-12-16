import { parseBody } from "../utils/parseBody.js";
import { responses } from "../config/responses.js";
import insert from "../models/post.js";
import { sendResult, sendError } from "../utils/senders.js";

class userAddController{
    static validate(data){
        return new Promise((resolve, reject) => {
            
            const {id, first_name, last_name, email, zip} = data;

            if(!id || !first_name || !last_name || !email || !zip){
                reject("All fields are required");
            }

            if(!data.email.includes("@")){
                reject("Invalid Email");
            }
            resolve(null);

        });
    }

    static async addUser(req,res){
        const { http, errors } = responses;
        try {
            const data = await parseBody(req);

            const validationError = await this.validate(data);

            if(validationError){
                return sendError(res, http.BAD_REQUEST, validationError);
            }

            const newUser = await insert.addUser(data);

            sendResult(res, http.CREATED, newUser);

        } catch (error) {
            if(error.message === "ERR_DUP_ENTITY"){
                return sendError(res, http.CONFLICT, errors.DUPLICATE);
            }

            return sendError(res, http.SERVER_ERROR, error.message);
        }
    }
}

export default userAddController;