import { parseBody } from "../utils/parseBody.js";
import { sendError } from "../utils/sendError.js";
import { responses } from "../config/responses.js";
import insert from "../models/post.js";
import { sendResult } from "../utils/sendResult.js";
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

        });
    }

    static async updateUser(req,res){
        const { http } = responses;
        try {
            const id = req.params.id;

            const data = await parseBody(req);

            const validationError = await this.validate(data);

            if(validationError){
                sendError(res, http.BAD_REQUEST, validationError);
            }

            const [updated] = await update.updateUser(data, id);

            sendResult(res, http.CREATED, updated[0]);

        } catch (error) {
            sendError(res, http.SERVER_ERROR, error.message);
        }
    }
}

export default userUpdateController;