import { responses } from "../config/responses.js";
import remove from "../models/delete.js";
import { sendResult, sendError } from "../utils/senders.js";

class userDeleteController {
    static async delete(id, res){
        const { http, errors } = responses;

        try {
            const userId = id;

            const user = await remove.removeUser(userId);

            if(!user){
                return sendError(res, http.NOT_FOUND, errors.USER_NOT_FOUND);
            }

            sendResult(res, http.SUCCESS, user);

        } catch (error) {
            sendError(res, http.SERVER_ERROR, errors.INTERNAL);
        }
    }
}

export default userDeleteController;