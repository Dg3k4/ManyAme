const {AnimeRelease, AnimeGenreTitle, AnimeStatus, AnimeList, AnimeMPAA, AnimeStudioTitle, AnimeType, AnimeGenre,
    AnimeStudio
} = require("../models/anime")
const ApiError = require("../error/ApiError")

class InfoController {
    async createStatus(req, res, next) {
        try {
            const statuses = ["Выходит", "Вышло"]
            const initializeStatuses = await Promise.all(
                statuses.map(async (i) => await AnimeStatus.create({animeStatus: i}))
            )

            return res.json(initializeStatuses)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createRelease(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createType(req, res, next) {
        try {
            const {animeType} = req.body
            const create = await AnimeType.create({animeType: animeType})

            return res.json(create)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createMPAA(req, res, next) {
        try {
            const MPAA = ["G", "PG", "PG-13", "R", "NC-17"]
            const initializeMPAA = await Promise.all(
                MPAA.map(async (i) => await AnimeMPAA.create({animeMPAA: i}))
            )

            return res.json(initializeMPAA)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createGenre(req, res, next) {
        try {
            const animeGenre = req.body
            const createGenre = await AnimeGenreTitle.create(animeGenre)

            return res.json(createGenre)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createStudio(req, res, next) {
        try {
            const animeStudio = req.body
            const createStudio = await AnimeStudioTitle.create(animeStudio)

            return res.json(createStudio)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveStatuses(req, res, next) {
        try {
            const statuses = await AnimeStatus.findAll()
            return res.json(statuses)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveGenres(req, res, next) {
        try {
            const genres = await AnimeGenreTitle.findAll()
            return res.json(genres)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveMPAA(req, res, next) {
        try {
            const statuses = await AnimeMPAA.findAll()
            return res.json(statuses)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveStatuses(req, res, next) {
        try {
            const statuses = await AnimeStatus.findAll()
            return res.json(statuses)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveStatuses(req, res, next) {
        try {
            const statuses = await AnimeStatus.findAll()
            return res.json(statuses)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveStatuses(req, res, next) {
        try {
            const statuses = await AnimeStatus.findAll()
            return res.json(statuses)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new InfoController()