const jwt = require("jsonwebtoken")
const {UserToken} = require("../../models/user")

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "31d"})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await UserToken.findOne({where: {userId: userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save();
        }
        const newToken = await UserToken.create({userId: userId, refreshToken: refreshToken})
        return newToken
    }

    async removeToken(refreshToken) {
        const tokenData = await UserToken.destroy({where: {refreshToken: refreshToken}})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await UserToken.findOne({where: {refreshToken: refreshToken}})
        return tokenData
    }

    async userIdFromToken(token) {
        try {
            const accessToken = token.split(" ")[1]
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
            const userId = userData.id

            return userId
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService()