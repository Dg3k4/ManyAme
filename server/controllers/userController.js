const ApiError = require("../error/ApiError")
const userService = require("../service/user/user-service")
const tokenService = require("../service/user/token-service")
const animeService = require("../service/anime/anime-service")
const {validationResult} = require("express-validator")
const {Role} = require("../models/user");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Email or password are incorrect", errors.array()))
            }
            const {name, email, password} = req.body;
            const userData = await userService.registration(name, email, password);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {name, email, password} = req.body
            const userData = await userService.login(name, email, password)

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)

            res.clearCookie("refreshToken")
            return res.json(token)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async activate(req, res, next) {
        try {
            const {activationLink} = req.params
            await userService.activate(activationLink)

            return res.redirect(process.env.CLIENT_API)
        } catch (e) {
            next(ApiError.internal("Failed to active account", e.message))
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {

        }
    }

    async addAnimeToTypeList(req, res, next) {
        try {
            const {animeId, typeListId} = req.query

            const addAnime = await animeService.addAnimeToTypeList(animeId, typeListId)
            return res.json(addAnime)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteAnimeFromTypeList(req, res, next) {
        try {
            const {animeId, typeListId} = req.query

            const deleteAnime = await animeService.deleteAnimeFromTypeList(animeId, typeListId)
            return res.json(deleteAnime)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async initRoles(req, res, next) {
        try {
            const roles = [
                {role: "OWNER"},
                {role: "ADMIN"},
                {role: "USER"},
                {role: "GUEST"}
            ];

            const newRoles = await Role.bulkCreate(roles)

            return res.json(newRoles)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async addNewRole(req, res, next) { // Сначала сделай middleware, а потом уже прикрути добавление и удаление роли.
        try {
            const token = req.headers.authorization
            const userId = await tokenService.userIdFromToken(token)
            const {roleId} = req.body

            const newUserRole = await userService.addAccRole(userId, roleId)
            return res.json(`Now user ${newUserRole.user.name} also have a role of ${newUserRole.role.role}`)
        } catch (e) {
            next(ApiError.forbidden("No access rights", e.message))
        }
    }
}

module.exports = new UserController()