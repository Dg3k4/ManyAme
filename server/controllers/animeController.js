const
    {
        Anime, AnimeGenre, AnimeStudio, LinkAnime, VoiceoverAnime, AnimeRelease, AnimeGenreTitle,
        AnimeStatus, AnimeList, AnimeMPAA, AnimeStudioTitle, AnimeType, AnimeTrailer
    } = require("../models/anime")
const {AnimeActors, CharacterAnime, CharactersActors, Actor, AnimeCharacter} = require("../models/characters")

const ApiError = require("../error/ApiError")
const uudi = require("uuid")
const path = require("path")
const animeService = require("../service/anime/anime-service")


class AnimeController {
    async createAnime(req, res, next) {
        try {
            const data = JSON.parse(req.body.data)
            const characterData = JSON.parse(req.body.characterData)

            console.log(data)

            const {
                title, subTitles, trailers, lastEpisode,
                episodes, source, ageLimit, duration, director,
                based, originalAuthor, description, animeStatusId,
                animeTypeId, animeMpaaId, genres, studios,
                releaseFrom
            } = data;
            const {characters} = characterData

            if (!releaseFrom) {
                return res.status(400).json("Не указана дата релиза")
            }

            const {img, characterPhoto, actorPhoto} = req.files
            let fileName = uudi.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, "..", "static", fileName))

            const createReleaseFrom = await AnimeRelease.create({releaseFrom: releaseFrom})
            const release = createReleaseFrom.id

            const newAnime = await Anime.create({
                title, subTitles, img: fileName, lastEpisode,
                episodes, source, ageLimit, duration, director,
                based, originalAuthor, description, animeStatusId, animeTypeId, animeMpaaId,
                animeReleaseId: release
            });

            await animeService.createListAnime(newAnime.id)


            if (trailers) {
                await Promise.all(
                    trailers.map(async (i) => await AnimeTrailer.create({trailerUrl: i, animeId: newAnime.id}))
                )
            }
            if (genres && genres.length > 0) {
                await newAnime.addAnime_genre_titles(genres)
            }
            if (studios && studios.length > 0) {
                await newAnime.addAnime_studio_titles(studios)
            }



            if (characters) {
                for (const character of characters) {
                    const { name, description, actors } = character;

                    const [newCharacter, characterCreated] = await AnimeCharacter.findOrCreate({
                        where: {name},
                        defaults: {description}
                    });
                    await newAnime.addAnime_character(newCharacter);

                    if (characterCreated) {
                        const characterFile = characterPhoto.find(file =>
                            file.name.split(".")[0] === String(newCharacter.id)
                        );
                        if (characterFile) {
                            let characterFileName = uudi.v4() + ".jpg";
                            await characterFile.mv(path.resolve(__dirname, "..", "static", characterFileName));
                            await newCharacter.update({ characterImg: characterFileName });
                        }
                    }

                    if (actors) {
                        for (const actor of actors) {
                            const { name, japaneseName, birthday, career } = actor;

                            const [newActor, actorCreated] = await Actor.findOrCreate({
                                where: {name},
                                defaults: {japaneseName, birthday, career}
                            });

                            if (actorCreated) {
                                const actorFile = actorPhoto.find(file =>
                                    file.name.split(".")[0] === String(newActor.id)
                                );
                                if (actorFile) {
                                    let actorFileName = uudi.v4() + ".jpg";
                                    await actorFile.mv(path.resolve(__dirname, "..", "static", actorFileName));
                                    await newActor.update({ photo: actorFileName });
                                }
                            }

                            await newCharacter.addActor(newActor);
                            await newAnime.addActor(newActor);
                        }
                    }
                }
            }

            return res.status(201).json(newAnime);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async giveAll(req, res, next) {
        try {
            const { offset, limit, sortField, sortOrder, ...filters } = req.query;

            console.log('Sort Field:', sortField);
            console.log('Sort Order:', sortOrder);

            const anime = await animeService.giveAnimeWithOffset(
                parseInt(offset) || 0,
                parseInt(limit) || 9,
                { field: sortField || 'createdAt', order: sortOrder || 'DESC' },
                filters || {}
            );

            return res.json(anime);
        } catch (e) {
            next(ApiError.notFound(e.message))
        }
    }

    async addAnimeVoiceover(req, res, next) {
        try {
            const {animeId} = req.params
            const {videoInfo} = JSON.parse(req.body.data)
            const {video} = req.files

            const newVoiceovers = []
            if (video) {
                for (const i of videoInfo) {
                    for (const file of video) {
                        const fileName = uudi.v4() + ".mp4"
                        const videoUrl = `/video/${fileName}`
                        await file.mv(path.resolve(__dirname, "..", "static", "video", fileName))

                        const [voiceover, created] = await VoiceoverAnime.findOrCreate({
                            where: {
                                title: i.title,
                                quality: i.quality,
                                videoUrl: videoUrl,
                                episode: i.episode,
                                animeId: animeId,
                            },
                            defaults: {
                                episodeRelease: i.episodeRelease,
                                episodeName: i.episodeName,
                            }
                        });

                        if (created) {
                            newVoiceovers.push(voiceover);
                        }
                    }
                }
            }

            if (!newVoiceovers.length) {
                return res.json("All these voiceovers already exist for this episode of this anime")
            } else {
                return res.json(newVoiceovers)
            }
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async addLinkAnimeTo(req, res, next) {
        try {
            const {animeId} = req.params
            const {linkedAnimeId} = req.body

            const newLinkAnime = await LinkAnime.create({linkedAnimeId: linkedAnimeId, animeId: animeId})

            return res.json(newLinkAnime)
        } catch (e) {
            next(ApiError.notFound(e.message))
        }
    }

    async giveAnimeTrailers(req, res, next) {
        try {
            const {animeId} = req.params
            const animeTrailers = await AnimeTrailer.findAll({where: {animeId: animeId}})

            return res.json(animeTrailers)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async giveOne(req, res, next) {
        try {
            let {animeId} = req.params
            let anime = await Anime.findOne({where: {id :animeId}})
            console.log(anime)
            return res.json(anime)
        } catch (e) {
            res.json(e.message)
        }
    }

    async addGenreToAnime(req, res, next) {
        try {
            const {animeId} = req.params
            const {genres} = req.body


            return res.status(200).json({ message: "Genres added to anime successfully" });
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new AnimeController()
