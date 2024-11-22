const ApiError = require("../error/ApiError")
const tokenService = require("../service/user/token-service")
const listService = require("../service/list/list-service")

class ListController {
    async createList(req, res, next) {
        try {
            const token = req.headers.authorization
            const userId = await tokenService.userIdFromToken(token)

            const newList = await listService.createAnimeList(userId)
            return res.json(newList)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new ListController()