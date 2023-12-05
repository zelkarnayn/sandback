const userService = require("../service/user.service")

class userControllers {
    async registration(req, res, next) {
        try {
            const { email, first_name, last_name, password } = req.body
            const userData = await userService.registration(email, password, first_name, last_name)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            console.log(error.message);
        }
    }
    async login(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async logout(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async activate(req, res, next) {
        try {
            const actvationLink = req.params.link
            await userService.activate(actvationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            console.log(error.message);
        }
    }
    async refresh(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async getUsers(req, res, next) {
        try {
            res.json(['12', '34'])
        } catch (error) {

        }
    }
}

module.exports = new userControllers()