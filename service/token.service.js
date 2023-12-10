const jwt = require('jsonwebtoken')
const { Token } = require('../models/models')

class TokenService {

    generateTokens (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
            return userData
        } catch (error) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {user: userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({where:{refreshToken}})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({where:{refreshToken}})
        return tokenData
    }
}

module.exports = new TokenService()