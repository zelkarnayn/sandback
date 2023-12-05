const { User } = require("../models/models")
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const MailService = require('./mail.service')
const TokenService = require('./token.service')
const UserDto = require("../dtos/user.dto")


class UserService {
    async registration(email, password, first_name, last_name) {
        const candidate = await User.findOne({ where: { email: email } })
        if (candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
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
            throw new Error('Некорректная ссылка активации')
        }
        user.isActive = true
        await user.save()
    }
}

module.exports = new UserService()