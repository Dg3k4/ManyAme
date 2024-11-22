const ApiError = require("../error/ApiError")
const tokenService = require("../service/user/token-service");
const commentsService = require("../service/comments/comments-service")

class CommentsController {
    async addComment(req, res, next) {
        try {
            const {animeId} = req.params
            const {comment} = req.body
            const token = req.headers.authorization
            const userId = await tokenService.userIdFromToken(token)

            const createComment = await commentsService.setComment(userId, animeId, comment)
            return res.json(createComment)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async takeAnimeComments(req, res, next) {
        try {
            const {animeId} = req.params
            const animeComments = await commentsService.giveAllAnimeComments(animeId)

            return res.json(animeComments)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new CommentsController()