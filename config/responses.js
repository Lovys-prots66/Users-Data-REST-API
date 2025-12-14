export const responses = {
    http : {
        SUCCESS : 200,
        CREATED : 201,
        BAD_REQUEST : 400,
        FORBIDDEN: 403,
        NOT_FOUND : 404,
        CONFLICT : 409,
        SERVER_ERROR : 500
    },

    errors : {
        NOT_FOUND : "Ressource not found",
        DUPLICATE : "User already exists",
        INTERNAL : "Something went wrong"
    }
}