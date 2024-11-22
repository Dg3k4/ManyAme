const {Anime} = require("../models/anime")
const {AnimeCharacter, CharacterAnime, AnimeActors, Actor, CharactersActors} = require("../models/characters")
const ApiError = require("../error/ApiError")

class CharactersController {
    async addCharacterToAnime(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async addActorToCharacter(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async getAllCharacterAndActorInfo(req, res, next) {
        try {
            const q = await AnimeCharacter.findAll()
            const w = await CharacterAnime.findAll()
            const e = await AnimeActors.findAll()
            const r = await Actor.findAll()
            const t = await CharactersActors.findAll()

            return res.json([{"Персонажи из аниме:":q}, {"Связь у персонажей с аниме:":w}, {"Связи актёров с аниме:":e}, {"Актёры из аниме:":r}, {"Связи у актёров с их персонажами:":t}])
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveCharacterJoints(req, res, next) {
        try {
            const {characterId} = req.params
            const animeIds = (await CharacterAnime.findAll({
                where: {animeCharacterId: characterId},
                attributes: ["animeId"]
            })).map(i => i.animeId)
            const actorIds = (await CharactersActors.findAll({
                where: {animeCharacterId: characterId},
                attributes: ["actorId"]
            })).map(i => i.actorId)
            if (animeIds.length) {
                const sortedAnime = await Anime.findAll({where: {id: animeIds}})
                const actors = await Actor.findAll({where: {id: actorIds}})
                return res.json([{anime: sortedAnime}, {actors: actors}])
            }
            return res.json("Anime with this character does not found")
        } catch (e) {
            next(ApiError.notFound(e.message))
        }
    }

    async giveActorJoints(req, res, next) {
        try {
            const {actorId} = req.params
            const animeIds = (await AnimeActors.findAll({
                where: {actorId: actorId},
                attributes: ["animeId"]
            })).map(i => i.animeId)
            const characterIds = (await CharactersActors.findAll({
                where: {actorId: actorId},
                attributes: ["animeCharacterId"]
            })).map(i => i.animeCharacterId)
            if (animeIds.length) {
                const sortedAnime = await Anime.findAll({where: {id: animeIds}})
                const characters = await AnimeCharacter.findAll({where: {id: characterIds}})
                return res.json([{anime: sortedAnime}, {characters: characters}])
            }
            return res.json("Anime with this character does not found")
        } catch (e) {
            next(ApiError.notFound(e.message))
        }

    }
}

module.exports = new CharactersController()