const ApiError = require("../error/ApiError");
const { User } = require("../models/models");


class userController {
    async getUser(req, res) {}

    async getAllUser(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }

    async postUser(req, res, next) {
        const { first_name, last_name, email, password } = req.body
        const user = await User.create({ first_name, last_name, email, password })
        user.get
        return res.json(user)
    }

    async patchUser(req, res) {
        const { first_name, last_name, email, password } = req.body

    }
    async deleteUser(req, res) { }
}

module.exports = new userController();

// USER {
//     firs_name,
//     last_name,
//     email,
//     password
// }