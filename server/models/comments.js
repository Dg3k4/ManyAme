const sequelize = require("../db")
const {DataTypes} = require("sequelize")
const {User} = require("./user");
const {Anime} = require("./anime");

const Comments = sequelize.define("comments", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment: {type: DataTypes.TEXT, allowNull: false}
})

User.hasMany(Comments)
Comments.belongsTo(User)

Anime.hasMany(Comments, {onDelete: "CASCADE"})
Comments.belongsTo(Anime)

module.exports = {
    Comments
}