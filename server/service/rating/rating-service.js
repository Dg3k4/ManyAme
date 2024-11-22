const {Rating} = require("../../models/rating")
const {Anime} = require("../../models/anime")
const {User} = require("../../models/user")
const ApiError = require("../../error/ApiError")
const sequelize = require("../../db")

class RatingService {
    async addAnimeRating (userId, animeId, rating) {
        const user = await User.findOne({where: {id: userId}});
        const anime = await Anime.findOne({where: {id: animeId}});
        if (!anime) {
            throw ApiError.badRequest("This anime does not found")
        }
        if (!user) {
            throw ApiError.badRequest("This user does not found")
        }

        return await sequelize.transaction(async (t) => {
            const [newRating, created] = await Rating.findOrCreate({
                where: { userId, animeId },
                defaults: { rate: rating },
                transaction: t,
            });

            if (!created) {
                newRating.rate = rating;
                await newRating.save({ transaction: t });
            }

            const averageRating = await Rating.findOne({
                where: { animeId },
                attributes: [[sequelize.fn('AVG', sequelize.col('rate')), 'avgRating']],
                raw: true,
                transaction: t,
            });

            anime.rating = averageRating.avgRating;
            await anime.save({ transaction: t });

            return anime;
        });

        // const [newRating, created] = await Rating.findOrCreate({
        //     where: {userId: userId, animeId: animeId},
        //     defaults: {rate: rating}
        // });
        // if (!created) {
        //     newRating.rate = rating
        //     await newRating.save()
        // }
        //
        // const allRating = (await Rating.findAll({where: {animeId: animeId}})).map(i => i.rate);
        // console.log(allRating)
        // const averageRating = allRating.reduce((a, b) => a + b, 0) / allRating.length;
        // console.log(`Рейтинг аниме ${anime.title} - ${averageRating}`);
        //
        // anime.rating = averageRating;
        // await anime.save();
        // return anime;
    }
}

module.exports = new RatingService()