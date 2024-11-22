const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const Anime = sequelize.define("anime", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    subTitles: {type: DataTypes.ARRAY(DataTypes.STRING)},
    img: {type: DataTypes.STRING},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    lastEpisode: {type: DataTypes.INTEGER, defaultValue: 1},
    episodes: {type: DataTypes.INTEGER},
    source: {type: DataTypes.STRING},
    ageLimit: {type: DataTypes.STRING, validate: {isIn: [["0+", "6+", "12+", "16+", "18+"]]} },
    duration: {type: DataTypes.FLOAT},
    director: {type: DataTypes.ARRAY(DataTypes.STRING)},
    based: {type: DataTypes.STRING},
    originalAuthor: {type: DataTypes.ARRAY(DataTypes.STRING)},
    description: {type: DataTypes.TEXT},
})

const VoiceoverAnime = sequelize.define("voiceover_anime", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    quality: {type: DataTypes.STRING, allowNull: true},
    videoUrl: {type: DataTypes.STRING, allowNull: false},
    episode: {type: DataTypes.INTEGER, allowNull: false},
    episodeRelease: {type: DataTypes.DATE, allowNull: false},
    episodeName: {type: DataTypes.STRING}
})

const AnimeTrailer = sequelize.define("anime_trailer", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    trailerUrl: {type: DataTypes.STRING}
})

const LinkAnime = sequelize.define("link_anime", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    linkedAnimeId: {type: DataTypes.INTEGER}
})

const AnimeList = sequelize.define("anime_list", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const AnimeGenre = sequelize.define("anime_genre", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const AnimeGenreTitle = sequelize.define("anime_genre_title", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    animeGenre: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const GenreStudio = sequelize.define("genre_studio", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const AnimeStudio = sequelize.define("anime_studio", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const AnimeStudioTitle = sequelize.define("anime_studio_title", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    animeStudio: {type: DataTypes.STRING, allowNull: false, unique: true}
})

const AnimeMPAA = sequelize.define("anime_mpaa", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    animeMPAA: {type: DataTypes.STRING, unique: true}
})
const AnimeType = sequelize.define("anime_type", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    animeType: {type: DataTypes.STRING, allowNull: false}
})
const AnimeRelease = sequelize.define("anime_release", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    releaseFrom: {type: DataTypes.DATE},
    releaseTo: {type: DataTypes.DATE}
})
const AnimeStatus = sequelize.define("anime_status", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    animeStatus: {type: DataTypes.STRING, allowNull: false}
})

Anime.hasOne(AnimeList, {onDelete: "CASCADE"})
AnimeList.belongsTo(Anime)

Anime.hasMany(VoiceoverAnime, {onDelete: "CASCADE"})
VoiceoverAnime.belongsTo(Anime)

Anime.hasMany(AnimeTrailer, {onDelete: "CASCADE"})
AnimeTrailer.belongsTo(Anime)

Anime.hasMany(LinkAnime, {onDelete: "CASCADE"})
LinkAnime.belongsTo(Anime)

Anime.belongsToMany(AnimeGenreTitle, { through: AnimeGenre, onDelete: 'CASCADE' })
AnimeGenreTitle.belongsToMany(Anime, { through: AnimeGenre, onDelete: 'CASCADE' })

Anime.belongsToMany(AnimeStudioTitle, { through: AnimeStudio, onDelete: 'CASCADE' })
AnimeStudioTitle.belongsToMany(Anime, { through: AnimeStudio, onDelete: 'CASCADE' })

AnimeStudioTitle.belongsToMany(AnimeGenreTitle, { through: GenreStudio, onDelete: 'CASCADE' })
AnimeGenreTitle.belongsToMany(AnimeStudioTitle, { through: GenreStudio, onDelete: 'CASCADE' })

Anime.belongsTo(AnimeMPAA, {onDelete: "CASCADE"})
AnimeMPAA.hasMany(Anime)

Anime.belongsTo(AnimeType, {onDelete: "CASCADE"})
AnimeType.hasMany(Anime)

Anime.belongsTo(AnimeRelease, {onDelete: "CASCADE"})
AnimeRelease.hasOne(Anime)

Anime.belongsTo(AnimeStatus, {onDelete: "CASCADE"})
AnimeStatus.hasMany(Anime)

module.exports = {
    Anime,
    AnimeList,
    LinkAnime,
    VoiceoverAnime,
    AnimeGenreTitle,
    AnimeGenre,
    AnimeStudioTitle,
    AnimeStudio,
    GenreStudio,
    AnimeStatus,
    AnimeType,
    AnimeRelease,
    AnimeMPAA,
    AnimeTrailer,
}
