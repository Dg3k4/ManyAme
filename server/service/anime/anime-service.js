const {Anime, AnimeRelease, AnimeTrailer, AnimeGenreTitle, AnimeGenre, AnimeList, AnimeStudioTitle, AnimeType} = require("../../models/anime");
const ApiError = require("../../error/ApiError");
const {logger} = require("sequelize/lib/utils/logger");
const {Op} = require("sequelize");
const sequelize = require('../../db');

class AnimeService {
    async addOrCreateGenres(animeId, genres) {
        const anime = await Anime.findOne({where: {animeId: animeId}})
        if (!anime) {
            throw ApiError.badRequest("This anime does not found")
        }

        for (const genre in genres) {

        }
    }

    async giveAnimeWithOffset(offset, limit, sort, filters = {}) {
        const genreIdsArray = Array.isArray(filters.genreIds) ? filters.genreIds.map(Number) : [];

        const queryOptions = {
            offset: offset,
            limit: limit,
            order: [],
            include: [
                {
                    model: AnimeRelease,
                    attributes: ["releaseFrom"]
                },
                {
                    model: AnimeType,
                    attributes: ["animeType"]
                },
                {
                    model: AnimeGenreTitle,
                    as: 'anime_genre_titles',
                    attributes: ["animeGenre"],
                    through: { attributes: [] },
                    order: [['animeGenre', 'ASC']]
                }
            ],
            where: {}
        };

        if (genreIdsArray.length) {
            queryOptions.where.id = {
                [Op.in]: sequelize.literal(`(
                SELECT "animeId" 
                FROM "anime_genres" 
                WHERE "anime_genres"."animeGenreTitleId" IN (${genreIdsArray.join(',')})
                GROUP BY "animeId"
            )`)
            };
        }

        if (filters.studioIds) {
            queryOptions.include.push({
                model: AnimeStudioTitle,
                where: { id: filters.studioIds }
            });
        }

        // Настройка сортировки
        if (sort.field === 'rating') {
            queryOptions.order.push(['rating', sort.order]);
        } else if (sort.field === 'releaseDate') {
            queryOptions.order.push([AnimeRelease, 'releaseFrom', sort.order]);
        } else if (sort.field === 'title') {
            queryOptions.order.push(['title', sort.order]);
        } else {
            queryOptions.order.push(['createdAt', sort.order]);
        }

        console.log('Query Options:', queryOptions);

        const findAnime = await Anime.findAll(queryOptions);
        return findAnime;
    }

    async createListAnime(animeId) {
        const newListAnime = await AnimeList.create({animeId: animeId})
        return newListAnime
    }

    async addAnimeToTypeList(animeId, typeListId) {
        const animeList = await AnimeList.findOne({where: {animeId: animeId}})
        const joinAnime = animeList.addType_list(typeListId)
        if (!joinAnime) {
            throw ApiError.badRequest("These user or anime does not found")
        }
        return animeList
    }

    async deleteAnimeFromTypeList(animeId, typeListId) {
        const animeList = await AnimeList.findOne({where:{animeId: animeId}})
        const deleteFromTypeList = animeList.removeType_list(typeListId)

        return deleteFromTypeList
    }
}

module.exports = new AnimeService();
