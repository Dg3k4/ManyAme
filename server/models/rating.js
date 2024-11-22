const sequelize = require("../db")
const {DataTypes} = require("sequelize")
const {User} = require("./user");
const {Anime} = require("./anime");

const Rating = sequelize.define("rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.FLOAT, validate: {min: 1, max: 10}, isFloat: true}
})

User.hasMany(Rating)
Rating.belongsTo(User)

Anime.hasMany(Rating, {onDelete: "CASCADE"})
Rating.belongsTo(Anime)

module.exports = {
    Rating
}