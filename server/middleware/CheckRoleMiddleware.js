const ApiError = require("../error/ApiError")
const tokenService = require("../service/user/token-service")

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
            return;
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "User not authorized" });
            }
            const decoded = tokenService.validateAccessToken(token);
            console.log(decoded.roleIds)
            if (!decoded.roleIds.includes(role)) {
                return res.status(403).json({ message: "No access" });
            }
            req.user = decoded;
            next();
        } catch (e) {
            ApiError.unauthorized(e.message)
        }
    };
}