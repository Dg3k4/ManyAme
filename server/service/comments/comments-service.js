const {User} = require("../../models/user")
const {Comments} = require("../../models/comments")
const {Anime} = require("../../models/anime");
const ApiError = require("../../error/ApiError");

class CommentsService {
    async setComment(userId, animeId, comment) {
        const user = await User.findOne({where: {id: userId}});
        const anime = await Anime.findOne({where: {id: animeId}});
        if (!anime) {
            throw ApiError.badRequest("This anime does not found")
        }
        if (!user) {
            throw ApiError.badRequest("This user does not found")
        }

        const newComment = await Comments.create({userId: userId, animeId: animeId, comment: comment})
        return newComment
    }

    async giveAllAnimeComments(animeId) {
        const animeComments = await Comments.findAll({where: {animeId: animeId}})
        return animeComments
    }
}

module.exports = new CommentsService()