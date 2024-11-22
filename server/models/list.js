const sequelize = require("../db")
const {DataTypes} = require("sequelize")
const {User} = require("./user");
const {AnimeList} = require("./anime");

const List = sequelize.define("list", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const TypeList = sequelize.define("type_list", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const AnimeTypeList = sequelize.define("anime_type_list", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(List, {onDelete: "CASCADE"})
List.belongsTo(User)

List.hasMany(TypeList, {onDelete: "CASCADE"})
TypeList.belongsTo(List)

TypeList.belongsToMany(AnimeList, {through: AnimeTypeList, onDelete: "CASCADE"})
AnimeList.belongsToMany(TypeList, {through: AnimeTypeList})

module.exports = {
    List, TypeList, AnimeTypeList
}