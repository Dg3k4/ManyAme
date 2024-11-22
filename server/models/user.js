const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    avatar: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    isActive: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
})

const UserToken = sequelize.define("user_token", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING(2048), allowNull: false},
})

const UserRole = sequelize.define("user_role", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Role = sequelize.define("role", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING, unique: true, allowNull: false}
})

User.belongsToMany(Role, {through: UserRole, onDelete: "CASCADE"})
Role.belongsToMany(User, {through: UserRole,})

User.hasOne(UserToken)
UserToken.belongsTo(User)

module.exports = {
    User, UserRole, Role, UserToken
}