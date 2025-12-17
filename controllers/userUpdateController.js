import { parseBody } from "../utils/parseBody.js";
import { responses } from "../config/responses.js";
import { sendResult, sendError } from "../utils/senders.js";
import update from "../models/put.js";

class userUpdateController{

    static validate(data){
        return new Promise((resolve, reject) => {
            
            const {first_name, last_name, email, zip} = data;

            if( !first_name || !last_name || !email || !zip){
                reject("All fields are required");
            }

            if(!data.email.includes("@")){
                reject("Invalid Email");
            }

            resolve(null);
        });
    }

    static async updateUser(id, req, res){
        const { http, errors } = responses;
        try {
            const data = await parseBody(req);

            const validationError = await this.validate(data);

            if(validationError){
                sendError(res, http.BAD_REQUEST, validationError);
            }

            const updated = await update.updateUser(data, id);

            return sendResult(res, http.CREATED, updated);

        } catch (error) {
            return sendError(res, http.SERVER_ERROR, errors.INTERNAL);
        }
    }
}

export default userUpdateController;