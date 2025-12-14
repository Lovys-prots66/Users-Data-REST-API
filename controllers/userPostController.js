import { parseBody } from "../utils/parseBody.js";
import { sendError } from "../utils/sendError.js";
import { responses } from "../config/responses.js";
import insert from "../models/post.js";
import { sendResult } from "../utils/sendResult.js";

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

        });
    }

    static async addUser(req,res){
        const { http, errors } = responses;
        try {
            const data = parseBody(req);

            const validationError = this.validate(data);

            if(validationError){
                sendError(res, http.BAD_REQUEST, validationError);
            }

            const [newUser] = insert.addUser(data);

            sendResult(res, http.CREATED, newUser, "max-age=3600");

        } catch (error) {
            if(error.message = "ERR_DUP_ENTITY"){
                sendError(res, http.CONFLICT, errors.DUPLICATE);
            }

            sendError(res, http.SERVER_ERROR, error.message);
        }
    }
}

export default userAddController;