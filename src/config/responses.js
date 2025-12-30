export const responses = {
    http : {
        SUCCESS : 200,
        CREATED : 201,
        BAD_REQUEST : 400,
        FORBIDDEN: 403,
        NOT_FOUND : 404,
        CONFLICT : 409,
        LIMIT_REACHED : 429,
        SERVER_ERROR : 500
    },

    cache_age : "max-age=3600",

    errors : {
        NOT_FOUND : "Ressource not found",
        DUPLICATE : "User already exists",
        LIMIT : "Request limit reached, retry after one minute",
        INTERNAL : "Something went wrong"
    }
}