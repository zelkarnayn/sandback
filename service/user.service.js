const { User } = require("../models/models")
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const MailService = require('./mail.service')
const TokenService = require('./token.service')
const UserDto = require("../dtos/user.dto")
const ApiError = require("../error/ApiError")
const tokenService = require("./token.service")



class UserService {

    async registration(email, password, first_name, last_name) {
        const candidate = await User.findOne({ where: { email: email } })
        if (candidate) {
            throw ApiError.unauthorized(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const activationLink = uuid.v4()
        const hashPassword = await bcrypt.hash(password, 3)
        const user =  await User.create({email, password: hashPassword, first_name, last_name, activationLink})
        await MailService.sendActivationMail(email, `${process.env.API_URL}/user/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink: activationLink}})
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActive = true
        await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            throw ApiError.badRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.badRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorized()
        }
        const user = await User.findOne({where: {id: userData.id}})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await User.findAll()
        return users
    }
}

module.exports = new UserService()