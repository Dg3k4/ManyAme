const ApiError = require("../error/ApiError")
const tokenService = require("../service/user/token-service")

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            next(ApiError.unauthorized("Unauthorized"));
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            next(ApiError.unauthorized("Unauthorized"));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            next(ApiError.unauthorized("Unauthorized"));
        }

        req.user = userData;
        next();
    } catch (e) {
        next(ApiError.unauthorized(e.message))
    }
}