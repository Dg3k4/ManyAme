const {Rating} = require("../models/rating")
const ratingService = require("../service/rating/rating-service")
const tokenService = require("../service/user/token-service")
const ApiError = require("../error/ApiError")

class RatingController {
    async setRating(req, res, next) {
        try {
            const {animeId, rating} = req.body
            const token = req.headers.authorization
            const userId = await tokenService.userIdFromToken(token)

            const addRating = await ratingService.addAnimeRating(userId, animeId, rating)

            return res.json(`Add new rating ${rating}, to anime - ${addRating.title}. Now average rating is ${addRating.rating}`)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RatingController()