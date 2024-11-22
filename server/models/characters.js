const sequelize = require("../db")
const {DataTypes} = require("sequelize")
const {Anime} = require("./anime");

const AnimeCharacter = sequelize.define("anime_character", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    characterImg: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
})

const CharacterAnime = sequelize.define("character_anime", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CharactersActors = sequelize.define("characters_actors", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Actor = sequelize.define("actor", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    japaneseName: {type: DataTypes.STRING},
    photo: {type: DataTypes.STRING},
    birthday: {type: DataTypes.STRING},
    career: {type: DataTypes.STRING}
})

const AnimeActors = sequelize.define("anime_actors", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

Anime.belongsToMany(AnimeCharacter, {through: CharacterAnime ,onDelete: "CASCADE"})
AnimeCharacter.belongsToMany(Anime, {through: CharacterAnime})

Anime.belongsToMany(Actor, {through: AnimeActors, onDelete: "CASCADE"})
Actor.belongsToMany(Anime, {through: AnimeActors})

AnimeCharacter.belongsToMany(Actor, {through: CharactersActors, onDelete: "CASCADE"})
Actor.belongsToMany(AnimeCharacter, {through: CharactersActors, onDelete: "CASCADE"})

module.exports = {
    AnimeCharacter,
    CharacterAnime,
    AnimeActors,
    Actor,
    CharactersActors
}