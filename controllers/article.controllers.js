const uuid = require('uuid');
const path = require('path');
const { Article } = require('../models/models');
const ApiError = require('../error/ApiError');

class articleControllers {
    async postArticle(req, res, next) {
        try {
            const { title, text, author } = req.body;
            const { image } = req.files;
            let fileName = uuid.v4() + '.jpg';
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const article = await Article.create({
                title,
                text,
                author,
                image: fileName
            })
            return res.json(article)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getArticle(req, res) { }
    async getAllArticles(req, res) {
        
    }
    async patchArticle(req, res) { }
    async deleteArticle(req, res) { }
}

module.exports = new articleControllers();

// ARTICLE {
//     title,
//     text,
//     author,
// }